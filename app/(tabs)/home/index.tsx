import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, View, Text } from '../../../components/Themed';
import { Stack } from 'expo-router';
import AuthorizeGoogleComponent from '../../../components/auth/AuthorizeGoogleComponent';
import AuthorizeAppleComponent from '../../../components/auth/AuthorizeAppleComponent';

export default function Page() {
  return (
    <Container>
      <Stack.Screen options={{ headerShown: false, title: 'Home' }} />
      <AuthorizeAppleComponent />
      <View style={styles.padding} />
      <AuthorizeGoogleComponent />
      {/* <Text style={styles.padding}>You are logged in</Text> */}
    </Container>
  );
}

const styles = StyleSheet.create({
  padding: {
    paddingVertical: 10,
  },
});