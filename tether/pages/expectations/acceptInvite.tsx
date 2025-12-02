import React from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { palette } from '../../styles/palette';
import { ChevronLeft } from 'lucide-react-native';
import expectationStyles from '../../styles/expectationStyles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface AcceptInviteProps {
  onBack: () => void;
}

export const AcceptInvite = ({ onBack }: AcceptInviteProps) => {
  return (
    <ImageBackground 
      source={require("../../assets/backgrounds/light_ombre.png")}
      style={expectationStyles.background}
      resizeMode='cover'
    >
      <View style={expectationStyles.container}>
        <TouchableOpacity onPress={onBack} style={expectationStyles.backButton}>
          <ChevronLeft size={40} color={palette.slate} />
        </TouchableOpacity>
        
        <View style={expectationStyles.content}>
          <Text style={expectationStyles.title}>Accept Invite</Text>
        </View>
      </View>
    </ImageBackground>
  );
};
