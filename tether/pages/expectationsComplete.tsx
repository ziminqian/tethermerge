import React from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable
} from 'react-native';
import { palette } from '../styles/palette';
import { ChevronLeft } from 'lucide-react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ExpectationsCompleteProps {
  onBack: () => void;
  onBackToPortal: () => void;
}

export const ExpectationsComplete = ({ onBack, onBackToPortal }: ExpectationsCompleteProps) => {
  return (
    <ImageBackground 
      source={require("../assets/backgrounds/background_vibrant.png")}
      style={localStyles.background}
      resizeMode='cover'
    >
      <View style={localStyles.container}>
        <TouchableOpacity onPress={onBack} style={localStyles.backButton}>
          <ChevronLeft size={40} color={palette.slate} />
        </TouchableOpacity>
        
        <View style={localStyles.content}>
          <Text style={localStyles.title}>Complete!</Text>
          <Text style={localStyles.message}>
            You've set your expectations. You're ready to have this conversation with clarity and intention.
          </Text>
        </View>
      </View>

      <Pressable
        style={localStyles.backToPortalButtonMain}
        onPress={onBackToPortal}
      >
        <Text style={localStyles.backToPortalButtonText}>Back to Portal</Text>
      </Pressable>
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
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
  backButton: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.05,
    left: SCREEN_WIDTH * 0.05,
    zIndex: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontFamily: 'Avenir',
    color: palette.mediumBrown,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  message: {
    fontSize: 20,
    fontFamily: 'Avenir',
    color: palette.darkBrown,
    lineHeight: 30,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  backToPortalButtonMain: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.05,
    left: SCREEN_WIDTH * 0.5,
    transform: [{ translateX: -SCREEN_WIDTH * 0.2 }],
    backgroundColor: palette.lightBeige,
    paddingVertical: 16,
    paddingHorizontal: 32,
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
    width: SCREEN_WIDTH * 0.4,
  },
  backToPortalButtonText: {
    fontSize: 18,
    fontFamily: 'Avenir',
    color: palette.mediumBrown,
    fontWeight: '600',
  },
});

