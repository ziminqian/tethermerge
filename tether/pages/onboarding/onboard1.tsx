import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground, Animated } from 'react-native';
import { palette } from '../../styles/palette';

const leftprofile = require('../../assets/onboard1/leftprofile.png');
const rightimage = require('../../assets/onboard1/rightimage.png');
const squiggle = require('../../assets/onboard1/squiggle.png');
const thought = require('../../assets/onboard1/thoughtbubble.png');
const back = require('../../assets/onboard1/backgroundonboard1.png');

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const THOUGHT_WIDTH = SCREEN_WIDTH * 0.45;
const THOUGHT_HEIGHT = SCREEN_HEIGHT * 0.45;

interface Onboard1Props {
  onContinue: () => void;
}

export default function Onboard1({ onContinue }: Onboard1Props) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animation after 3 seconds
    const timer = setTimeout(() => {
      // Fade out and slide up
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 450,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Transition to next screen after animation completes
        onContinue();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, slideAnim, onContinue]);

  return (
    <ImageBackground 
      source={back}
      style={styles.background}
      resizeMode='cover'
    >
      <Animated.View 
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        {/* Upper left text */}
        <View style={styles.topTextContainer}>
          <Text style={styles.topTextLine}>difficult</Text>
          <Text style={styles.topTextLine}>conversations are</Text>
          <Text style={styles.topTextLine}>hard...</Text>
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
        <Text style={styles.helpText}>...we're here to help</Text>
      </Animated.View>
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
    fontSize: 26,
    fontFamily: '../../assets/fonts/AbhayaLibre-Regular.ttf',
    color: palette.darkGray,
    lineHeight: 32,
    fontWeight: '300',
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
    fontSize: 26,
    fontFamily: '../../assets/fonts/AbhayaLibre-Regular.ttf',
    color: palette.darkGray,
    textAlign: 'right',
    zIndex: 2,
    fontWeight: '300',
  },
});
