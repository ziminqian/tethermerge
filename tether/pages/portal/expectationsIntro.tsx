import React from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { palette } from '../../styles/palette';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import portalStyles from '../../styles/portalStyles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

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
        {/* Left figure - top left */}
        <Image
          source={leftp}
          style={{
            position: 'absolute',
            top: -120,
            left: 3,
            width: SCREEN_WIDTH * 0.7,
            height: SCREEN_HEIGHT * 0.75,
            resizeMode: 'contain',
            zIndex: 1,
          }}
        />

        {/* Right figure - bottom right */}
        <Image
          source={rightp}
          style={{
            position: 'absolute',
            bottom: -60,
            right: 1,
            width: SCREEN_WIDTH * 0.9,
            height: SCREEN_HEIGHT * 0.95,
            resizeMode: 'contain',
            zIndex: 1,
          }}
        />

        {/* Centered content */}
        <View style={[portalStyles.content, { position: 'relative', justifyContent: 'center', flex: 1 }]}>
          <Text style={[portalStyles.title, { textAlign: 'center' }]}>Setting Expectations</Text>
        </View>
      </View>

      {/* Bottom navigation */}
      <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, zIndex: 10 }}>
        <TouchableOpacity onPress={onBack} style={{ padding: 10 }}>
          <ChevronLeft size={32} color={palette.slate} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleContinue} style={{ padding: 10 }}>
          <ChevronRight size={32} color={palette.slate} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
