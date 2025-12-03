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

interface Expectations2Props {
  onBack: () => void;
}

export const Expectations2 = ({ onBack }: Expectations2Props) => {
  return (
    <ImageBackground 
      source={require("../assets/backgrounds/light_ombre.png")}
      style={portalStyles.background}
      resizeMode='cover'
    >
      <View style={portalStyles.container}>
        <TouchableOpacity onPress={onBack} style={portalStyles.backButton}>
          <ChevronLeft size={40} color={palette.slate} />
        </TouchableOpacity>
        
        <View style={[portalStyles.content, { paddingTop: 80 }]}>
          <Text style={[portalStyles.title, { fontFamily: 'Avenir' }]}>Expectations 2</Text>
        </View>
      </View>
    </ImageBackground>
  );
};
