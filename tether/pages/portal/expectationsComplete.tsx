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

interface ExpectationsCompleteProps {
  onBack: () => void;
  onBackToPortal: () => void;
}

export const ExpectationsComplete = ({ onBack, onBackToPortal }: ExpectationsCompleteProps) => {
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
        
        <View style={[portalStyles.content]}>
          <Text style={[portalStyles.title,]}>Complete!{"\n"}</Text>
          <Text style={[portalStyles.message,]}>
            Congrats, you've set your expectations!
          </Text>
          <Text style={[portalStyles.message,]}>
            You're ready to have this conversation with clarity and intention.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={portalStyles.backToPortalButtonMain}
        onPress={onBackToPortal}
      >
        <Text style={[portalStyles.backToPortalButtonText,]}>Back to Portal</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};
