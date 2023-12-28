import React from 'react';
import { Text } from '../../../components/Themed';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import theme from '../../../constants/Colors';
import { Image } from 'expo-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons';

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
      <Text style={ styles.spokenSaysText }>Spoken is a private place for you and your friends to share your good taste and find the best stuff.</Text>
      <Text style={ styles.spokenSaysText }>Invite your friends to ask their advice, get feedback on potential purchases, show off what you’ve bought, and share things you love.</Text>
      <Text style={ styles.spokenSaysText }>To get started press the + button or try replying to one of our example posts.</Text>
    </View>
    <View style={styles.spokenAsksContainer}>
      <View style={styles.spokenAsksHeader}>
        <Image source={require('../../../assets/images/icon-dark.png')} style={{ width: 25, height: 25 }} />
        <View style={{ padding: 3 }} />
        <Text style={{ color: 'black' }}>SPOKEN</Text>
        <Text style={{ color: theme.light.accentColor }}> ASKS</Text>
      </View>
      <Text style={{ paddingVertical: 4, fontSize: 20 }}>What’s your single most essential piece of camping gear?</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <EvilIcons name="share-apple" size={22} color="black" />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <EvilIcons name="comment" size={20} color="black" />
          <Text style={styles.buttonText}>Reply</Text>
        </TouchableOpacity>
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
    paddingBottom: 6,
  },
  spokenSaysText: {
    color: '#E0E0E0',
    paddingVertical: 6,
    fontSize: 16,
  },
  spokenAsksContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  spokenAsksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 10,
  },
  button: {
    backgroundColor: theme.light.background,
    padding: 8,
    borderRadius: 5,
    flexDirection: 'row',
    gap: 6,
  },
  buttonText: {
    color: 'black',
  },
});
