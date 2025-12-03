import React from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
} from 'react-native';
import { palette } from '../../styles/palette';
import { ChevronLeft } from 'lucide-react-native';
import portalStyles from '../../styles/portalStyles';

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
      source={require("../../assets/backgrounds/background_vibrant.png")}
      style={portalStyles.background}
      resizeMode='cover'
    >
      <View style={portalStyles.container}>
        <TouchableOpacity onPress={onBack} style={portalStyles.backButton}>
          <ChevronLeft size={40} color={palette.slate} />
        </TouchableOpacity>
        
        <View style={[portalStyles.content, { paddingTop: 80 }]}>
          <Text style={[portalStyles.title, { fontFamily: 'Avenir' }]}>Setting Expectations</Text>
        </View>
      </View>
      
      <TouchableOpacity
        style={portalStyles.continueButton}
        onPress={handleContinue}
      >
        <Text style={[portalStyles.continueButtonText, { fontFamily: 'Avenir' }]}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBackToPortal} style={portalStyles.backToPortalButton}>
        <Text style={[portalStyles.backToPortalText, { fontFamily: 'Avenir' }]}>Back to Portal</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};
