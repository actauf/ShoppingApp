import {request, gql} from '../../node_modules/graphql-request/build/esm/index';

export const addCartProductQuery = () => {
  return gql`
    mutation Mutation(
      $cart_id: String!
      $product_id: String!
      $quantity: Int!
    ) {
      createCartProduct(
        cart_id: $cart_id
        product_id: $product_id
        quantity: $quantity
      ) {
        id
      }
    }
  `;
};

export const updateCartProductCheckQuery = () => {
  return gql`
    mutation Mutation($cartProduct_id: String!, $checked: Boolean!) {
      cartProductUpdateCheck(
        cartProduct_id: $cartProduct_id
        checked: $checked
      ) {
        id
        quantity
        checked
        cart_id
        product_id
      }
    }
  `;
};

export const updateCartProductQtyQuery = () => {
  return gql`
    mutation Mutation($cartProduct_id: String!, $quantity: Int!) {
      cartProductUpdateQty(
        cartProduct_id: $cartProduct_id
        quantity: $quantity
      ) {
        id
        quantity
        checked
        cart_id
        product_id
      }
    }
  `;
};
