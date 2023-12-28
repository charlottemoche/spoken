import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '../../../components/Themed';

const connections = [
  { id: 1, name: 'Connection 1', avatar: require('../../../assets/images/placeholder.png') },
  { id: 2, name: 'Connection 2', avatar: require('../../../assets/images/placeholder.png') },
  { id: 3, name: 'Connection 3', avatar: require('../../../assets/images/placeholder.png') },
  { id: 4, name: 'Connection 4', avatar: require('../../../assets/images/placeholder.png') },
  { id: 5, name: 'Connection 5', avatar: require('../../../assets/images/placeholder.png') },
];

export default function Page() {
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.connectionItem}>
      <Image source={item.avatar} style={styles.avatar} />
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false, title: 'Home' }} />
      <FlatList
        data={connections}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  connectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});
