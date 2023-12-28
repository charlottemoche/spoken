import React from 'react';
import { Container, View, Text } from '../../../components/Themed';
import { Stack } from 'expo-router';

export default function Page() {
  return (
    <Container>
      <Stack.Screen options={{ headerShown: false, title: 'Home' }} />
      <Text>You are logged in</Text>
    </Container>
  );
}