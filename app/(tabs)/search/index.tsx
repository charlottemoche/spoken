import React from 'react';
import { FlatList, StyleSheet, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Text, View } from '../../../components/Themed';
import { TextInput } from 'react-native-gesture-handler';
import { Image } from 'expo-image';

const results = [
  { id: 1, name: 'Result 1', image: require('../../../assets/images/placeholder.png') },
  { id: 2, name: 'Result 2', image: require('../../../assets/images/placeholder.png') },
  { id: 3, name: 'Result 3', image: require('../../../assets/images/placeholder.png') },
  { id: 4, name: 'Result 4', image: require('../../../assets/images/placeholder.png') },
  { id: 5, name: 'Result 5', image: require('../../../assets/images/placeholder.png') },
];

const searches = ['Search 1', 'Search 2', 'Search 3', 'Search 4', 'Search 5'];

const renderItem = ({ item }: { item: { id: number, name: string, image: any } }) => (
  <View style={styles.itemContainer}>
    <Link href={`/search/results`} asChild style={styles.item}>
      <Pressable>
        {({ pressed }) => (
          <Image source={item.image} style={{ opacity: pressed ? 0.5 : 1 }} />
        )}
      </Pressable>
    </Link>
  </View>
);

export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false, title: 'Search' }} />
      <TextInput
        style={[styles.searchBar, { height: 50 }]}
        placeholder="Search products, interests, and brands"
        placeholderTextColor="#808080"
      />
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
      />
      <Text style={styles.frequentlySearchedText}>FREQUENTLY SEARCHED BY YOUR CONNECTIONS</Text>
      <FlatList
        data={searches}
        renderItem={({ item }) => (
          <Link href={`/search/${item}`}>
            <Pressable>
              <Text style={styles.searchText}>{item}</Text>
            </Pressable>
          </Link>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    justifyContent: 'flex-start',
  },
  itemContainer: {
    flexDirection: 'row',
    gap: 8,
    overflow: 'hidden',
    padding: 10
  },
  item: {
    height: 100,
    width: 100,
    backgroundColor: 'gray',
    borderRadius: 8,
    overflow: 'hidden',
    contentFit: 'cover',
  },
  searchBar: {
    height: 50,
    borderRadius: 20,
    backgroundColor: '#8F91991A',
    marginHorizontal: 10,
    marginVertical: 16,
    padding: 10,
  },
  frequentlySearchedText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 10,
    margin: 10,
  },
  searchText: {
    fontSize: 14,
    margin: 10,
  },
});