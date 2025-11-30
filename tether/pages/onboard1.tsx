import React from 'react';
import { View, Text, Pressable, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { palette } from '../styles/palette';

const leftprofile = require('../assets/onboard1/leftprofile.png');
const rightimage = require('../assets/onboard1/rightimage.png');
const squiggle = require('../assets/onboard1/squiggle.png');
const thought = require('../assets/onboard1/thoughtbubble.png');
const back = require('../assets/onboard1/backgroundonboard1.png');

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const THOUGHT_WIDTH = SCREEN_WIDTH * 0.45;
const THOUGHT_HEIGHT = SCREEN_HEIGHT * 0.45;

interface Onboard1Props {
  onContinue: () => void;
}

export default function Onboard1({ onContinue }: Onboard1Props) {
  const handleContinue = () => {
    onContinue();
  };

  return (
    <ImageBackground 
      source={back}
      style={styles.background}
      resizeMode='cover'
    >
      <View style={styles.container}>
        {/* Upper left text */}
        <View style={styles.topTextContainer}>
          <Text style={styles.topTextLine}>difficult</Text>
          <Text style={styles.topTextLine}>conversations are</Text>
          <Text style={styles.topTextLine}>hard</Text>
        </View>

        {/* Left profile image */}
        <View style={styles.peopleContainer}>
          <Image 
            source={leftprofile} 
            style={styles.leftProfile}
          />
          
          {/* Right image */}
          <Image 
            source={rightimage} 
            style={styles.rightProfile}
          />
        </View>
        {/* Squiggle */}
        <Image 
          source={squiggle} 
          style={styles.squiggle}
        />
        
        {/* Thought bubble */}
        <Image 
          source={thought} 
          style={styles.thoughtBubble}
        />
        
        {/* Bottom center text */}
        <Text style={styles.helpText}>we're here to help</Text>
        
        {/* Continue Button */}
        <Pressable
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    overflow: 'visible',
  },
  topTextContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.08,
    left: SCREEN_WIDTH * 0.08,
    zIndex: 3,
  },
  topTextLine: {
    fontSize: 24,
    fontFamily: 'Avenir',
    color: palette.darkGray,
    lineHeight: 32,
    fontWeight: '400',
  },
  peopleContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'visible',
  },

  leftProfile: {
    position: 'absolute',
    left: 6,
    bottom: 0,               
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_HEIGHT * 0.45,
    resizeMode: 'contain',
  },
  
  rightProfile: {
    position: 'absolute',
    right: 10,
    bottom: 0,          
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_HEIGHT * 0.5,
    resizeMode: 'contain',
  },
  squiggle: {
    position: 'absolute',
    left: SCREEN_WIDTH * 0.25,
    top: SCREEN_HEIGHT * 0.45,
    width: SCREEN_WIDTH * 0.15,
    height: SCREEN_HEIGHT * 0.15,
    resizeMode: 'contain',
  },
  thoughtBubble: {
    position: 'absolute',
    width: THOUGHT_WIDTH,
    height: THOUGHT_HEIGHT,
    resizeMode: 'contain',
    left: (SCREEN_WIDTH - THOUGHT_WIDTH) / 2,
    top: (SCREEN_HEIGHT - THOUGHT_HEIGHT) / 3.5,
  },
  helpText: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.03,
    right: SCREEN_WIDTH * 0.1,
    fontSize: 24,
    fontFamily: 'Avenir',
    color: palette.darkGray,
    textAlign: 'right',
    zIndex: 2,
  },
  continueButton: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.05,
    right: SCREEN_WIDTH * 0.1,
    backgroundColor: palette.lightBeige,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    fontSize: 18,
    fontFamily: 'Avenir',
    color: palette.mediumBrown,
  },
});
