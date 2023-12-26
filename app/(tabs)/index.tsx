import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, View } from '../../components/Themed';
import AuthorizeGoogleComponent from '../../components/auth/AuthorizeGoogleComponent';
import AuthorizeAppleComponent from '../../components/auth/AuthorizeAppleComponent';

export default function HomeScreen() {
  return (
    <Container>
      <Text>You are logged in</Text>
    </Container>
  );
}
