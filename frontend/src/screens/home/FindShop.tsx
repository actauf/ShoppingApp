import Geolocation from '@react-native-community/geolocation';
import {Card, Image, Text, Divider} from '@rneui/themed';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

const FindShopScreen = () => {
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  Geolocation.getCurrentPosition(info => {
    setRegion({
      latitude: info.coords.latitude,
      longitude: info.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  });

  return (
    <View style={styles.container}>
      {/*Render our MapView*/}
      <MapView
        style={styles.map}
        //specify our coordinates.
        initialRegion={region}
      />
    </View>
  );
};

export default FindShopScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
