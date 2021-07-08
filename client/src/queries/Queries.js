import {gql} from "@apollo/client";

export const REGISTER_USER = gql`
mutation($email: String!, $age: Int, $password: String!){
    createUser(email: $email, password: $password, age: $age){
      username
      email
      age
    }
  }
`