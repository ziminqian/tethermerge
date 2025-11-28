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

interface ExpectationsSection3Props {
  onBack: () => void;
  onContinue: () => void;
  onBackToPortal: () => void;
}

export const ExpectationsSection3 = ({ onBack, onContinue, onBackToPortal }: ExpectationsSection3Props) => {
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
          <Text style={localStyles.sectionTitle}>Your Best-Case Outcome</Text>
          
          <View style={localStyles.bulletList}>
            <Text style={localStyles.bulletPoint}>• Feeling heard</Text>
            <Text style={localStyles.bulletPoint}>• Clearing up a misunderstanding</Text>
            <Text style={localStyles.bulletPoint}>• Naming a need</Text>
            <Text style={localStyles.bulletPoint}>• Repairing tension</Text>
          </View>

          <Text style={localStyles.prompt}>What would a meaningful, realistic positive outcome look like?</Text>
        </View>
      </View>
      
      <Pressable
        style={localStyles.continueButton}
        onPress={onContinue}
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
    paddingTop: 100,
  },
  sectionTitle: {
    fontSize: 28,
    fontFamily: 'Avenir',
    color: palette.mediumBrown,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
  },
  bulletList: {
    marginBottom: 32,
    width: '100%',
    paddingHorizontal: 30,
  },
  bulletPoint: {
    fontSize: 18,
    fontFamily: 'Avenir',
    color: palette.darkBrown,
    lineHeight: 32,
    marginBottom: 8,
  },
  prompt: {
    fontSize: 18,
    fontFamily: 'Avenir',
    color: palette.darkBrown,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 26,
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

