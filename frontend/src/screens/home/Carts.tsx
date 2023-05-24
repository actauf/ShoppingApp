import {useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {Divider, FAB} from '@rneui/themed';
import {request} from '../../../node_modules/graphql-request/build/esm/index';
import {useQuery} from '@tanstack/react-query';
import {SearchBar} from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CartModal from '../../components/cart/CartModal';
import {Carts} from '../../models/responses/Carts';
import {getCarts} from '../../api/api-cart';
import {API_URI} from '@env';
import {useAuth} from '../../providers/AuthProvider';
import CartItem from '../../components/cart/CartItem';

const CartsScreen = () => {
  const {user} = useAuth();
  const [search, setSearch] = useState('');
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);
  const showModal = () => {
    setIsVisibleModal(true);
  };

  const closeModal = () => {
    setIsVisibleModal(false);
  };

  const updateSearch = (search: any) => {
    setSearch(search);
  };

  const fetchCarts = (): Promise<Carts> =>
    request(API_URI, getCarts(), {user_id: user!.id});

  // `data` is fully typed!
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['carts'],
    queryFn: async () => fetchCarts(),
  });

  const callBackModal = () => {
    setIsVisibleModal(false);
    refetch();
  };

  return (
    <View style={styles.appContainer}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{height: '100%'}}>
          <Divider width={0.8} color={'gray'} style={{opacity: 0.5}} />
          {isVisibleModal && (
            <CartModal
              isVisible={isVisibleModal}
              closeModal={closeModal}
              callBackData={callBackModal}
            />
          )}
          <FlatList
            data={data?.cartsByUser}
            keyExtractor={({id}) => id.toString()}
            renderItem={({item}) => <CartItem cart={item} />}
          />
          <FAB placement="right" color="#159690" onPress={() => showModal()}>
            <Icon name="playlist-add" color="white" size={25} />
          </FAB>
        </View>
      )}
    </View>
  );
};

export default CartsScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#f1f4fc',
  },
});
