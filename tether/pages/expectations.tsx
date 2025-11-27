import React from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { palette } from '../styles/palette';
import { ChevronLeft } from 'lucide-react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ExpectationsProps {
  onBack: () => void;
}

export const Expectations = ({ onBack }: ExpectationsProps) => {
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
          <Text style={localStyles.title}>Expectations</Text>
        </View>
      </View>
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
    fontSize: 28,
    fontFamily: 'Avenir',
    color: palette.mediumBrown,
    fontWeight: '600',
  },
});
