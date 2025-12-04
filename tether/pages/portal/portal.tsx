import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ImageBackground, 
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import styles from '../../styles/styles';
import { palette } from '../../styles/palette';
import { Phone } from 'lucide-react-native';
import portalStyles from '../../styles/portalStyles';
import { createClient } from '@supabase/supabase-js';
import { Reflect } from './reflect';

const supabaseUrl = 'https://iyjdjalbdcstlskoildv.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5amRqYWxiZGNzdGxza29pbGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzOTA3NTEsImV4cCI6MjA3OTk2Njc1MX0.Oh5zp-WhW8DpzXRYP4exF14cq_oscot7zJsKkzwrPK4';
const db = createClient(supabaseUrl, supabaseKey);

const Back = require('../../assets/portal/Back.png');
const strokemap = require('../../assets/portal/strokemap.png');

const together = require('../../assets/portal/together.png');
const expectationsnum = require('../../assets/portal/expectation#image.png');
const reflect = require('../../assets/portal/reflect_icon.png');

const one = require('../../assets/portal/one.png');
const spiral = require('../../assets/portal/spiral_res.png');
const invite = require('../../assets/portal/invite.png');
const two = require('../../assets/portal/two.png');
const expectations = require('../../assets/portal/expectations_.png');
const lock = require('../../assets/portal/graylock.png');
const assurances = require('../../assets/portal/assurances.png');
const three = require('../../assets/portal/3.png');
const four = require('../../assets/portal/four.png');
const reflectwhite = require('../../assets/portal/reflectwhite.png');

