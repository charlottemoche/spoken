import React from 'react';
import { FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { View, Text } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function Item() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false, title: 'Item' }} />
        <Image source={require('../../../assets/images/placeholder.png')} style={styles.image} />
        <Text>Item Name</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Ensure that the image covers the entire container
    },
});
