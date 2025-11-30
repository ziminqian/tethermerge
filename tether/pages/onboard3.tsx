import React from 'react';
import { View, Text, Pressable, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { palette } from '../styles/palette';

const portal = require('../assets/onboard3/portal.png');
const enterButton = require('../assets/onboard3/enter_button.png');
const together = require('../assets/onboard3/together.png');

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Onboard3Props {
  onContinue: () => void;
}

export default function Onboard3({ onContinue }: Onboard3Props) {
  return (
    <ImageBackground 
      source={require("../assets/backgrounds/background_vibrant.png")}
      style={styles.background}
      resizeMode='cover'
    >
      <View style={styles.container}>
        {/* Top text */}
        <Text style={styles.topText}>enter portal to begin</Text>
        
        {/* Portal spiral graphic - upper middle */}
        <Image 
          source={portal} 
          style={styles.portal}
        />
        
        {/* Enter button - directly below portal */}
        <Pressable
          style={styles.enterButton}
          onPress={onContinue}
        >
          <Image 
            source={enterButton} 
            style={styles.enterButtonImage}
          />
        </Pressable>
        
        {/* Enter button */}
        
        {/* Two profiles together - at bottom */}
        <Image 
          source={together} 
          style={styles.together}
        />
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
    position: 'relative',
    overflow: 'visible',
  },
  topText: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.15,
    left: 0,
    right: 0,
    fontSize: 20,
    fontFamily: 'Avenir',
    color: palette.darkBrown,
    fontWeight: '500',
    textAlign: 'center',
    zIndex: 2,
  },
  portal: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.03,
    left: (SCREEN_WIDTH - SCREEN_WIDTH * 1.5) / 2, // Centers horizontally
    width: SCREEN_WIDTH * 1.5,
    height: SCREEN_WIDTH * 1.5,
    resizeMode: 'contain',
    zIndex: 1,
  },
  enterButton: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.53,
    left: SCREEN_WIDTH * 0.3,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 3,
  },
  enterButtonImage: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.06,
    resizeMode: 'contain',
  },
  together: {
    position: 'absolute',
    bottom: 0,
    left: (SCREEN_WIDTH - SCREEN_WIDTH * 1.5) / 2, // Centers horizontally
    width: SCREEN_WIDTH * 1.5,
    height: SCREEN_HEIGHT * 0.4,
    resizeMode: 'contain',
    zIndex: 2,
  },
});