const maptwo = require('../../assets/portal/maptwo.png');

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface PortalProps {
  contact: { id: string; name: string; color: any };
  userColor?: any;
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

export const Portal = ({
  contact,
  userColor,
  isNewPortalRequest = false,
  expectationsCompleted = false,
  onBack,
  onNavigateToExpectations,
  onNavigateToReflect,
  onNavigateToAcceptInvite,
  onNavigateToLockedStep,
  onNavigateToAIAssurance,
  onStartCall,
}: PortalProps) => {
  const [hasCompletedExpectations, setHasCompletedExpectations] =
    useState(expectationsCompleted);

  // when true, show the dedicated full-screen map view
  const [showMap, setShowMap] = useState(false);
  // when true, show the reflect page
  const [showReflect, setShowReflect] = useState(false);

  useEffect(() => {
    const checkExpectationsCompletion = async () => {
      try {
        const sections = ['section1', 'section2', 'section3', 'section4', 'section5'];
        const promises = sections.map((section) =>
          db
            .from('expectations2')
            .select('id')
            .eq('section', section)
            .order('created_at', { ascending: false })
            .limit(1)
        );

        const results = await Promise.all(promises);
        const allCompleted = results.every(
          (result) => result.data && result.data.length > 0
        );
        setHasCompletedExpectations(allCompleted || expectationsCompleted);
      } catch (error) {
        console.error('Error checking expectations completion:', error);
        setHasCompletedExpectations(expectationsCompleted);
      }
    };

    checkExpectationsCompletion();
  }, [expectationsCompleted]);

  // --------- REFLECT PAGE ----------
  if (showReflect) {
    return (
      <Reflect onBack={() => setShowReflect(false)} />
    );
  }

  // --------- FULL-SCREEN MAP VIEW (no dark overlay) ----------
  if (showMap) {
    return (
      <ImageBackground
        source={require('../../assets/backgrounds/background_vibrant.png')}
        style={{ flex: 1, width: '100%', height: '100%' }}
        resizeMode="cover"
      >
        <SafeAreaView style={{ flex: 1 }}>
          {/* Back to portal button - positioned at top left */}
          <TouchableOpacity
            onPress={() => setShowMap(false)}
            style={{
              position: 'absolute',
              top: 40,
              left: 8,
              zIndex: 100,
              padding: 8,
            }}
          >
            <Image
              source={Back}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 32,
              alignItems: 'center',
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* Together image */}
            <Image
              source={together}
              style={{
                width: SCREEN_WIDTH * 1.3,
                resizeMode: 'contain',
                marginTop: 0,
                marginBottom: 0,
                top: -80,
              }}
            />

            {/* Map image */}
            <Image
              source={maptwo}
              style={{
                width: SCREEN_WIDTH * 0.6,
                height: SCREEN_HEIGHT * 0.5,
                resizeMode: 'contain',
                marginTop: -250,
              }}
            />
          </ScrollView>

          {/* Reflect white image - above four.png */}
          <TouchableOpacity
            onPress={() => setShowReflect(true)}
            style={{
              position: 'absolute',
              top: SCREEN_HEIGHT / 2 - SCREEN_WIDTH * 0.1 - 120 - SCREEN_WIDTH * 0.15,
              left: SCREEN_WIDTH / 2 - SCREEN_WIDTH * 0.17,
              zIndex: 100,
            }}
          >
            <Image
              source={reflectwhite}
              style={{
                width: SCREEN_WIDTH * 0.3,
                height: SCREEN_WIDTH * 0.3,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>

          {/* Four image - centered in the middle of the screen */}
          <TouchableOpacity
            onPress={() => setShowReflect(true)}
            style={{
              position: 'absolute',
              top: SCREEN_HEIGHT / 2 - SCREEN_WIDTH * 0.1 - 100,
              left: SCREEN_WIDTH / 2 - SCREEN_WIDTH * 0.1,
              zIndex: 100,
            }}
          >
            <Image
              source={four}
              style={{
                width: SCREEN_WIDTH * 0.2,
                height: SCREEN_WIDTH * 0.2,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  // --------- ORIGINAL PORTAL SCREEN (unchanged layout) ----------
  return (
    <ImageBackground
      source={require('../../assets/backgrounds/background_vibrant.png')}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, overflow: 'visible' }}>
        <View style={styles.screen}>
          <View style={[styles.heading, { marginBottom: 0, zIndex: 100 }]}>
            <TouchableOpacity
              onPress={onBack}
              style={[styles.backButton, { zIndex: 100 }]}
            >
              <Image
                source={Back}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            {/* <Text style={styles.headingtext}>Portal with {contact.name}</Text> */}
          </View>

          {/* Your ScrollView is still here as in the original; it was empty */}
          <ScrollView 
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>

      {/* ORIGINAL ABSOLUTE / OVERLAY CONTENT – same positioning as before */}

      {/* Two frogs in upper right */}
      <View style={portalStyles.frogsContainer}>
        <View style={portalStyles.frogPair}>
          {/* User's frog (left) */}
          <View style={portalStyles.singleFrog}>
            <Image 
              source={require('../../assets/frogs/cute_frog_body.png')}
              style={[
                portalStyles.frogBody,
                { height: 37 },
                { transform: [{ translateY: 6 }, { translateX: 9 }, { scaleX: -1 }] },
              ]}
              resizeMode="contain"
              tintColor={userColor} 
            />
            <Image 
              source={require('../../assets/frogs/cute_frog_outline.png')}
              style={[
                portalStyles.frogBody,
                { position: 'absolute', height: 46 },
                { transform: [{ translateY: 6 }, { translateX: 9 }, { scaleX: -1 }] },
              ]}
              resizeMode="contain"
            />
            <Image 
              source={require('../../assets/frogs/cute_frog_cheeks.png')}
              style={[
                portalStyles.frogBody,
                { position: 'absolute', height: 44 },
                { transform: [{ translateY: 4 }, { translateX: 3 }, { scaleX: -1 }] },
              ]}
            />
          </View>

          {/* Contact's frog (right) */}
          <View style={portalStyles.singleFrog}>
            <Image 
              source={require('../../assets/frogs/cute_frog_body.png')}
              style={[
                portalStyles.frogBody,
                { height: 37 },
                { transform: [{ translateY: 6 }, { translateX: -5 }] },
              ]}
              resizeMode="contain"
              tintColor={contact.color || palette.sage}
            />
            <Image 
              source={require('../../assets/frogs/cute_frog_outline.png')}
              style={[
                portalStyles.frogBody,
                { position: 'absolute', height: 46 },
                { transform: [{ translateY: 6 }, { translateX: -5 }] },
              ]}
              resizeMode="contain"
            />
            <Image 
              source={require('../../assets/frogs/cute_frog_cheeks.png')}
              style={[
                portalStyles.frogBody,
                { position: 'absolute', height: 44 },
                { transform: [{ translateY: 4 }, { translateX: 0 }] },
              ]}
            />
          </View>
        </View>

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
            if (isNewPortalRequest || !hasCompletedExpectations) {
              onNavigateToLockedStep();
            } else {
              onNavigateToAIAssurance();
            }
          }}
          style={portalStyles.reflectTouchable}
        > 
          <Image 
            source={(isNewPortalRequest || !hasCompletedExpectations) ? lock : three} 
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
        onPress={onStartCall}
      >
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

      {/* Floating button that takes you to the full-screen map view */}
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => setShowMap(true)}
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
            backgroundColor: 'rgba(0,0,0,0.25)',
          }}
        >
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}>See full map</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
