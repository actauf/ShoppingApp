import {StyleSheet, View, Pressable} from 'react-native';
import {Button, Card, Text} from '@rneui/themed';
import {Product} from '../../models/Product';

import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const FindShopCard = () => {
  const navigation = useNavigation();
  return (
    <Card containerStyle={styles.cardStyle}>
      <Pressable
        onPress={() => navigation.navigate('FindShop')}
        style={({pressed}) => pressed && styles.pressedItem}>
        <View style={styles.cardContent}>
          <Icon name="location" size={20} color={'#159690'} />
          <Text h4 h4Style={{fontSize: 20}}>
            Find a Shop
          </Text>
        </View>
      </Pressable>
    </Card>
  );
};

export default FindShopCard;

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
