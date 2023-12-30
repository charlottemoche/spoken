import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import * as ImageManipulator from 'expo-image-manipulator';

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri as string);
      console.log(result.assets[0].uri);
    }
  };

  const handlePost = async () => {
    if (!selectedImage) {
      console.log('No image selected for upload.');
      return;
    }
  
    const body = new FormData();
  
    const imageUri = selectedImage.replace('file://', '');
  
    const imageBlob = await fetch(imageUri).then((res) => res.blob());
    const imageInfo = await ImageManipulator.manipulateAsync(imageUri, []);
  
    const extension = imageUri.split('.').pop();
    const mimeType = extension ? `image/${extension.toLowerCase()}` : 'image/jpeg';
  
    body.append('fileUpload' as any, {
      uri: imageUri,
      name: 'upload.jpg',
      type: mimeType,
    } as any);
  
    const apiKey = 'AUKQzR9ECQ9GljVj45Cc0z';
    const path = '/photos';
    const signature = 'de9ad60617331544d61b4261df4d065ae238d3a634c1382545aee4555326af2e';
    const policy = 'eyJjYWxsIjpbInBpY2siLCJyZWFkIiwid3JpdGUiLCJ3cml0ZVVybCIsInN0b3JlIl0sInBhdGgiOiIvcGhvdG9zIiwiZXhwaXJ5IjoxNzA0OTU0NjAwfQ==';
  
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
  
      const responseText = await response.text();
      console.log('Upload response:', responseText);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false, title: 'Post' }} />
      <View style={styles.imageContainer}>
        <View style={styles.uploadText}>
          <Button title="Upload an image" onPress={openImagePicker} color="black" />
        </View>
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </View>
      <View style={{ padding: 20 }} />
      {selectedImage && (
        <Button title="Upload" onPress={handlePost} color='black' />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  imageContainer: {
    backgroundColor: 'gray',
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
  },
});
