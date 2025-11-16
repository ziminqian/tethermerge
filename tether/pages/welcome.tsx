import React from 'react';
import { View, Text, Pressable, Image, StyleSheet, Dimensions } from 'react-native';

const bigLeftOutline = require('./components/welcome/bigleftoutline.png');
const background = require('./components/welcome/tetherbackground.png');
const top_rectangle = require('./components/welcome/top_rectangle.png');


interface WelcomeProps {
  onContinue: () => void;
}



export default function Welcome({ onContinue }: WelcomeProps) {
  return (
    <View style={styles.bigContainer}>

      <View style={styles.contentContainer}>
        <Image 
          source={bigLeftOutline} 
          style={styles.bigleftoutline}
        />
        <Image 
          source={top_rectangle} 
          style={styles.top_rectangle}
        />
        <Image 
        source={background}
        style={styles.background}
         />
        {/* 
        <Pressable
          style={[styles.loginButtonPrimary, { width: '100%', maxWidth: 300 }]}
          onPress={onContinue}
        >
          <Text style={styles.loginButtonTextPrimary}>Get Started</Text>
        </Pressable>
        */}
      </View>
    </View>
  );
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    margin: 0,
    padding: 0,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    resizeMode: 'cover',
    margin: 0,
    padding: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  top_rectangle: {
    position: 'absolute',
    top: 0,
    right: -40,
    height: SCREEN_HEIGHT * (3/4),
    width: SCREEN_WIDTH * (0.95),
    resizeMode: 'contain',
    zIndex: 1,
  },
  bigleftoutline: {
    position: 'absolute',
    left: -45,
    top: 50,
    height: SCREEN_HEIGHT / 2,
    width: SCREEN_WIDTH * (0.95),
    resizeMode: 'contain',
    zIndex: 1,
  }
});
