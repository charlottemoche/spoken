import React, { useState } from 'react';
import { StyleSheet, View, Button, TouchableHighlight } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { Text } from '../../../components/Themed';
import * as ImageManipulator from 'expo-image-manipulator';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('I want this');

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

  const handleOption = (option: string) => {
    setSelectedOption(option);
  }

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
      <View style={styles.optionContainer}>
        <TouchableHighlight
          style={{
            backgroundColor: selectedOption === 'I want this' ? 'black' : 'transparent',
            borderRadius: 50,
            padding: 12,
            flexBasis: '50%',
          }}
          onPress={() => handleOption('I want this')}
          underlayColor="transparent"
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Ionicons name="heart" size={24} color={selectedOption === 'I want this' ? 'white' : 'gray'} />
            <Text style={{ color: selectedOption === 'I want this' ? 'white' : 'gray', textAlign: 'center' }}>I want this</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={{
            backgroundColor: selectedOption === 'I own this' ? 'black' : 'transparent',
            borderRadius: 50,
            padding: 12,
            flexBasis: '50%',
          }}
          onPress={() => handleOption('I own this')}
          underlayColor="transparent"
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Ionicons name={selectedOption === 'I own this' ? 'checkbox' : 'checkbox-outline'}  size={24} color={selectedOption === 'I own this' ? 'white' : 'gray'} />
            <Text style={{ color: selectedOption === 'I own this' ? 'white' : 'gray' }}>I own this</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.commentContainer}>
        <TextInput
          style={styles.comment}
          placeholder="Comment"
          placeholderTextColor="#808080"
        />
      </View>
      <TouchableHighlight
        style={{
          backgroundColor: 'black',
          borderRadius: 6,
          padding: 14,
          marginVertical: 10,
          marginHorizontal: 20,
          opacity: selectedImage ? 1 : 0.7,
          borderWidth: 2,
          borderColor: '#222222',
        }}
        onPress={handlePost}
        underlayColor="transparent"
        disabled={!selectedImage}
      >
      <Text style={{ color: 'white', textAlign: 'center' }}>Create Post</Text>
    </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  commentContainer: {
    backgroundColor: '#8F919924',
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'flex-start',
    height: 100,
  },
  comment: {
    fontSize: 14,
    fontWeight: '500',
    padding: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    backgroundColor: '#8F919924',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#222222',
    marginHorizontal: 20,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
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
    top: '44%',
    left: 0,
    right: 0,
  },
});
