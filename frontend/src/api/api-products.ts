import {request, gql} from '../../node_modules/graphql-request/build/esm/index';

export const getProductsQuery = () => {
  return gql`
    query Products {
      products {
        id
        name
        desc
        price
        image
      }
    }
  `;
};

export const addProductQuery = () => {
  return gql`
    mutation Mutation(
      $name: String!
      $price: Float!
      $image: String!
      $desc: String
    ) {
      createProduct(name: $name, price: $price, image: $image, desc: $desc) {
        id
        name
        desc
        price
        image
      }
    }
  `;
};
