import { gql } from '@apollo/client';
import { encode } from 'base-64';
import * as AppleAuthentication from 'expo-apple-authentication';
import fetch from 'isomorphic-fetch';
import { View, Platform } from 'react-native';

import client from './Client';
import { useAuth } from '../../components/auth/AuthContext';
import { saveAuthToken } from '../../components/auth/AuthService';

const GRAPHQL_ENDPOINT = 'https://spkn.app/api/authorize';

export default function AuthorizeAppleComponent() {
  const { checkLoginStatus } = useAuth();

  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential || !credential.user) {
        console.error('Apple login failed or user ID is missing.');
        return;
      }

      const { user, email, fullName } = credential;
      const authHeader = 'Basic ' + encode('mobile-app' + ':' + 'hellospoken123');

      const authorizeInput = {
        providerRefid: user,
        provider: 'APPLE',
        name: fullName?.givenName + ' ' + fullName?.familyName || '',
        image: '',
        email: email || '',
      };

      const mutationResponse = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
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

      console.log('Raw HTML Response:', await mutationResponse.text());

      const mutationResult = await mutationResponse.json();

      console.log('MutationResult:', mutationResult);

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

        await saveAuthToken(token);
        checkLoginStatus();
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
        style={{ width: 375, height: 44 }}
        onPress={handleAppleLogin}
      />
    ) : null;
  };

  return <View>{getAppleAuthContent()}</View>;
}
