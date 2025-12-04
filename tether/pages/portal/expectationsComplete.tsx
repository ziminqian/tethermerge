import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
} from 'react-native';
import { palette } from '../../styles/palette';
import { ChevronLeft } from 'lucide-react-native';
import portalStyles from '../../styles/portalStyles';
import { updatePortalStep } from '../../utils/portalProgress';

interface ExpectationsCompleteProps {
  contact: { id: string; name: string; color: any };
  onBack: () => void;
  onBackToPortal: () => void;
}

export const ExpectationsComplete = ({ contact, onBack, onBackToPortal }: ExpectationsCompleteProps) => {
  
  useEffect(() => {
    // Mark expectations as completed when this screen is shown
    const markComplete = async () => {
      await updatePortalStep(contact.id, 'expectationsCompleted', true);
    };
    markComplete();
  }, [contact.id]);

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