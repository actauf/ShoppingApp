import {request, gql} from '../../node_modules/graphql-request/build/esm/index';

export const getAuthUser = () => {
  return gql`
    query Query {
      authUser {
        id
        username
        email
        password
        address
        token
      }
    }
  `;
};

export const userLogin = () => {
  return gql`
    mutation Mutation($email: String!, $password: String!) {
      userLogin(email: $email, password: $password) {
        id
        username
        email
        password
        address
        token
      }
    }
  `;
};

export const userRegister = () => {
  return gql`
    mutation Mutation(
      $email: String!
      $password: String!
      $username: String!
      $address: String!
    ) {
      userRegister(
        email: $email
        password: $password
        username: $username
        address: $address
      ) {
        id
        username
        email
        password
        address
        token
      }
    }
  `;
};
