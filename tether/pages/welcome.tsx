import React from 'react';
import { View, Text, Pressable, Image, StyleSheet, Dimensions } from 'react-native';
import { palette } from '../styles/palette';

const bigLeftOutline = require('../assets/welcome/bigleftoutline.png');
const background = require('../assets/welcome/tetherbackground.png');
const rightProfile = require('../assets/welcome/rightprofile.png');
const circleButton = require('../assets/welcome/circle_button.png');
const topRectangle = require('../assets/welcome/top_rectangle.png');
const leftRectangle = require('../assets/welcome/left_rectangle.png');
const rightRectangle = require('../assets/welcome/right_rectangle.png');
const smallRectangle = require('../assets/welcome/small_rectangle.png');

interface WelcomeProps {
  onContinue: () => void;
}

export default function Welcome({ onContinue }: WelcomeProps) {
  return (
    <View style={styles.bigContainer}>
      {/* Background with grid pattern */}
      <Image 
        source={background}
        style={styles.background}
      />
      
      {/* Large left profile */}
      <Image 
        source={bigLeftOutline} 
        style={styles.bigleftoutline}
      />
      
      {/* Small right profile */}
      <Image 
        source={rightProfile} 
        style={styles.rightProfile}
      />
      
      {/* Transparent rectangles */}
      <Image 
        source={topRectangle} 
        style={styles.topRectangle}
      />
      <Image 
        source={leftRectangle} 
        style={styles.leftRectangle}
      />
      <Image 
        source={rightRectangle} 
        style={styles.rightRectangle}
      />
      <Image 
        source={smallRectangle} 
        style={styles.smallRectangle}
      />
      
      {/* Text: "safe space for difficult conversations" */}
      <View style={styles.taglineContainer}>
        <Text style={styles.taglineText}>safe space</Text>
        <Text style={styles.taglineText}>for difficult</Text>
        <Text style={styles.taglineText}>conversations</Text>
      </View>
      
      {/* Get Started Button */}
      <Pressable
        style={styles.getStartedButton}
        onPress={onContinue}
      >
        <Text style={styles.getStartedText}>Get Started</Text>
        <Image 
          source={circleButton} 
          style={styles.circleButtonIcon}
        />
      </Pressable>
      
      {/* Tether title at bottom left */}
      <Text style={styles.tetherTitle}>Tether</Text>
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
  bigleftoutline: {
    position: 'absolute',
    left: -45,
    top: 50,
    height: SCREEN_HEIGHT / 2,
    width: SCREEN_WIDTH * 0.95,
    resizeMode: 'contain',
    zIndex: 1,
  },
  rightProfile: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.3,
    width: SCREEN_WIDTH * 0.4,
    resizeMode: 'contain',
    zIndex: 1,
  },
  taglineContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.25,
    right: SCREEN_WIDTH * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  taglineText: {
    fontSize: 32,
    fontFamily: "../assets/fonts/AbhayaLibre-Regular.ttf",
    color: palette.mediumBrown,
    lineHeight: 28,
    textAlign: 'center',
  },
  tetherTitle: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.08,
    left: SCREEN_WIDTH * 0.08,
    fontSize: 42,
    fontFamily: "../assets/fonts/AbhayaLibre-Bold.ttf",
    color: palette.mediumBrown,
    zIndex: 2,
  },
  topRectangle: {
    position: 'absolute',
    top: 0,
    right: -40,
    height: SCREEN_HEIGHT * 0.7,
    width: SCREEN_WIDTH * 0.95,
    resizeMode: 'contain',
    zIndex: 1,
  },
  leftRectangle: {
    position: 'absolute',
    left: 0,
    top: SCREEN_HEIGHT * 0.7,
    height: SCREEN_HEIGHT * 0.5,
    width: SCREEN_WIDTH * 0.4,
    resizeMode: 'contain',
    zIndex: 1,
  },
  rightRectangle: {
    position: 'absolute',
    right: 0,
    bottom: SCREEN_HEIGHT * 0.2,
    height: SCREEN_HEIGHT * 0.3,
    width: SCREEN_WIDTH * 0.3,
    resizeMode: 'contain',
    zIndex: 1,
  },
  smallRectangle: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.65,
    right: 0,
    height: SCREEN_HEIGHT * 0.15,
    width: SCREEN_WIDTH * 0.25,
    resizeMode: 'contain',
    zIndex: 1,
  },
  getStartedButton: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.25,
    left: SCREEN_WIDTH * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.lightBeige,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    zIndex: 2,
    gap: 12,
  },
  getStartedText: {
    fontSize: 18,
    fontFamily: 'Avenir',
    color: palette.mediumBrown,
  },
  circleButtonIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});