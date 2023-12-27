import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { encode } from 'base-64';
import { Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import client from '../../constants/Client';
import { gql } from '@apollo/client';

const GRAPHQL_ENDPOINT = 'https://spkn.app/api/authorize';
const IOS_CLIENT_ID = '704374595989-fl5vcjcvdfca0dt0ocr6jgn4vqf74v9q.apps.googleusercontent.com';
const ANDROID_CLIENT_ID = '704374595989-g00b78dpjrdt6mqof4l5r23rrc6fh9j9.apps.googleusercontent.com'
const GOOGLE_REDIRECT_URI = 'com.googleusercontent.apps.704374595989-fl5vcjcvdfca0dt0ocr6jgn4vqf74v9q:/oauthredirect';

export default function AuthorizeGoogleComponent() {
  const [userInfo, setUserInfo] = useState(null);
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
          console.log('UserInfo:', userInfoResponse);
          setUserInfo(userInfoResponse);
    
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
      console.log('UserInfoResponse:', userInfoResponse);
      return userInfoResponse;
    } catch (e) {
      console.error('Error fetching user info:', e);
      return null;
    }
  };

  return (
    <View>
      <Button
        onPress={() => promptAsync()}
        buttonStyle={{ backgroundColor: '#4285F4', borderRadius: 5, paddingVertical: 11, paddingHorizontal: 15 }}
        icon={
          <FontAwesome
            name="google"
            size={13}
            color="white"
            style={{ marginRight: 6 }}
          />
        }
        title="Sign in with Google"
        titleStyle={{ fontSize: 17, color: 'white', fontWeight: '500' }}
      />
    </View>
  );
}