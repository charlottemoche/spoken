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

export const GET_CONNECTIONS = gql`
  query {
    user {
      connections {
        edges {
          node {
            fullName
            imageSmall
            id
            email
          }
        }
      }
    }
  }
`;

export const GET_CURR_USER_PRODUCTS = gql`
  query {
    user {
      products {
        pageInfo {
          endCursor
          startCursor
        }
        edges {
          node {
            id
            ownershipStatus
            product {
              name
              id
              defaultImage
              brand {
                name
                logo
              }
            }
          }
        }
      }
    }
	}
`;