import {Card, Image, Text, Divider, Button} from '@rneui/themed';
import {useState} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import {useAuth} from '../../providers/AuthProvider';

const ProfileScreen = ({navigation}: any) => {
  const {logout, user} = useAuth();

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
        <Button
          title={'Logout'}
          type="outline"
          color={'error'}
          onPress={() => logout()}
        />
      </View>
      <Divider />
    </View>
  );
};

export default ProfileScreen;

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
