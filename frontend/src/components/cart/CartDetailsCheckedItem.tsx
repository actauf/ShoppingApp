import {useEffect, useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import {Avatar, Button, Input, ListItem, Text} from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import {CartProduct} from '../../models/CartProduct';
import {useForm} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import request from '../../../node_modules/graphql-request/build/esm/index';
import {API_URI} from '@env';
import {updateCartProductCheckQuery} from '../../api/api-cart-product';

const CartDetailsCheckedItem = (props: {
  cartProduct: CartProduct;
  callBackData: () => void;
}) => {
  const [checked, setChecked] = useState(props.cartProduct.checked);

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
    <ListItem>
      <ListItem.CheckBox
        iconType="material-community"
        checkedColor="green"
        checkedIcon="checkbox-marked"
        uncheckedIcon="checkbox-blank-outline"
        checked={checked}
        onPress={() => setChecked(!checked)}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.textStyle}>
          {props.cartProduct.product.name}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

export default CartDetailsCheckedItem;

const styles = StyleSheet.create({
  textStyle: {
    opacity: 0.5,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});
