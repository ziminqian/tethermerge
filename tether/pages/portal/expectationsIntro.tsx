import React from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { palette } from '../../styles/palette';
import { ChevronLeft } from 'lucide-react-native';
import portalStyles from '../../styles/portalStyles';

const leftp = require('../../assets/other/leftp.png');
const rightp = require('../../assets/other/rightp.png');

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
        
        <View style={[portalStyles.content, { position: 'relative' }]}>
          <Image 
            source={leftp}
            style={{
              position: 'absolute',
              top: -40,
              left: -20,
              width: 120,
              height: 150,
              resizeMode: 'contain',
              zIndex: 1,
            }}
          />
          <Text style={[portalStyles.title,]}>Setting Expectations</Text>
          <Image 
            source={rightp}
            style={{
              position: 'absolute',
              bottom: -80,
              right: -30,
              width: 120,
              height: 150,
              resizeMode: 'contain',
              zIndex: 1,
            }}
          />
        </View>
      </View>
      
      <TouchableOpacity
        style={portalStyles.continueButton}
        onPress={handleContinue}
      >
        <Text style={[portalStyles.continueButtonText,]}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBackToPortal} style={portalStyles.backToPortalButton}>
        <Text style={[portalStyles.backToPortalText,]}>Back to Portal</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};
