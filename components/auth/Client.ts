import { ApolloClient, InMemoryCache } from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'https://spoken.app/api';

// Create an InMemoryCache instance
const cache = new InMemoryCache();

// Define an asynchronous function to handle cache persistence
const persistCacheAsync = async () => {
  // Use try-catch block to handle potential errors
  try {
    // Persist the cache using SecureStore
    await persistCache({
      cache,
      storage: {
        getItem: SecureStore.getItemAsync,
        setItem: SecureStore.setItemAsync,
        removeItem: SecureStore.deleteItemAsync,
      },
    });

    console.log('Cache persisted successfully.');
  } catch (error) {
    console.error('Error persisting cache:', error);
  }
};

// Call the asynchronous function to persist the cache
persistCacheAsync();

// Create Apollo Client instance with the persisted cache
const client = new ApolloClient({
  uri: BASE_URL,
  cache,
});

export default client;
