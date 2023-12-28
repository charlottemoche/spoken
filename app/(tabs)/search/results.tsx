import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function Results() {
  return (
    <View>
      <Stack.Screen options={{ headerShown: false, title: 'Results' }} />
    </View>
  );
}
