import {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Pressable,
} from 'react-native';
import {Avatar, Button, Divider, Input, ListItem, Text} from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import {CartProduct} from '../../models/CartProduct';
import {useForm} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import request from '../../../node_modules/graphql-request/build/esm/index';
import {
  updateCartProductCheckQuery,
  updateCartProductQtyQuery,
} from '../../api/api-cart-product';
import {API_URI} from '@env';
import {useNavigation} from '@react-navigation/native';

const CartDetailsItem = (props: {
  cartProduct: CartProduct;
  callBackData: () => void;
}) => {
  const [checked, setChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [qty, setQty] = useState(props.cartProduct.quantity);
  const navigation = useNavigation();

  const [fadeAnimation, setFadeAnimation] = useState<Animated.Value>(
    new Animated.Value(0),
  );

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const submitData = async () => {
      if (qty !== props.cartProduct.quantity) {
        const res = await request(API_URI, updateCartProductQtyQuery(), {
          cartProduct_id: props.cartProduct.id,
          quantity: qty,
        });
        console.log('🚀 ~ file: CartDetailsItem.tsx:55 ~ res ~ res:', res);
        props.callBackData();
      }
    };
    submitData();
  }, [qty]);

  useEffect(() => {
    const submitData = async () => {
      await request(API_URI, updateCartProductCheckQuery(), {
        cartProduct_id: props.cartProduct.id,
        checked: checked,
      });
      props.callBackData();
    };
    submitData();
  }, [checked]);

  return (
    <SafeAreaView>
      <ListItem.Swipeable
        style={styles.listItemSwipeableContainer}
        leftWidth={80}
        rightWidth={90}
        leftContent={action => (
          <>
            <Button
              containerStyle={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#0e9c4e',
              }}
              type="clear"
              icon={{
                name: 'check',
                type: 'material-community',
                color: 'white',
              }}
              onPress={() => setChecked(true)}
            />
          </>
        )}
        rightContent={action => (
          <Button
            containerStyle={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: '#d30a0a',
            }}
            type="clear"
            icon={{
              name: 'delete-outline',
              type: 'material-community',
              color: 'white',
            }}
            onPress={action}
          />
        )}
        onPress={() =>
          navigation.navigate('CartProductDetails', {
            cartProduct: props.cartProduct,
          })
        }>
        {/* <Icon name="label-important-outline" size={30} /> */}
        <ListItem.CheckBox
          iconType="material-community"
          checkedColor="green"
          checkedIcon="checkbox-marked"
          uncheckedIcon="checkbox-blank-outline"
          checked={checked}
          onPress={() => setChecked(!checked)}
        />
        <Avatar
          source={{
            uri: props.cartProduct.product.image,
          }}
          size={50}
        />
        <ListItem.Content style={styles.listItemContainer}>
          <ListItem.Title>{props.cartProduct.product.name}</ListItem.Title>
          <ListItem.Subtitle>
            {props.cartProduct.product.price}€
          </ListItem.Subtitle>
        </ListItem.Content>
        <Button
          title={qty + ' pcs'}
          type="outline"
          buttonStyle={{
            borderColor: 'rgba(216, 132, 6, 1)',
            borderRadius: 10,
            borderWidth: 1.5,
          }}
          titleStyle={{color: 'rgba(216, 132, 6, 1)'}}
          onPress={() => {
            //fadeIn();
            setIsVisible(true);
          }}
        />
      </ListItem.Swipeable>
      <Divider width={0.8} color={'gray'} style={{opacity: 0.5}} />
      {isVisible ? (
        <>
          <TouchableOpacity
            style={styles.touchableOpacityContainer}
            onPress={() => {
              //fadeOut();
              setIsVisible(false);
            }}
          />
          <View style={styles.modalContainer}>
            <View style={styles.modalHeaderContainer}>
              <Text h4 h4Style={{fontSize: 15}}>
                Quantity
              </Text>
              <Text style={styles.deleteText}>Delete</Text>
            </View>
            <View style={styles.modalContentContainer}>
              <Button
                type="outline"
                buttonStyle={{
                  borderColor: 'rgba(216, 132, 6, 1)',
                  borderRadius: 10,
                  borderWidth: 1.5,
                  paddingVertical: 8,
                  paddingHorizontal: 13,
                }}
                titleStyle={{color: 'rgba(216, 132, 6, 1)'}}
                icon={
                  <Icon name="minus" size={20} color="rgba(216, 132, 6, 1)" />
                }
                onPress={() => setQty(qty + -1)}
              />
              <Input
                containerStyle={{width: '70%', height: 35}}
                inputContainerStyle={{
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 35,
                }}
                rightIconContainerStyle={{width: '50%'}}
                inputStyle={{
                  textAlign: 'center',
                  height: 35,
                  paddingVertical: 0,
                }}
                rightIcon={<Text>pc</Text>}
                keyboardType="number-pad"
                value={qty.toString()}
              />
              <Button
                buttonStyle={{
                  borderColor: 'rgba(216, 132, 6, 1)',
                  borderRadius: 10,
                  borderWidth: 1.5,
                  paddingVertical: 9,
                  paddingHorizontal: 14,
                  backgroundColor: 'rgba(216, 132, 6, 1)',
                }}
                icon={<Icon name="plus" size={20} color="white" />}
                onPress={() => setQty(qty + 1)}
              />
            </View>
          </View>
        </>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default CartDetailsItem;

const styles = StyleSheet.create({
  listItemSwipeableContainer: {
    height: 100,
  },
  listItemContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    height: '100%',
  },
  touchableOpacityContainer: {
    width: '100%',
    height: 200,
    backgroundColor: 'gray',
    position: 'absolute',
    right: 0,
    top: 0,
    opacity: 0.5,
  },
  modalContainer: {
    width: 320,
    height: 200,
    backgroundColor: 'white',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  modalHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  deleteText: {
    opacity: 0.7,
    textDecorationLine: 'underline',
  },
  modalContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  fadingContainer: {
    paddingVertical: 5,
    paddingHorizontal: 25,
    backgroundColor: 'lightseagreen',
  },
});
