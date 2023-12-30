import { gql } from '@apollo/client';
import { FontAwesome } from '@expo/vector-icons';
import { encode } from 'base-64';
import * as Google from 'expo-auth-session/providers/google';
import fetch from 'isomorphic-fetch';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import client from './Client';
import { useAuth } from './AuthContext';
import { saveAuthToken } from './AuthService';

const GRAPHQL_ENDPOINT = 'https://spkn.app/api/authorize';
const IOS_CLIENT_ID = '704374595989-fl5vcjcvdfca0dt0ocr6jgn4vqf74v9q.apps.googleusercontent.com';
const ANDROID_CLIENT_ID =
  '704374595989-g00b78dpjrdt6mqof4l5r23rrc6fh9j9.apps.googleusercontent.com';
const GOOGLE_REDIRECT_URI =
  'com.googleusercontent.apps.704374595989-fl5vcjcvdfca0dt0ocr6jgn4vqf74v9q:/oauthredirect';

export default function AuthorizeGoogleComponent() {
  const { checkLoginStatus } = useAuth();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    // webClientId: GOOGLE_CLIENT_ID,
    redirectUri: GOOGLE_REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
  });

  useEffect(() => {
    const handleGoogleLogin = async () => {
      try {
        if (response && response.type === 'success') {
          const userInfoResponse = await getUserInfo(response.authentication.accessToken);

          const authHeader = 'Basic ' + encode('mobile-app' + ':' + 'hellospoken123');

          const authorizeInput = {
            providerRefid: userInfoResponse?.id || '',
            provider: 'GOOGLE',
            name: userInfoResponse?.name || '',
            image: userInfoResponse?.picture || '',
            email: userInfoResponse?.email || '',
          };

          console.log('AuthorizeInput:', authorizeInput);

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

          const mutationResult = await mutationResponse.json();

          console.log('MutationResult:', mutationResult);

          if (mutationResult.data && mutationResult.data.authorize) {
            const { token, user } = mutationResult.data.authorize;
            await saveAuthToken(token);
            checkLoginStatus();
          } else {
            console.error('Authorization failed:', mutationResult);
          }
        }
      } catch (error) {
        console.error('Error during Google login:', error);
      }
    };

    handleGoogleLogin();
  }, [response]);

  const getUserInfo = async (token) => {
    if (!token) return null;
    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userInfoResponse = await response.json();
      return userInfoResponse;
    } catch (e) {
      console.error('Error fetching user info:', e);
      return null;
    }
  };

  return (
    <View style={{ width: '90%' }}>
      <Button
        onPress={() => promptAsync()}
        buttonStyle={{
          backgroundColor: 'white',
          borderRadius: 5,
          paddingVertical: 11,
          paddingHorizontal: 15,
        }}
        icon={<FontAwesome name="google" size={13} color="black" style={{ marginRight: 6 }} />}
        title="Sign in with Google"
        titleStyle={{ fontSize: 17, color: 'black', fontWeight: '500' }}
      />
    </View>
  );
}
