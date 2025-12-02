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
import { palette } from '../../styles/palette';
import { ChevronLeft } from 'lucide-react-native';
import expectationStyles from '../../styles/expectationStyles'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ExpectationsProps {
  onBack: () => void;
  onContinue: () => void;
}

export const Expectations = ({ onBack, onContinue }: ExpectationsProps) => {
 const handleContinue = () => {
        onContinue();
    };
  return (
    <ImageBackground 
      source={require("../assets/backgrounds/background_vibrant.png")}
      style={expectationStyles.background}
      resizeMode='cover'
    >
      <View style={expectationStyles.container}>
        <TouchableOpacity onPress={onBack} style={expectationStyles.backButton}>
          <ChevronLeft size={40} color={palette.slate} />
        </TouchableOpacity>
        
        <View style={expectationStyles.content}>
          <Text style={expectationStyles.title}> Setting Expectations</Text>
        </View>
      </View>
      <Pressable
          style={expectationStyles.continueButton}
          onPress={handleContinue}
        >
          <Text style={expectationStyles.continueButtonText}>Continue</Text>
      </Pressable>
    </ImageBackground>
  );
};
