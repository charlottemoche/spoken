import { Link, Stack } from 'expo-router';
import { Text, View } from '../../../components/Themed';
import { TextInput, FlatList, Image, StyleSheet } from 'react-native';

const images = [
    { id: 1, source: require('../../../assets/images/placeholder.png') },
    { id: 2, source: require('../../../assets/images/placeholder.png') },
    { id: 3, source: require('../../../assets/images/placeholder.png') },
    { id: 4, source: require('../../../assets/images/placeholder.png') },
    { id: 5, source: require('../../../assets/images/placeholder.png') },
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
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false, title: "Search" }} />
            <TextInput
                style={[styles.searchBar, { height: 50 }]}
                placeholder="Search products, interests, and brands"
                placeholderTextColor="#808080"
            />
            <FlatList
                data={images}
                horizontal
                style={styles.flatListContent}
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
    container: {
        flex: 1,
        padding: 6,
    },
    flatListContent: {
        flexGrow: 0,
    },
    searchBar: {
        height: 50,
        borderRadius: 20,
        backgroundColor: '#8F91991A',
        margin: 10,
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 10,
        marginHorizontal: 10,
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
