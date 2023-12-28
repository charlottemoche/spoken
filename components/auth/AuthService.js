import * as SecureStore from 'expo-secure-store';

const AUTH_TOKEN_KEY = 'authToken';

export const saveAuthToken = async (token) => {
  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
};

export const getAuthToken = async () => {
  return SecureStore.getItemAsync(AUTH_TOKEN_KEY);
};

export const removeAuthToken = async () => {
  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
}
