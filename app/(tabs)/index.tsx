import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Container, Text, View } from '../../components/Themed';
import AuthorizeGoogleComponent from '../../components/auth/AuthorizeGoogleComponent';

export default function HomeScreen() {
  
  return (
     <Container>

        <AuthorizeGoogleComponent />

        
      </Container>

  );
}