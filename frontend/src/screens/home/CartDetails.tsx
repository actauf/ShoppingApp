import {useState, useEffect} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {request} from '../../../node_modules/graphql-request/build/esm/index';
import {useQuery} from '@tanstack/react-query';
import {CartDetails} from '../../models/responses/CartDetails';
import {getCart} from '../../api/api-cart';
import {API_URI} from '@env';
import {useRoute} from '@react-navigation/native';
import {Button, Divider, Text} from '@rneui/themed';
import CartDetailsItem from '../../components/cart/CartDetailsItem';
import Icon from 'react-native-vector-icons/Octicons';
import {CartProduct} from '../../models/CartProduct';
import CartDetailsCheckedItem from '../../components/cart/CartDetailsCheckedItem';

const CartDetailsScreen = () => {
  const {params} = useRoute<any>();

  const [search, setSearch] = useState('');
  const updateSearch = (search: any) => {
    setSearch(search);
  };

  const fetchCart = (): Promise<CartDetails> =>
    request(API_URI, getCart(), {cart_id: params.cart_id});

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['cartDetails'],
    queryFn: async () => fetchCart(),
  });

  const total = () => {
    let currentTotal = 0;
    data?.cart.cartProducts.forEach(cartProduct => {
      !cartProduct.checked
        ? (currentTotal += cartProduct.quantity * cartProduct.product?.price!)
        : '';
    });
    return currentTotal.toFixed(2);
  };

  const callBackData = () => {
    refetch();
  };

  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (data) {
      setHasChecked(
        Object.values(data!.cart.cartProducts!).some(
          (v: CartProduct) => v.checked === true,
        ),
      );
    }
  }, [data?.cart]);

  return (
    <View style={styles.appContainer}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{height: '100%'}}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 10,
              marginHorizontal: 5,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              flexDirection: 'column',
              gap: 10,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 10,
              }}>
              <Icon name="checklist" size={30} color={'rgba(216, 132, 6, 1)'} />
              <Text h4>{data?.cart.name}</Text>
            </View>
            <Text>{data?.cart.cartProducts.length} products</Text>
          </View>

          <Divider width={0.8} color={'gray'} style={{opacity: 0.5}} />
          {data?.cart.cartProducts.length !== 0 ? (
            <>
              <FlatList
                style={hasChecked ? styles.flatList : styles.flatListFull}
                data={data?.cart.cartProducts}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) =>
                  !item.checked ? (
                    <CartDetailsItem
                      cartProduct={item}
                      callBackData={callBackData}
                    />
                  ) : (
                    <></>
                  )
                }
              />
              {hasChecked ? (
                <>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 10,
                    }}>
                    <Text style={{fontSize: 18, color: 'gray'}}>Checked</Text>
                    <Text
                      style={{fontSize: 18, fontWeight: 'bold', color: 'gray'}}>
                      Reinitialize
                    </Text>
                  </View>
                  <FlatList
                    data={data?.cart.cartProducts}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) =>
                      item.checked ? (
                        <CartDetailsCheckedItem
                          cartProduct={item}
                          callBackData={callBackData}
                        />
                      ) : (
                        <></>
                      )
                    }
                  />
                </>
              ) : (
                <></>
              )}
              <View style={styles.totalContainer}>
                <Text h4 style={styles.TextColor}>
                  {total()}€
                </Text>
                <Button
                  title={'Add product'}
                  buttonStyle={{
                    borderColor: 'rgba(216, 132, 6, 1)',
                    borderRadius: 10,
                    borderWidth: 1.5,
                    paddingVertical: 9,
                    paddingHorizontal: 14,
                    backgroundColor: 'rgba(216, 132, 6, 1)',
                  }}
                  titleStyle={{color: 'white', marginLeft: 10}}
                  icon={<Icon name="plus" size={20} color="white" />}
                />
              </View>
            </>
          ) : (
            <View style={styles.emptyContainer}>
              <Text>The list is empty</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default CartDetailsScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#f1f4fc',
  },
  flatList: {
    minHeight: '10%',
    backgroundColor: 'white',
    flexGrow: 0,
  },
  flatListFull: {},
  emptyContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TextColor: {
    color: 'black',
  },
});
