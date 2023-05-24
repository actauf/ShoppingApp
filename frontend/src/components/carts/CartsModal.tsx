import {BottomSheet} from '@rneui/base';
import {StyleSheet, View, TextInput, ScrollView, FlatList} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Button, Text} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import {request} from '../../../node_modules/graphql-request/build/esm/index';
import {addCartProductQuery} from '../../api/api-cart-product';
import {API_URI} from '@env';
import {useAuth} from '../../providers/AuthProvider';
import {Cart} from '../../models/Cart';
import CartsListItem from './CartListItem';
import {SafeAreaView} from 'react-native';
import {useState} from 'react';
import {Product} from '../../models/Product';

const CartsModal = (props: {
  closeModal: () => void;
  isVisible: boolean;
  callBackData: () => void;
  carts: Cart[] | undefined;
  productId: string | undefined;
}) => {
  const [selectedIndex, setIndex] = useState('');

  const onSubmit = async () => {
    const variables = {
      cart_id: selectedIndex,
      product_id: props.productId,
      quantity: 1,
    };

    const res = await request(API_URI, addCartProductQuery(), variables);
    //console.log(res);

    props.callBackData();
  };

  return (
    <>
      <BottomSheet
        modalProps={{}}
        isVisible={props.isVisible}
        onBackdropPress={() => props.closeModal()}>
        <View style={styles.modalContainer}>
          <View style={styles.headerContainer}>
            <Text h4>Add Cart List</Text>
            <Button radius={'sm'} type="outline" onPress={props.closeModal}>
              <Icon name="close" color="#4d5a59" size={20} />
            </Button>
          </View>
          <ScrollView>
            {props.carts?.map((item, i) => {
              return (
                <CartsListItem
                  key={i}
                  cart={item}
                  selectedIndex={selectedIndex}
                  setIndex={setIndex}
                />
              );
            })}
          </ScrollView>
          <Button
            title="Add Product to cart"
            onPress={() => onSubmit()}
            color="#159690"
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default CartsModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    /* justifyContent: 'flex-start',
    alignItems: 'center', */
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
