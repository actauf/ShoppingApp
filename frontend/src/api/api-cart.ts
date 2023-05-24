import {request, gql} from '../../node_modules/graphql-request/build/esm/index';

export const getCarts = () => {
  return gql`
    query Query($user_id: String!) {
      cartsByUser(user_id: $user_id) {
        id
        name
        user_id
        cartProducts {
          id
          quantity
          checked
          product_id
          cart_id
        }
      }
    }
  `;
};

export const getCart = () => {
  return gql`
    query Cart($cart_id: String!) {
      cart(cart_id: $cart_id) {
        id
        name
        user_id
        cartProducts {
          id
          quantity
          checked
          product {
            id
            name
            desc
            price
            image
          }
        }
      }
    }
  `;
};

export const addCartQuery = () => {
  return gql`
    mutation Mutation($user_id: String!, $name: String!) {
      createCart(user_id: $user_id, name: $name) {
        id
        name
        user_id
      }
    }
  `;
};
