import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { View, Text } from '../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AddModal() {
    return (
        <View style={styles.container}>
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            
            <Pressable style={styles.button}>
                {({ pressed }) => (
                // <Link href='/post/create'>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#121212' }}>
                        <FontAwesome name="question-circle" color='white' size={21} style={{ paddingRight: 3 }} />
                        <Text style={{ fontSize: 16, fontWeight: '400', color: 'white' }}>Ask for a recommendation</Text>
                    </View>
                // </Link>
            )}
            </Pressable>

            <Pressable style={styles.button}>
                {({ pressed }) => (
                // <Link href='/post/create'>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#121212' }}>
                        <FontAwesome name="comments" color='white' size={21} style={{ paddingRight: 3 }} />
                        <Text style={{ fontSize: 16, fontWeight: '400', color: 'white' }}>Get feedback on a product</Text>
                    </View>
                // </Link>
            )}
            </Pressable>

            <Pressable style={styles.button}>
                {({ pressed }) => (
                // <Link href='/post/create'>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#121212' }}>
                        <FontAwesome name="thumbs-o-up" size={20} color='white' style={{ paddingRight: 3 }} />
                        <Text style={{ fontSize: 16, fontWeight: '400', color: 'white' }}>Make a recommendation</Text>
                    </View>
                // </Link>
            )}
            </Pressable>

            <Pressable style={styles.button}>
                {({ pressed }) => (
                <Link href='/post/create' style={{ marginBottom: -4 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#121212' }}>
                        <Ionicons name="add-circle" size={20} color='white' style={{ paddingRight: 1.5 }} />
                        <Text style={{ fontSize: 16, fontWeight: '400', color: 'white' }}>Post a product</Text>
                    </View>
                </Link>
            )}
            </Pressable>

            <Pressable style={styles.button}>
                {({ pressed }) => (
                <Link href='/contacts' style={{ marginBottom: -4 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#121212' }}>
                        <Ionicons name="person-add" size={20} color='white' style={{ paddingRight: 2 }} />
                        <Text style={{ fontSize: 16, fontWeight: '400', color: 'white' }}>Invite a friend</Text>
                    </View>
                </Link>
            )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 12,
    },
    button: {
        width: '90%',
        backgroundColor: '#121212',
        padding: 16,
        marginVertical: 12,
        marginHorizontal: 16,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400',
    },
});
