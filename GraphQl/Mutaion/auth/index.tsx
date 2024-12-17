import { gql } from '@apollo/client';

const REGISTER_CUSTOMER_POST = gql`
  mutation registerCustomer($firstName: String, $lastName: String, $email: String, $password: String, $status: Boolean, $mobile: String, $profile: Upload) {
    registerCustomer(firstName: $firstName, lastName: $lastName, email: $email, password: $password, status: $status, mobile: $mobile, profile: $profile ) {
      createdAt
    email
    firstName
    id
    lastName
    mobile
    profile
    token
    updatedAt
    }
  }
`;
const LOGIN_CUSTOMER_POST = gql`
  mutation loginCustomer($email: String, $password: String) {
    loginCustomer(email: $email, password: $password ) {
    createdAt
    email
    firstName
    id
    lastName
    mobile
    profile
    token
    updatedAt
    }
  }
`;


export { REGISTER_CUSTOMER_POST, LOGIN_CUSTOMER_POST };
