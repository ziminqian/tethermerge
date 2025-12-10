import React from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
  Image
} from 'react-native';
import { palette } from '../../styles/palette';
import { ChevronLeft } from 'lucide-react-native';
import portalStyles from '../../styles/portalStyles';

interface ExpectationsProps {
  onBack: () => void;
  onContinue: () => void;
  portalId: string; // Add portalId
  contactId: string; // Add contactId
  contactName?: string; // Optional: for display purposes
}

export const Expectations = ({ 
  onBack, 
  onContinue, 
  portalId, 
  contactId,
  contactName 
}: ExpectationsProps) => {
  const handleContinue = () => {
    onContinue();
  };

  return (
    <ImageBackground 
      source={require("../assets/backgrounds/background_vibrant.png")}
      style={portalStyles.background}
      resizeMode='cover'
    >
      <View style={portalStyles.container}>
        <TouchableOpacity onPress={onBack} style={portalStyles.backButton}>
          <ChevronLeft size={40} color={palette.slate} />
        </TouchableOpacity>
        
        <View style={portalStyles.content}>
          <Text style={portalStyles.title}>Setting Expectations</Text>
          {contactName && (
            <Text style={[portalStyles.prompt, { textAlign: 'center', marginTop: 20 }]}>
              Preparing for your conversation with {contactName}
            </Text>
          )}
          <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
            <Text style={[portalStyles.bulletPoint, { marginBottom: 16 }]}>
              • Take time to think about what you can control
            </Text>
            <Text style={[portalStyles.bulletPoint, { marginBottom: 16 }]}>
              • Acknowledge what's outside your control
            </Text>
            <Text style={[portalStyles.bulletPoint, { marginBottom: 16 }]}>
              • Envision a realistic positive outcome
            </Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity
        style={portalStyles.continueButton}
        onPress={handleContinue}
      >
        <Text style={portalStyles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};