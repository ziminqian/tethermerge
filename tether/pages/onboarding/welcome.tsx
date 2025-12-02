import React from 'react';
import { View, Text, Pressable, Image, StyleSheet, Dimensions } from 'react-native';
import { palette } from '../../styles/palette';
import styles from '../../styles/styles';

const bigLeftOutline = require('../../assets/welcome/bigleftoutline.png');
const background = require('../../assets/welcome/tetherbackground.png');
const rightProfile = require('../../assets/welcome/rightprofile.png');
const circleButton = require('../../assets/welcome/circle_button.png');
const topRectangle = require('../../assets/welcome/top_rectangle.png');
const leftRectangle = require('../../assets/welcome/left_rectangle.png');
const rightRectangle = require('../../assets/welcome/right_rectangle.png');
const smallRectangle = require('../../assets/welcome/small_rectangle.png');

interface WelcomeProps {
  onContinue: () => void;
}

export default function Welcome({ onContinue }: WelcomeProps) {
  return (
    <View style={localStyles.bigContainer}>
      {/* Background with grid pattern */}
      <Image 
        source={background}
        style={localStyles.background}
      />
      
      {/* Large left profile */}
      <Image 
        source={bigLeftOutline} 
        style={localStyles.bigleftoutline}
      />
    
      <Image 
        source={rightProfile} 
        style={localStyles.rightProfile}
      />
      
      <Image 
        source={topRectangle} 
        style={localStyles.topRectangle}
      />
      <Image 
        source={leftRectangle} 
        style={localStyles.leftRectangle}
      />
      <Image 
        source={rightRectangle} 
        style={localStyles.rightRectangle}
      />
      
      <View style={localStyles.taglineContainer}>
        <Text style={localStyles.taglineText}>safe space</Text>
        <Text style={localStyles.taglineText}>for difficult</Text>
        <Text style={localStyles.taglineText}>conversations</Text>
      </View>
      
      <Pressable
        style={localStyles.getStartedButton}
        onPress={onContinue}
      >
        <Text style={localStyles.getStartedText}>Get Started</Text>
        <Image 
          source={circleButton} 
          style={localStyles.circleButtonIcon}
        />
      </Pressable>
      
      <Text style={[styles.titleLarge, localStyles.tetherTitle]}>Tether</Text>
    </View>
  );
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const localStyles = StyleSheet.create({
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
    gap: 5,
  },
  taglineText: {
    fontSize: 26,
    fontStyle: "italic",
    fontFamily: '../../assets/fonts/AbhayaLibre-Regular.ttf',
    color: palette.mediumBrown,
    lineHeight: 28,
    textAlign: 'center',
  },
  tetherTitle: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.08,
    left: SCREEN_WIDTH * 0.08,
    //fontSize: 42,
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
    bottom: 0,
    height: SCREEN_HEIGHT * 0.3,
    width: SCREEN_WIDTH * 0.5,
    resizeMode: 'cover',
    zIndex: 1,
  },
  rightRectangle: {
    position: 'absolute',
    left: SCREEN_WIDTH * 0.5,
    bottom: 0,
    height: SCREEN_HEIGHT * 0.3,
    width: SCREEN_WIDTH * 0.5,
    resizeMode: 'cover',
    zIndex: 1,
  },
  getStartedButton: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.25,
    left: SCREEN_WIDTH * -0.1,
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.07,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#E4FBD4",
    paddingVertical: 14,
    paddingHorizontal: 24,
    paddingLeft: 120,
    borderRadius: 30,
    zIndex: 2,
    gap: 20,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  getStartedText: {
    fontSize: 28,
    fontFamily: '../../assets/fonts/AbhayaLibre-Regular.ttf',
    color: palette.mediumBrown,
  },
  circleButtonIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});