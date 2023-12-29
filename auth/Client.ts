import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist';
import * as SecureStore from 'expo-secure-store';
import { setContext } from '@apollo/client/link/context';

const BASE_URL = 'https://spkn.app/api/';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        user: {
          keyArgs: ["email"],
          merge(existing, incoming) {
            return { ...existing, ...incoming };
          },
        },
      },
    },
  },
});

// Define the authentication token storage key
const AUTH_TOKEN_KEY = 'authToken';

// Define an asynchronous function to handle cache persistence
// const persistCacheAsync = async () => {
//   try {
//     await persistCache({
//       cache,
//       storage: {
//         getItem: SecureStore.getItemAsync,
//         setItem: SecureStore.setItemAsync,
//         removeItem: SecureStore.deleteItemAsync,
//       },
//     });

//     console.log('Cache persisted successfully.');
//   } catch (error) {
//     console.error('Error persisting cache:', error);
//   }
// };

// // Call the asynchronous function to persist the cache
// persistCacheAsync();

// Create an http link
const httpLink = createHttpLink({
  uri: BASE_URL,
});

// Create an authentication link
const authLink = setContext(async (_, { headers }) => {
  // Retrieve the authentication token from SecureStore
  const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Combine the http link and the authentication link
const link = authLink.concat(httpLink);

// Create a function to append the endpoint to the base URL
const appendEndpoint = (endpoint: string) => {
  return `${BASE_URL}${endpoint}`;
};

// Create Apollo Client instance with the persisted cache and the combined link
const client = new ApolloClient({
  link,
  cache,
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-first',
    },
  },
});

export { client, appendEndpoint };
