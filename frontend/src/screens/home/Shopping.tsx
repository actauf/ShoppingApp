import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {Card, FAB, Input} from '@rneui/themed';
import {request} from '../../../node_modules/graphql-request/build/esm/index';
import {useQuery} from '@tanstack/react-query';
import {getProductsQuery} from '../../api/api-products';
import {Products} from '../../models/responses/Products';
import ProductItem from '../../components/product/ProductItem';
import {SearchBar} from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCom from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductModal from '../../components/product/ProductModal';
import {getCarts} from '../../api/api-cart';
import {Carts} from '../../models/responses/Carts';
import {useAuth} from '../../providers/AuthProvider';
import CartsModal from '../../components/carts/CartsModal';
import {API_URI} from '@env';
import {useNavigation} from '@react-navigation/native';
import {Product} from '../../models/Product';

const ShoppingScreen = () => {
  const {user} = useAuth();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterData, setFilterData] = useState<Product[] | undefined>([]);
  const [productId, setProductId] = useState<string>();
  const [isVisibleModalProduct, setIsVisibleModalProduct] = useState(false);
  const [isVisibleModalCart, setIsVisibleModalCart] = useState(false);

  const showModalProduct = () => {
    setIsVisibleModalProduct(true);
  };

  const closeModalProduct = () => {
    setIsVisibleModalProduct(false);
  };

  const showModalCart = (productId: string) => {
    setProductId(productId);
    setIsVisibleModalCart(true);
  };

  const closeModalCart = () => {
    setIsVisibleModalCart(false);
  };

  const fetchProducts = (): Promise<Products> =>
    request(API_URI, getProductsQuery());

  const productsResult = useQuery({
    queryKey: ['products'],
    queryFn: async () => fetchProducts(),
  });

  const fetchCarts = (): Promise<Carts> =>
    request(API_URI, getCarts(), {user_id: user!.id});

  const cartsResult = useQuery({
    queryKey: ['carts'],
    queryFn: async () => fetchCarts(),
  });

  const callBackModalProduct = () => {
    setIsVisibleModalProduct(false);
    productsResult.refetch();
  };

  const callBackModalCart = () => {
    setIsVisibleModalCart(false);
    cartsResult.refetch();
  };

  const handleSearch = (search: string) => {
    setSearchQuery(search);
    const newData = productsResult.data?.products.filter(item => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilterData(newData);
  };

  useEffect(() => {
    setFilterData(productsResult.data?.products);
  }, [productsResult.data?.products]);

  return (
    <View style={styles.appContainer}>
      {productsResult.isLoading || cartsResult.isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{height: '100%'}}>
          {isVisibleModalProduct && (
            <ProductModal
              isVisible={isVisibleModalProduct}
              closeModal={closeModalProduct}
              callBackData={callBackModalProduct}
            />
          )}
          {isVisibleModalCart && (
            <CartsModal
              carts={cartsResult.data?.cartsByUser}
              productId={productId}
              isVisible={isVisibleModalCart}
              closeModal={closeModalCart}
              callBackData={callBackModalCart}
            />
          )}
          <View style={{backgroundColor: 'white'}}>
            <Input
              containerStyle={{}}
              inputContainerStyle={{
                borderRadius: 10,
                borderBottomWidth: 0,
                paddingHorizontal: 5,
                marginBottom: 5,
                backgroundColor: '#f1f4fc',
              }}
              errorStyle={{
                display: 'none',
              }}
              inputStyle={{}}
              leftIcon={<IconCom name="text-search" size={20} />}
              leftIconContainerStyle={{}}
              rightIcon={<IconCom name="barcode-scan" size={20} />}
              rightIconContainerStyle={{}}
              placeholder="Search"
              clearButtonMode="always"
              autoCapitalize="none"
              autoCorrect={false}
              value={searchQuery}
              onChangeText={query => handleSearch(query)}
            />
          </View>
          <FlatList
            style={styles.flatList}
            data={filterData}
            keyExtractor={product =>
              product !== null ? product.id.toString() : ''
            }
            numColumns={2}
            renderItem={({item}) => (
              <ProductItem product={item} showModal={showModalCart} />
            )}
          />

          <FAB
            placement="right"
            color="#159690"
            onPress={() => showModalProduct()}>
            <Icon name="add-business" color="white" size={25} />
          </FAB>
        </View>
      )}
    </View>
  );
};

export default ShoppingScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#f1f4fc',
  },
  flatList: {
    flex: 1,
    marginBottom: 0,
  },
  searchBar: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#f1f4fc',
  },
});
