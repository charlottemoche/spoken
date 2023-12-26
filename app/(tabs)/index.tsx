import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, View } from '../../components/Themed';
import AuthorizeGoogleComponent from '../../components/auth/AuthorizeGoogleComponent';
import AuthorizeAppleComponent from '../../components/auth/AuthorizeAppleComponent';

export default function HomeScreen() {
  return (
    <Container>
      <AuthorizeGoogleComponent />
      
      <View style={styles.padding} />
      
      <AuthorizeAppleComponent />
    </Container>
  );
}

const styles = StyleSheet.create({
  padding: {
    paddingVertical: 10, // Adjust the value as per your requirement
  },
});
