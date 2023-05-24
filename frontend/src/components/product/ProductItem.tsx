import {StyleSheet, Text, View} from 'react-native';
import {Button, Card} from '@rneui/themed';
import {Product} from '../../models/Product';

import Icon from 'react-native-vector-icons/FontAwesome';

const ProductItem = (props: {
  showModal: (productId: string) => void;
  product: Product;
}) => {
  return (
    <View style={styles.cardContainer}>
      <Card containerStyle={styles.cardStyle}>
        <Card.Image
          style={styles.cardImage}
          source={{
            uri: props.product.image,
          }}
        />
        <Card.Divider />
        <Card.Title style={styles.cardTitle}>{props.product.name}</Card.Title>

        <View style={styles.cardFooter}>
          <Text>
            {props.product.price}
            {'€'}
          </Text>
          <Button radius={'sm'} type="outline">
            <Icon
              name="cart-plus"
              color="#159690"
              size={20}
              onPress={() => props.showModal(props.product.id)}
            />
          </Button>
        </View>
      </Card>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  cardContainer: {
    width: '50%',
  },
  cardStyle: {
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  cardImage: {
    borderRadius: 10,
  },
  cardTitle: {
    textAlign: 'left',
  },
  cardFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
