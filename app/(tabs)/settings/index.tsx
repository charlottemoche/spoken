import React from 'react';
import { View, Button } from 'react-native';
import { useAuth } from '../../../components/auth/AuthContext';
import { removeAuthToken } from '../../../components/auth/AuthService';
import { Stack } from 'expo-router';

export default function Page() {
  const { checkLoginStatus } = useAuth(); 

  const handleLogout = async () => {
    // Perform logout logic here
    // Clear the access token from SecureStore
    await removeAuthToken();
    // Check if the user is logged in
    await checkLoginStatus();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Adjust the props of Stack.Screen accordingly */}
      <Stack.Screen options={{ headerShown: false, title: 'Settings' }} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
