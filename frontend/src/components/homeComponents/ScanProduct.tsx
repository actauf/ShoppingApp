import {StyleSheet, View, Pressable} from 'react-native';
import {Button, Card, Text} from '@rneui/themed';
import {Product} from '../../models/Product';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const ScanProduct = () => {
  const navigation = useNavigation();
  return (
    <Card containerStyle={styles.cardStyle}>
      <Pressable
        onPress={() => navigation.navigate('Camera')}
        style={({pressed}) => pressed && styles.pressedItem}>
        <View style={styles.cardContent}>
          <Icon name="barcode-scan" size={20} color={'#159690'} />
          <Text h4 h4Style={{fontSize: 20}}>
            Scan a product
          </Text>
        </View>
      </Pressable>
    </Card>
  );
};

export default ScanProduct;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
  },
  cardStyle: {
    borderRadius: 20,
    paddingVertical: 20,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
  },
  cardTitle: {
    textAlign: 'left',
  },
  pressedItem: {
    opacity: 0.5,
  },
});
