import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { encode } from 'base-64';
import client from './Client';
import { gql } from '@apollo/client';

const GRAPHQL_ENDPOINT = 'https://spkn.app/api/authorize';

export default function AuthorizeAppleComponent() {
  const [userInfo, setUserInfo] = useState(null);

  const login = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // Extract relevant information from the credential
      const { userId, email, fullName } = credential;

      const authHeader = 'Basic ' + encode('mobile-app' + ':' + 'hellospoken123');
    
      const authorizeInput = {
        providerRefid: userId,
        provider: 'APPLE',
        name: fullName?.givenName + ' ' + fullName?.familyName || '',
        image: '',
        email: email || '',
      };

      console.log('AuthorizeInput:', authorizeInput);

      const mutationResponse = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
        },
        body: JSON.stringify({
          query: `
            mutation Authorize($authorizeInput: AuthorizeInput!) {
              authorize(authorizeInput: $authorizeInput) {
                ... on Error {
                  __typename
                  message
                }
                ... on AuthSuccess {
                  __typename
                  token
                  user {
                    firstName
                    lastName
                  }
                }
              }
            }
          `,
          variables: { authorizeInput },
        }),
      });

      const mutationResult = await mutationResponse.json();

      console.log('MutationResult:', mutationResult); // Add this line

      if (mutationResult.data && mutationResult.data.authorize) {
        const { token, user } = mutationResult.data.authorize;
        client.writeQuery({
          query: gql`
            query {
              user @client {
                firstName
                lastName
              }
            }
          `,
          data: { user },
        });
      } else {
        console.error('Authorization failed:', mutationResult);
      }
    } catch (error) {
      console.error('Error during Apple login:', error);
    }
  };

  const getAppleAuthContent = () => {
    return Platform.OS === 'ios' ? (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ width: 200, height: 44 }}
        onPress={login}
      />
    ) : null;
  };

  return (
    <View>
        {getAppleAuthContent()}
    </View>
  );
}