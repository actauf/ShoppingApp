import {Card, Image, Text, Divider} from '@rneui/themed';
import {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  ActivityIndicator,
} from 'react-native';
import FindShopCard from '../../components/homeComponents/FindShopCard';
import ScanProduct from '../../components/homeComponents/ScanProduct';
import {useAuth} from '../../providers/AuthProvider';

const HomeScreen = ({navigation}: any) => {
  const {user} = useAuth();

  return (
    <View style={styles.appContainer}>
      <View style={styles.headerContainer}>
        <Image
          style={{width: 90, height: 60}}
          source={{
            uri: 'https://www.colruytgroup.com/content/dam/colruytgroup/merken/consumentenmerken/xtra/LP_reference-image_xtra-new.png/_jcr_content/renditions/cq5dam.web.1280.1280.png',
          }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text h3>Welcome {user?.username}</Text>
      </View>
      <Divider />
      <FindShopCard />
      <ScanProduct />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  headerContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
});
