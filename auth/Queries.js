import { gql, useMutation } from '@apollo/client';

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

export const GET_CONNECTION_PRODUCTS = gql`
  query user($id: ID!) {
    user(id: $id) {
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

export const GET_CURR_USER_POSTS = gql`
  query {
    user {
      posts {
        pageInfo {
          endCursor
          startCursor
        }
        edges {
          node {
            id
            type
            message
            reactionCounts {
              reaction
              count
            }
            product {
              name
              id
              defaultImage
              brand {
                name
                logo
              }
            }
            comments {
              pageInfo {
                endCursor
                startCursor
              }
              edges {
                node {
                  id
                  type
                  message
                  user {
                    fullName
                    imageSmall
                    isCurrentUser
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_CONNECTION_POSTS = gql`
  query user($id: ID!) {
    user(id: $id) {
      posts {
        pageInfo {
          endCursor
          startCursor
        }
        edges {
          node {
            id
            type
            message
            reactionCounts {
              reaction
              count
            }
            product {
              name
              id
              defaultImage
              brand {
                name
                logo
              }
            }
            comments {
              pageInfo {
                endCursor
                startCursor
              }
              edges {
                node {
                  id
                  type
                  message
                  user {
                    fullName
                    imageSmall
                    isCurrentUser
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_FEED = gql`
  query {
    feed {
      edges {
        node {
          content {
            ... on Post {
              __typename
              message
            }
            ... on Comment {
              __typename
              message
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_CURR_USER = gql`
  mutation UpdateCurrentUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      ... on UpdateUserSuccess {
        user {
          fullName
          email
          phone
          bio
          imageSmall
        }
      }
      ... on InvalidDataError {
        message
        invalidFields {
          field
          errors
        }
      }
    }
  }
`;