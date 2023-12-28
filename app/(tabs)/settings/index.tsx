import { Stack } from 'expo-router';
import React from 'react';
import { Button, useColorScheme } from 'react-native';

import { View } from '../../../components/Themed';
import { useAuth } from '../../../components/auth/AuthContext';
import { removeAuthToken } from '../../../components/auth/AuthService';

export default function Page() {
  const { checkLoginStatus } = useAuth();
  const colorScheme = useColorScheme();

  const handleLogout = async () => {
    // Perform logout logic here
    // Clear the access token from SecureStore
    await removeAuthToken();
    // Check if the user is logged in
    await checkLoginStatus();
  };

  const textColor = colorScheme === 'dark' ? 'white' : 'black';

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Adjust the props of Stack.Screen accordingly */}
      <Stack.Screen options={{ headerShown: true, title: 'Settings' }} />
      <Button title="Logout" onPress={handleLogout} color={textColor} />
    </View>
  );
}
