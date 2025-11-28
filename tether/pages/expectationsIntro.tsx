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

interface ExpectationsIntroProps {
  onBack: () => void;
  onContinue: () => void;
  onBackToPortal: () => void;
}

export const ExpectationsIntro = ({ onBack, onContinue, onBackToPortal }: ExpectationsIntroProps) => {
  const handleContinue = () => {
    onContinue();
  };

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
          <Text style={localStyles.title}>Setting Expectations</Text>
          <Text style={localStyles.description}>
            Before you start the conversation, take a moment to clarify what you hope for, what you fear, and what feels realistic. Setting expectations helps you stay grounded and respond thoughtfully instead of reactively.
          </Text>
        </View>
      </View>
      
      <Pressable
        style={localStyles.continueButton}
        onPress={handleContinue}
      >
        <Text style={localStyles.continueButtonText}>Continue</Text>
      </Pressable>

      <TouchableOpacity onPress={onBackToPortal} style={localStyles.backToPortalButton}>
        <Text style={localStyles.backToPortalText}>Back to Portal</Text>
      </TouchableOpacity>
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
    fontSize: 32,
    fontFamily: 'Avenir',
    color: palette.mediumBrown,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    fontFamily: 'Avenir',
    color: palette.darkBrown,
    lineHeight: 26,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  continueButton: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.05,
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
    fontWeight: '600',
  },
  backToPortalButton: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.05,
    left: SCREEN_WIDTH * 0.1,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backToPortalText: {
    fontSize: 16,
    fontFamily: 'Avenir',
    color: palette.slate,
    textDecorationLine: 'underline',
  },
});

