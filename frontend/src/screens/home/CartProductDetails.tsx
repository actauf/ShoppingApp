import {useState} from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {Button, Divider, Image, Input, Text} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CartProduct} from '../../models/CartProduct';
import {ScrollView} from 'react-native-gesture-handler';

const CartProductDetailsScreen = () => {
  const {params} = useRoute<any>();

  const cartProduct: CartProduct = params.cartProduct;

  const [qty, setQty] = useState(cartProduct.quantity);

  return (
    <View style={styles.appContainer}>
      <ScrollView>
        <View style={styles.imgContainer}>
          <Image
            source={{uri: cartProduct.product.image}}
            style={{width: 120, height: 120}}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={{marginVertical: 5, padding: 5}}>
            <Text h4 style={{marginBottom: 5}}>
              {cartProduct.product.name}|{cartProduct.product.desc}
            </Text>
            <Text h4>{cartProduct.product.price}€</Text>
          </View>
        </View>
        <Divider width={0.8} color={'gray'} style={{opacity: 0.5}} />
        <View style={styles.quantityContainer}>
          <View style={styles.quantityHeaderContainer}>
            <Text h4 h4Style={{fontSize: 15}}>
              Quantity
            </Text>
            <Text style={styles.deleteText}>Delete</Text>
          </View>
          <View style={styles.quantityContentContainer}>
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
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: 10,
                paddingBottom: 20,
              }}>
              <Text style={{fontWeight: 'bold', marginLeft: 5}}>Eco-Score</Text>
              <Image
                style={{width: 70, height: 40}}
                source={{
                  uri: 'https://maville.com/photosmvi/2022/01/26/P29734154D5052473G_crop_1080-600_.jpg',
                }}
              />
              <Text
                style={styles.moreInfoText}
                onPress={() => {
                  Linking.openURL('http://www.google.be');
                }}>
                More Info
              </Text>
            </View>
            <Divider
              orientation="vertical"
              width={0.8}
              color={'gray'}
              style={{opacity: 0.5}}
            />
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: 10,
                paddingBottom: 20,
              }}>
              <Text style={{fontWeight: 'bold', marginLeft: 5}}>
                Nutri-Score
              </Text>
              <Image
                style={{width: 70, height: 40}}
                source={{
                  uri: 'https://securite-alimentaire.public.lu/content/dam/securite_alimentaire/pictures/logo_officiels/NutriScore-logo-neutre-contour.png',
                }}
              />
              <Text
                style={styles.moreInfoText}
                onPress={() => {
                  Linking.openURL('http://www.google.be');
                }}>
                More Info
              </Text>
            </View>
          </View>
          <Divider width={0.8} color={'gray'} style={{opacity: 0.5}} />
          <Text style={{padding: 5, marginTop: 10}}>
            {cartProduct.product.desc}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default CartProductDetailsScreen;

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#f1f4fc',
    height: '100%',
  },
  imgContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  detailsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  quantityContainer: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 15,
  },
  quantityHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  deleteText: {
    opacity: 0.7,
    textDecorationLine: 'underline',
  },
  moreInfoText: {
    color: '#adafb4',
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
  quantityContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
});
