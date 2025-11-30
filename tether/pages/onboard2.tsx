import React from 'react';
import { View, Text, Pressable, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '../styles/palette';

const frogLeft = require('../assets/onboard2/frog left.png');
const rightFrog = require('../assets/onboard2/rightfrog.png');
const squiggle = require('../assets/onboard2/squiggle.png');
const number1 = require('../assets/onboard2/number1.png');
const lock = require('../assets/onboard2/lock.png');
const background = require('../assets/onboard2/background.png');

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Onboard2Props {
  onContinue: () => void;
}

export default function Onboard2({ onContinue }: Onboard2Props) {
  const handleContinue = () => {
    onContinue();
  };

  return (
    <ImageBackground 
      source={background}
      style={styles.background}
      resizeMode='cover'
    >
      <View style={styles.container}>
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

        <View style={styles.node1Container}>
            <Image 
              source={number1} 
              style={styles.nodeIcon}
            />
        </View>

        <View style={styles.node2Container}>
            <Image 
              source={lock} 
              style={styles.nodeIcon}
            />
        </View>

        <View style={styles.node3Container}>
            <Image 
              source={lock} 
              style={styles.nodeIcon}
            />
        </View>

        <View style={styles.node4Container}>
            <Image 
              source={lock} 
              style={styles.nodeIcon}
            />
        </View>

        
        <Image 
          source={rightFrog} 
          style={styles.rightCharacter}
        />

        
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomTextLine}>...often the</Text>
          <Text style={styles.bottomTextLine}>hardest part.</Text>
        </View>

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
    fontFamily: 'Avenir',
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
    fontSize: 22,
    fontFamily: 'Avenir',
    color: palette.darkGray,
    lineHeight: 30,
    fontWeight: '400',
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
  node1Container: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.28,
    left: SCREEN_WIDTH * 0.15,
    zIndex: 2,
  },
  node2Container: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.4,
    right: SCREEN_WIDTH * 0.2,
    zIndex: 2,
  },
  node3Container: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.55,
    left: SCREEN_WIDTH * 0.15,
    zIndex: 2,
  },
  node4Container: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.65,
    right: SCREEN_WIDTH * 0.2,
    zIndex: 2,
  },
  nodeCircle: {
    width: SCREEN_WIDTH * 0.12,
    height: SCREEN_WIDTH * 0.12,
    borderRadius: SCREEN_WIDTH * 0.06,
    backgroundColor: '#E8F5D0', // Light green with yellow-orange gradient
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nodeIcon: {
    width: SCREEN_WIDTH * 0.06,
    height: SCREEN_WIDTH * 0.06,
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
    fontSize: 22,
    fontFamily: 'Avenir',
    color: palette.darkGray,
    lineHeight: 22,
    fontWeight: '400',
  },
  continueButton: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.08,
    left: SCREEN_WIDTH * 0.5,
    transform: [{ translateX: -SCREEN_WIDTH * 0.2 }],
    backgroundColor: palette.lightBeige,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
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
    fontWeight: '500',
  },
});

