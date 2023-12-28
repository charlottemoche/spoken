import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import client from '../constants/Client';
import { AuthProvider, useAuth } from '../components/auth/AuthContext';
import EnterScreen from './enter';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  if (error) throw error;

  if (!loaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Content />
      </AuthProvider>
    </ApolloProvider>
  );
}

function Content() {
  const { isLoggedIn, checkLoginStatus } = useAuth();

  useEffect(() => {
    SplashScreen.hideAsync();
    checkLoginStatus();
  }, []); // Run once when component mounts

  useEffect(() => {
    console.log('isLoggedIn after authentication check:', isLoggedIn);
  }, [isLoggedIn]); // Run this effect whenever isLoggedIn changes

  console.log('RootLayout rendering. isLoggedIn:', isLoggedIn);

  return isLoggedIn ? <RootLayoutNav /> : <EnterScreen />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
