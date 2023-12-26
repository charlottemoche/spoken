import React, { FunctionComponent } from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import { Text, Container } from '../components/Themed';
import AuthorizeGoogleComponent from '../components/auth/AuthorizeGoogleComponent';

const Welcome: FunctionComponent = () => {
    const handleLoginSuccess = () => {
      // Handle any logic you need when the user is successfully authenticated
    };
  
    return (
      <Container>
        <StatusBar style="auto" />
        <AuthorizeGoogleComponent onLoginSuccess={handleLoginSuccess} />
      </Container>
    );
  };

export default Welcome;