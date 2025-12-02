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

interface Expectations2Props {
  onBack: () => void;
}

export const Expectations2 = ({ onBack }: Expectations2Props) => {
  return (
    <ImageBackground 
      source={require("../assets/backgrounds/light_ombre.png")}
      style={expectationStyles.background}
      resizeMode='cover'
    >
      <View style={expectationStyles.container}>
        <TouchableOpacity onPress={onBack} style={expectationStyles.backButton}>
          <ChevronLeft size={40} color={palette.slate} />
        </TouchableOpacity>
        
        <View style={expectationStyles.content}>
          <Text style={expectationStyles.title}>Expectations 2</Text>
        </View>
      </View>
    </ImageBackground>
  );
};
