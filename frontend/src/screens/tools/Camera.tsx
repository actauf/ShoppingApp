import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {Text} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

const CameraScreen = () => {
  const navigation = useNavigation();

  const [data, setData] = useState('Scan your code QR');
  const onSuccess = (e: any) => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
  };
  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.torch}
      showMarker={true}
      topContent={<Text style={styles.centerText}>{data}</Text>}
      bottomContent={
        <View style={{marginTop: 40}}>
          <Text>QR Code Scanner</Text>
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() => {
              navigation.navigate('AppTabs');
            }}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
