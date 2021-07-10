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

export const LOGIN_USER = gql`
query($email: String!, $password: String!){
  login(email: $email, password: $password){
    id
    accessToken
    refreshToken
    accesstokenExp
    refreshtokenExp
  }
}
`