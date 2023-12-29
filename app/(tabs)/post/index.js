import React, { useState } from 'react';
import { StyleSheet, Button, Alert, useColorScheme } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { View } from '../../../components/Themed';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';

export default function Page() {

  const colorScheme = useColorScheme();

  const textColor = colorScheme === 'dark' ? 'white' : 'black';

  const [file, setFile] = useState(null);
  
  const [handle, setHandle] = useState(null);

  const handlePost = async () => {
    const body = new FormData();

    // files are required to be sent as multipart form data to the Filestack API
    body.append('fileUpload', {
      name: 'fileUpload',
      uri: `${file?.replace('file://', '')}`,
    });

    const apiKey = 'Aq4ZQJZQeQqKQq0QqQqQ';
    const path = '/photos';
    const signature = 'fd135e7b1341c2b6e813953ccf5329b0284631c9473108b5d5e9232366cd30ea';
    const policy = 'eyJleHBpcnkiOjE3MDQxNzE2MDAsImNhbGwiOlsicGljayIsInJlYWQiLCJ3cml0ZSIsIndyaXRlVXJsIiwic3RvcmUiXSwicGF0aCI6Ii9waG90b3MiLCJjb250YWluZXIiOiJzcG9rZW4ifQ==';

    const endpoint = [
      'https://www.filestackapi.com/api/store/S3',
      `?key=${apiKey}`,
      `&policy=${policy}`,
      `&signature=${signature}`,
      `&path=${path}`,
    ].join('');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: body,
      });

      const responseJson = await response.json();

      setHandle(responseJson.url.slice(33));
    } catch (e) {
      console.log('error', e);
    }
  };

  const _pickImage = async () => {
    // Allow application access to Camera Roll
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
  
    // The ImagePicker API from expo returns a URI, which we will use to access the file object to upload to Filestack.
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
  
    if (!result.canceled) {
      setFile(result.uri);
    }

    console.log(result);
  };  

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false, title: 'User' }} />
      <View style={ styles.selectImageConainer }>
        <Button buttonStyle={ styles.button }  color={textColor} title="Select an image from camera roll" onPress={_pickImage} />
      </View>
      {file && <Image source={{ uri: file }} style={styles.selectedImage} />}
      <Button title="Upload" color={textColor} onPress={handlePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: '50%',
    left: 0,
    right: 0,
    color: 'white',
  },
  selectImageConainer: {
    height: 200,
    width: 200,
    backgroundColor: 'gray',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover', // Use 'cover' for resizing the image within the container
  },
  textInContainer: {
    position: 'absolute',
    // Adjust the positioning of the text as needed
    bottom: 10,
  },
});
