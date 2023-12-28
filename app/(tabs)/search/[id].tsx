import React from 'react';
import { FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { View, Text } from 'react-native';
import { Link, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function Id() {

  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ headerShown: true, title: '', headerTintColor: colorScheme === 'dark' ? 'white' : 'black' }}
      />
        <Image source={require('../../../assets/images/placeholder.png')} style={ styles.image } />
        <Text style={ styles.itemText }>Item Name</Text>
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
        height: '30%',
        borderRadius: 8,
    },
    itemText: {
        fontSize: 24,
        fontWeight: '500',
        marginTop: 16,
    },
});
