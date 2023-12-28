import React from 'react';
import { FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { View, Text } from 'react-native';
import { Link, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function Results() {
  const colorScheme = useColorScheme();

  const results = [
    { id: 1, name: 'Result 1', image: require('../../../assets/images/placeholder.png') },
    { id: 2, name: 'Result 2', image: require('../../../assets/images/placeholder.png') },
    { id: 3, name: 'Result 3', image: require('../../../assets/images/placeholder.png') },
    { id: 4, name: 'Result 4', image: require('../../../assets/images/placeholder.png') },
    { id: 5, name: 'Result 5', image: require('../../../assets/images/placeholder.png') },
    // Add more results here
  ];

  const renderItem = ({ item }: { item: { id: number, name: string, image: any } }) => (
    <TouchableOpacity style={styles.item}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ headerShown: true, title: 'Results', headerTintColor: colorScheme === 'dark' ? 'white' : 'black' }}
      />
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
  },
});
