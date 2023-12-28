import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import { Text, View } from '../../../components/Themed';

const SIMPLE_QUERY = gql`
  query {
    user {
      id
      name
    }
  }
`;

export default function Page() {
  const { loading, error, data } = useQuery(SIMPLE_QUERY);
  console.log('Data:', data);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.connectionItem}>
      <Image source={item.avatar} style={styles.avatar} />
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false, title: 'Home' }} />
      {/* <Text>{ data.user.connections.edges[0].node.fullName }</Text> */}
      {/* <FlatList
        data={connections}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      /> */}
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
