import { Link, Stack } from 'expo-router';
import { Container, Text, View } from '../../../components/Themed';

export default function Page() {
    return (
      <View>
        <Stack.Screen options={{ headerShown: true, title: "Settings" }} />
      </View>
    );
  }
