import { ActivityIndicator } from 'react-native';
import { View, Text } from './Themed';
import { Stack } from 'expo-router';

export default function Spinner() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Stack.Screen options={{ headerShown: false, title: 'Spinner' }} />
            <Text>
                <ActivityIndicator />
            </Text>
        </View>
    );
}