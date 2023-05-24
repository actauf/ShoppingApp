import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Button, Card, ListItem} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Cart} from '../../models/Cart';
import {useNavigation} from '@react-navigation/native';
import {TouchableHighlight} from 'react-native-gesture-handler';

const CartItem = (props: {cart: Cart}) => {
  const navigation = useNavigation();

  return (
    <>
      <ListItem
        bottomDivider
        Component={TouchableHighlight}
        onPress={() =>
          navigation.navigate('CartDetails', {
            title: props.cart.name,
            cart_id: props.cart.id,
          })
        }>
        <Icon name="list" size={15} color={'gray'} />
        <ListItem.Content>
          <ListItem.Title>{props.cart.name}</ListItem.Title>
          {props.cart.cartProducts.length > 0 ? (
            <ListItem.Subtitle>
              This list has {props.cart.cartProducts.length} products
            </ListItem.Subtitle>
          ) : (
            <ListItem.Subtitle>This list is empty</ListItem.Subtitle>
          )}
        </ListItem.Content>
        <ListItem.Chevron color={'gray'} />
      </ListItem>
    </>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
  },
  cardStyle: {
    borderRadius: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontStyle: 'italic',
    color: 'black',
  },
});
