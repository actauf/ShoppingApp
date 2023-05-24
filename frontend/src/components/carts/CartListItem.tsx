import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ListItem} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Cart} from '../../models/Cart';

const CartsListItem = (props: {
  cart: Cart;
  selectedIndex: string;
  setIndex: (id: string) => void;
}) => {
  return (
    <>
      <ListItem bottomDivider>
        <ListItem.CheckBox
          // Use ThemeProvider to change the defaults of the checkbox
          iconType="material-community"
          checkedIcon="checkbox-marked"
          uncheckedIcon="checkbox-blank-outline"
          checked={props.selectedIndex === props.cart.id}
          onPress={() => props.setIndex(props.cart.id)}
        />
        <TouchableOpacity
          style={{
            width: '100%',
          }}
          onPress={() => props.setIndex(props.cart.id)}>
          <ListItem.Content>
            <ListItem.Title>{props.cart.name}</ListItem.Title>
            <ListItem.Subtitle>
              {props.cart.cartProducts.length} items in the list
            </ListItem.Subtitle>
          </ListItem.Content>
        </TouchableOpacity>
      </ListItem>
    </>
  );
};

export default CartsListItem;

const styles = StyleSheet.create({});
