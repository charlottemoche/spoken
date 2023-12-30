import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Button, useColorScheme, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { View, Text } from '../../../components/Themed';
import { useAuth } from '../../../auth/AuthContext';
import { removeAuthToken } from '../../../auth/AuthService';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER, UPDATE_CURR_USER } from '../../../auth/Queries';
import { appendEndpoint } from '../../../auth/Client';
import Spinner from '../../../components/CoreComponents';
import { Image } from 'expo-image';

export default function Page() {
  const { checkLoginStatus } = useAuth();
  const colorScheme = useColorScheme();

  const updateUserEndpoint = appendEndpoint('update-current-user');

  const userEndpoint = appendEndpoint('current-user');

  const [updateUser] = useMutation(UPDATE_CURR_USER, {
    context: { uri: updateUserEndpoint },
  });

  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER, {
    context: { uri: userEndpoint, fetchPolicy: 'network-only' },
  });

  const handleLogout = async () => {
    // Perform logout logic here
    // Clear the access token from SecureStore
    await removeAuthToken();
    // Check if the user is logged in
    await checkLoginStatus();
  };

  const textColor = colorScheme === 'dark' ? 'white' : 'black';

  // State variables to store the user data
  const [name, setName] = useState(userData.user.fullName);
  const [phoneNumber, setPhoneNumber] = useState(userData.user.phone);
  const [bio, setBio] = useState(userData.user.bio);

  if (userLoading) return <Spinner />

  return (
    <ScrollView>
      <View style={{ paddingHorizontal: 20 }}>
        <Stack.Screen options={{ headerShown: true, title: 'Settings', headerTintColor: textColor }} />
        <Image
          style={styles.avatar}
          source={{ uri: userData.user.imageSmall }}
        />
        <View style={styles.profileContainer}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomColor: '#E0E0E0', borderBottomWidth: 1 }}>
              <Text style={{ fontWeight: '500' }}>Name</Text>
              <TextInput
                style={[styles.username, { color: textColor }]}
                value={name}
                onChangeText={setName}
                placeholder="Full Name"
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomColor: '#E0E0E0', borderBottomWidth: 1 }}>
              <Text style={{ fontWeight: '500' }}>Bio</Text>
              <TextInput
                style={[styles.bio, { color: textColor }]}
                value={bio}
                onChangeText={setBio}
                placeholder="Bio"
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomColor: '#E0E0E0', borderBottomWidth: 1 }}>
              <Text style={{ fontWeight: '500' }}>Phone</Text>
              <TextInput
                style={[styles.phone, { color: textColor }]}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Phone Number"
              />
            </View>
          </View>
        </View>
        <Button title="Logout" onPress={handleLogout} color={colorScheme === 'dark' ? 'white' : 'red'} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 20,
  },
  avatar: {
    width: 80,
    alignSelf: 'center',
    height: 80,
    borderRadius: 40,
    marginTop: 20,
  },
  username: {
    paddingVertical: 8,
  },
  input: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  bio: {
    paddingVertical: 8,
  },
  phone: {
    paddingVertical: 8,
  },
});