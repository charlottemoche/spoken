import { Link, Stack } from 'expo-router';
import { Container, Text, View } from '../../../components/Themed';

import { TextInput, FlatList, Image, StyleSheet } from 'react-native';

const images = [
    { id: 1, source: require('../../../assets/images/icon.png') },
    { id: 2, source: require('../../../assets/images/icon.png') },
    { id: 3, source: require('../../../assets/images/icon.png') },
    { id: 4, source: require('../../../assets/images/icon.png') },
    { id: 5, source: require('../../../assets/images/icon.png') },
];

const searches = [
    'Search 1',
    'Search 2',
    'Search 3',
    'Search 4',
    'Search 5',
];

export default function Page() {
    return (
        <View>
            <Stack.Screen options={{ headerShown: false, title: "Search" }} />
            <TextInput style={styles.searchBar} placeholder="Search products, interests, and brands" />
            <FlatList
                data={images}
                horizontal
                renderItem={({ item }) => (
                    <Image source={item.source} style={styles.image} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <Text style={styles.frequentlySearchedText}>FREQUENTLY SEARCHED BY YOUR CONNECTIONS</Text>
            <FlatList
                data={searches}
                renderItem={({ item }) => (
                    <Text style={styles.searchText}>{item}</Text>
                )}
                keyExtractor={(item) => item}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        height: 40,
        borderRadius: 20,
        backgroundColor: '#8F91991A',
        margin: 10,
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
        margin: 10,
    },
    frequentlySearchedText: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10,
    },
    searchText: {
        fontSize: 14,
        margin: 10,
    },
});
