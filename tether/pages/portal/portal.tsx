import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ImageBackground, 
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import styles from '../../styles/styles';
import { palette } from '../../styles/palette';
import { Phone } from 'lucide-react-native';
import portalStyles from '../../styles/portalStyles';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iyjdjalbdcstlskoildv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5amRqYWxiZGNzdGxza29pbGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzOTA3NTEsImV4cCI6MjA3OTk2Njc1MX0.Oh5zp-WhW8DpzXRYP4exF14cq_oscot7zJsKkzwrPK4'
const db = createClient(supabaseUrl, supabaseKey)

const Back = require('../../assets/portal/Back.png');
const strokemap = require('../../assets/portal/strokemap.png');

const together = require('../../assets/portal/together.png');
const expectationsnum= require('../../assets/portal/expectation#image.png');
const reflect = require('../../assets/portal/reflect_icon.png');

const one = require('../../assets/portal/one.png');
const spiral = require('../../assets/portal/spiral_res.png');
const invite = require('../../assets/portal/invite.png');
const two = require('../../assets/portal/two.png');
const expectations = require('../../assets/portal/expectations_.png');
const lock = require('../../assets/portal/graylock.png');
const assurances = require('../../assets/portal/assurances.png');
const three = require('../../assets/portal/3.png');


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface PortalProps {
  contact: { id: string; name: string };
  isNewPortalRequest?: boolean;
  expectationsCompleted?: boolean;
  onBack: () => void;
  onNavigateToExpectations: () => void;
  onNavigateToReflect: () => void;
  onNavigateToAcceptInvite: () => void;
  onNavigateToLockedStep: () => void;
  onNavigateToAIAssurance: () => void;
  onStartCall?: () => void;
}

export const Portal = ({ contact, isNewPortalRequest = false, expectationsCompleted = false, onBack, onNavigateToExpectations, onNavigateToReflect, onNavigateToAcceptInvite, onNavigateToLockedStep, onNavigateToAIAssurance, onStartCall }: PortalProps) => {
  const [hasCompletedExpectations, setHasCompletedExpectations] = useState(expectationsCompleted);

  useEffect(() => {
    // Check database to see if all 5 sections are completed
    const checkExpectationsCompletion = async () => {
      try {
        const sections = ['section1', 'section2', 'section3', 'section4', 'section5'];
        const promises = sections.map(section =>
          db
            .from('expectations2')
            .select('id')
            .eq('section', section)
            .order('created_at', { ascending: false })
            .limit(1)
        );
        
        const results = await Promise.all(promises);
        const allCompleted = results.every(result => result.data && result.data.length > 0);
        setHasCompletedExpectations(allCompleted || expectationsCompleted);
      } catch (error) {
        console.error('Error checking expectations completion:', error);
        // Fall back to prop value if database check fails
        setHasCompletedExpectations(expectationsCompleted);
      }
    };

    checkExpectationsCompletion();
  }, [expectationsCompleted]);

  return (
    <ImageBackground 
      source={require("../../assets/backgrounds/background_vibrant.png")}
      // {require("../assets/backgrounds/light_ombre.png")}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode='cover'
    >
      <SafeAreaView style={{ flex: 1, overflow: 'visible' }}>
        <View style={styles.screen}>
          <View style={[styles.heading, {marginBottom: 0}]}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Image source={Back} style={{ width: 40, height: 40 }} resizeMode="contain" />
            </TouchableOpacity>
            {/* <Text style={styles.headingtext}>Portal with {contact.name}</Text> */}
          </View>

          <ScrollView 
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
          >
          </ScrollView>
        </View>
      </SafeAreaView>
      {/* Two frogs in upper right */}
      <View style={portalStyles.frogsContainer}>
        <Image 
          source={require("../../assets/frogs/cute_frogsx2.png")} 
          style={portalStyles.frogsImage} 
        />
        <View style={portalStyles.labelsContainer}>
          <Text style={portalStyles.userGraphicLabel}>You</Text>
          <Text style={portalStyles.userGraphicLabel}>{contact.name}</Text>
        </View>
      </View>
      <TouchableOpacity 
        onPress={onNavigateToAcceptInvite}
        style={portalStyles.spiralTouchable}
      >
        <Image 
          source={one} 
          style={portalStyles.one} 
        />
      </TouchableOpacity>
      <Image 
          source={invite} 
          style={portalStyles.invite} 
      />

      <Image 
              source={spiral} 
              style={portalStyles.spiral} 
        />
      {/* <View style={portalStyles.expectations_text_container}>
        <Image 
          source={expectations_text} 
          style={portalStyles.expectations_text} 
        />
        <Image 
          source={lock} 
          style={portalStyles.lock} 
        />
      </View> */}
      <TouchableOpacity 
        onPress={() => {
          if (isNewPortalRequest) {
            onNavigateToLockedStep();
          } else {
            onNavigateToExpectations();
          }
        }}
        style={portalStyles.expectationsTouchable}
      >
        <Image 
              source={isNewPortalRequest ? lock : two} 
              style={portalStyles.two} 
        />
      </TouchableOpacity>
      <Image 
        source={expectations} 
        style={portalStyles.expectationsImage} 
      />
      <View style={portalStyles.reflectContainer}> 
        <TouchableOpacity 
          onPress={() => {
            if (!hasCompletedExpectations) {
              onNavigateToLockedStep();
            } else {
              onNavigateToAIAssurance();
            }
          }}
          style={portalStyles.reflectTouchable}
        > 
          <Image 
            source={hasCompletedExpectations ? three : lock} 
            style={portalStyles.lock} 
          />
        </TouchableOpacity>
      </View>
      <Image 
        source={assurances} 
        style={portalStyles.assurances} 
      />
      
      <TouchableOpacity 
        style={portalStyles.portalCallButton}
        onPress={onStartCall}>
        <View style={portalStyles.portalCallButtonInner}>
          <Phone size={32} color={palette.cream} />
        </View>
      </TouchableOpacity>

      
      <View style={portalStyles.elementcontainer}>
         <Image 
            source={strokemap} 
            style={portalStyles.strokemap} 
          />
        <Image 
            source={together} 
            style={portalStyles.together} 
          />
       </View>
       
      
    </ImageBackground>
  );
};
