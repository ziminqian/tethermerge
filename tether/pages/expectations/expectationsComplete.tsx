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
import expectationStyles from '../../styles/expectationStyles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ExpectationsCompleteProps {
  onBack: () => void;
  onBackToPortal: () => void;
}

export const ExpectationsComplete = ({ onBack, onBackToPortal }: ExpectationsCompleteProps) => {
  return (
    <ImageBackground 
      source={require("../../assets/backgrounds/background_vibrant.png")}
      style={expectationStyles.background}
      resizeMode='cover'
    >
      <View style={expectationStyles.container}>
        <TouchableOpacity onPress={onBack} style={expectationStyles.backButton}>
          <ChevronLeft size={40} color={palette.slate} />
        </TouchableOpacity>
        
        <View style={expectationStyles.content}>
          <Text style={expectationStyles.title}>Complete!</Text>
          <Text style={expectationStyles.message}>
            You've set your expectations. You're ready to have this conversation with clarity and intention.
          </Text>
        </View>
      </View>

      <Pressable
        style={expectationStyles.backToPortalButtonMain}
        onPress={onBackToPortal}
      >
        <Text style={expectationStyles.backToPortalButtonText}>Back to Portal</Text>
      </Pressable>
    </ImageBackground>
  );
};
