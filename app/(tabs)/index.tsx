import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Container, Text, View } from '../../components/Themed';
import AuthorizeGoogleComponent from '../../components/auth/AuthorizeGoogleComponent';
import AuthorizeAppleComponent from '../../components/auth/AuthorizeAppleComponent';

export default function HomeScreen() {
  
  return (
     <Container>

        <AuthorizeGoogleComponent />
        <AuthorizeAppleComponent />
        
      </Container>

  );
}