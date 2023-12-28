import React from 'react';
import { Text } from '../../../components/Themed';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import theme from '../../../constants/Colors';
import { Image } from 'expo-image';

export default function Page() {
  return (
    <View style={styles.container}>
    <Stack.Screen options={{ headerShown: false, title: 'Home' }} />
    <View style={styles.spokenSaysContainer}>
      <View style={styles.spokenSaysHeader}>
        <Image source={require('../../../assets/images/icon.png')} style={{ width: 25, height: 25 }} />
        <View style={{ padding: 3 }} />
        <Text style={{ color: 'white' }}>SPOKEN</Text>
        <Text style={{ color: theme.dark.accentColor }}> SAYS</Text>
      </View>
    </View>
    <View style={styles.spokenAsksContainer}>
      <View style={styles.spokenAsksHeader}>
        <Image source={require('../../../assets/images/icon-dark.png')} style={{ width: 25, height: 25 }} />
        <View style={{ padding: 3 }} />
        <Text style={{ color: 'black' }}>SPOKEN</Text>
        <Text style={{ color: theme.light.accentColor }}> ASKS</Text>
      </View>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark.background,
  },
  spokenSaysContainer: {
    backgroundColor: theme.dark.background,
    padding: 12,
  },
  spokenSaysHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spokenAsksContainer: {
    backgroundColor: 'white',
    padding: 12,
  },
  spokenAsksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
