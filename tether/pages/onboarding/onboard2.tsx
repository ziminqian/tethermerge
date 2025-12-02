import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Image, StyleSheet, Dimensions, ImageBackground, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '../../styles/palette';

const frogLeft = require('../../assets/onboard2/frog left.png');
const rightFrog = require('../../assets/onboard2/rightfrog.png');
const squiggle = require('../../assets/onboard2/squiggle.png');
const number1 = require('../../assets/onboard2/number1.png');
const lock = require('../../assets/onboard2/lock.png');
const background = require('../../assets/onboard2/background.png');

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Onboard2Props {
  onContinue: () => void;
}

export default function Onboard2({ onContinue }: Onboard2Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Fade in and slide up animation on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  useEffect(() => {
    // Start transition animation after 3 seconds
    const timer = setTimeout(() => {
      // Fade out and slide up
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 490,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 490,
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
      source={background}
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
        <View style={styles.topTextContainer}>
          <Text style={styles.topTextLine}>The journey starts</Text>
          <Text style={styles.topTextLine}>with reaching out to</Text>
          <Text style={styles.topTextLine}>a friend...</Text>
        </View>

        <Image 
          source={frogLeft} 
          style={styles.leftCharacter}
        />

        <Image 
          source={squiggle} 
          style={styles.wavyPath}
        />

        <View style={styles.nodesContainer}>
          <View style={styles.nodeContainer}>
            <Image 
              source={number1} 
              style={styles.nodeIcon}
            />
          </View>
          <View style={styles.nodeContainer}>
            <Image 
              source={lock} 
              style={styles.nodeIcon}
            />
          </View>
          <View style={styles.nodeContainer}>
            <Image 
              source={lock} 
              style={styles.nodeIcon}
            />
          </View>
          <View style={styles.nodeContainer}>
            <Image 
              source={lock} 
              style={styles.nodeIcon}
            />
          </View>
        </View>

        
        <Image 
          source={rightFrog} 
          style={styles.rightCharacter}
        />

        
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomTextLine}>...often the</Text>
          <Text style={styles.bottomTextLine}>hardest part.</Text>
        </View>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'visible',
  },
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'relative',
    overflow: 'visible',
  },
  title: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.05,
    left: SCREEN_WIDTH * 0.05,
    fontSize: 24,
    fontFamily: '../../assets/fonts/AbhayaLibre-Regular.ttf',
    color: palette.darkGray,
    fontWeight: '600',
    zIndex: 5,
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
    lineHeight: 30,
    fontWeight: '300',
  },
  leftCharacter: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.25,
    left: SCREEN_WIDTH * 0.08,
    width: SCREEN_WIDTH * 0.15,
    height: SCREEN_WIDTH * 0.15,
    resizeMode: 'contain',
    zIndex: 3,
  },
  wavyPath: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.5,
    left: SCREEN_WIDTH * 0.08,
    top: SCREEN_HEIGHT * 0.2,
    resizeMode: 'contain',
    tintColor: palette.darkGray,
    zIndex: 1,
  },
  nodesContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.4,
    left: SCREEN_WIDTH * 0.1,
    right: SCREEN_WIDTH * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  nodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeIcon: {
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_WIDTH * 0.2,
    resizeMode: 'contain',
  },
  rightCharacter: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.35,
    right: SCREEN_WIDTH * 0.05,
    width: SCREEN_WIDTH * 0.15,
    height: SCREEN_WIDTH * 0.15,
    resizeMode: 'contain',
    zIndex: 3,
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.06,
    right: SCREEN_WIDTH * 0.08,
    zIndex: 3,
    alignItems: 'flex-end',
  },
  bottomTextLine: {
    fontSize: 24,
    fontFamily: '../../assets/fonts/AbhayaLibre-Regular.ttf',
    color: palette.darkGray,
    lineHeight: 22,
    fontWeight: '300',
  },
});

