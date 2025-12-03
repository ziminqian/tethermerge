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

const spiral = require('../../assets/portal/spiral_res.png');

interface AcceptInviteProps {
  contact: { id: string; name: string };
  onBack: () => void;
  onNavigateToExpectations: () => void;
}

export const AcceptInvite = ({ contact, onBack, onNavigateToExpectations }: AcceptInviteProps) => {
  return (
    <ImageBackground 
      source={require("../../assets/backgrounds/light_ombre.png")}
      style={portalStyles.background}
      resizeMode='cover'
    >
      <View style={portalStyles.container}>
        <TouchableOpacity onPress={onBack} style={portalStyles.backButton}>
          <ChevronLeft size={40} color={palette.slate} />
        </TouchableOpacity>
        
        <View style={[portalStyles.content, { paddingTop: 80, justifyContent: 'center', flex: 1, alignItems: 'center' }]}>
          <Text style={[portalStyles.title, { fontFamily: 'Avenir', textAlign: 'center' }]}>
            {contact.name} accepted invite! Continue to setting expectations
          </Text>
          <TouchableOpacity
            style={[portalStyles.continueButton, { marginTop: 8, alignSelf: 'center' }]}
            onPress={onNavigateToExpectations}
          >
            <Text style={[portalStyles.continueButtonText, { fontFamily: 'Avenir' }]}>
              Continue to Expectations
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <TouchableOpacity onPress={onBack} style={{ alignItems: 'center' }}>
            <Image 
              source={spiral} 
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
            />
            <Text style={[portalStyles.backToPortalText, { fontFamily: 'Avenir', marginTop: 8 }]}>
              Back to Portal
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
