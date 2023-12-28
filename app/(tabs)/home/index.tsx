import { EvilIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Text, View } from '../../../components/Themed';
import theme from '../../../constants/Colors';

export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false, title: 'Home' }} />
      <View lightColor={theme.dark.background} style={styles.spokenSaysContainer}>
        <View lightColor={theme.dark.background} style={styles.spokenSaysHeader}>
          <Image
            source={require('../../../assets/images/icon.png')}
            style={{ width: 25, height: 25 }}
          />
          <View lightColor={theme.dark.background} style={{ padding: 3 }} />
          <Text style={{ color: 'white' }}>SPOKEN</Text>
          <Text style={{ color: theme.dark.accentColor }}> SAYS</Text>
        </View>
        <Text style={styles.spokenSaysText}>
          Spoken is a private place for you and your friends to share your good taste and find the
          best stuff.
        </Text>
        <Text style={styles.spokenSaysText}>
          Invite your friends to ask their advice, get feedback on potential purchases, show off
          what you’ve bought, and share things you love.
        </Text>
        <Text style={styles.spokenSaysText}>
          To get started press the + button or try replying to one of our example posts.
        </Text>
      </View>
      <View style={styles.spokenAsksContainer} darkColor={'#282828'}>
        <View style={styles.spokenAsksHeader} darkColor={'#282828'}>
          <Image
            source={require('../../../assets/images/icon-dark.png')}
            style={{ width: 25, height: 25 }}
          />
          <View darkColor={'#282828'} style={{ padding: 3 }} />
          <Text>SPOKEN</Text>
          <Text lightColor={theme.light.accentColor} darkColor={theme.dark.accentColor}>
            {' '}
            ASKS
          </Text>
        </View>
        <Text style={styles.spokenAsksText}>
          What’s your single most essential piece of camping gear?
        </Text>
        <View darkColor={'#282828'} style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <EvilIcons name="share-apple" size={22} color="black" />
            <Text darkColor={theme.light.text}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <EvilIcons name="comment" size={20} color="black" />
            <Text darkColor={theme.light.text}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spokenSaysContainer: {
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
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  spokenAsksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spokenAsksText: {
    paddingVertical: 6,
    fontSize: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 6,
    marginTop: 10,
  },
  button: {
    padding: 8,
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    gap: 6,
  },
});
