import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, View } from '../components/Themed';
import { Stack } from 'expo-router';
import AuthorizeGoogleComponent from '../components/auth/AuthorizeGoogleComponent';
import AuthorizeAppleComponent from '../components/auth/AuthorizeAppleComponent';

export default function EnterScreen() {
  return (
    <Container>
      <Stack.Screen options={{ headerShown: false, title: 'Login' }} />
      <AuthorizeAppleComponent />
      <View style={styles.padding} />
      <AuthorizeGoogleComponent />
    </Container>
  );
}

const styles = StyleSheet.create({
  padding: {
    paddingVertical: 10,
  },
});