import React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';

import AuthorizeAppleComponent from '../auth/AuthorizeAppleComponent';
import AuthorizeGoogleComponent from '../auth/AuthorizeGoogleComponent';

export default function EnterScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/splash.png')}
        style={styles.backgroundImage}>
        <View style={styles.bottomDiv}>
          <AuthorizeAppleComponent />
          <View style={styles.padding} />
          <AuthorizeGoogleComponent />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  bottomDiv: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding: {
    padding: 10,
  },
});
