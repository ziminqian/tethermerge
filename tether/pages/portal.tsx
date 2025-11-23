import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ImageBackground, 
  TouchableOpacity, 
  ScrollView,
  Image
} from 'react-native';
import styles from '../styles/styles';
import { palette } from '../styles/palette';
import { ChevronLeft } from 'lucide-react-native';

interface PortalProps {
  contact: { id: string; name: string };
  onBack: () => void;
}

export const Portal = ({ contact, onBack }: PortalProps) => {
  return (
    <ImageBackground 
      source={require("../assets/backgrounds/light_ombre.png")}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode='cover'
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.screen}>
          <View style={[styles.heading, {marginBottom: 0}]}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <ChevronLeft size={40} color={palette.slate} />
            </TouchableOpacity>
            <Text style={styles.headingtext}>Portal with {contact.name}</Text>
          </View>

          <ScrollView 
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.centeredContent}>
              <View style={styles.userImg}>
                <Image 
                  source={require("../assets/frogs/cute_frogsx2.png")} 
                  style={{width: 150, height: 65}} 
                />
              </View>
              <View style={styles.userGraphic}>
                <Text style={styles.userGraphicLabel}>You</Text>
                <Text style={styles.userGraphicLabel}>{contact.name}</Text>
              </View>
            </View>

            <View style={{ marginTop: 30, padding: 20 }}>
              <Text style={[styles.text, { fontSize: 18, marginBottom: 10 }]}>
                Portal Status: Active
              </Text>
              <Text style={[styles.text, { fontSize: 16, color: palette.mutedBrown }]}>
                This is your safe space for difficult conversations with {contact.name}.
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

