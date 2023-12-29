import { gql } from '@apollo/client';

export const GET_USER = gql`
  query {
    user {
      fullName
      email
      phone
      bio
      imageSmall
    }
  }
`;
