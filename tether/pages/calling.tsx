import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
  Image
} from 'react-native';
import { palette } from '../styles/palette';
import { ChevronLeft, Phone, PhoneOff } from 'lucide-react-native';
import convoStyles from '../styles/convoStyles';

interface CallingProps {
  contact: { id: string; name: string };
  onBack: () => void;
  onCallConnected: () => void;
}

export const Calling = ({ contact, onBack, onCallConnected }: CallingProps) => {
  const [showConfirmModal, setShowConfirmModal] = useState(true);
  const [isCallStarted, setIsCallStarted] = useState(false);
  
  // Animation values for modal
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  
  // Animation values for ringing effect
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const ringOpacity1 = useRef(new Animated.Value(0.7)).current;
  const ringOpacity2 = useRef(new Animated.Value(0.7)).current;
  const ringOpacity3 = useRef(new Animated.Value(0.7)).current;

  // Modal fade animation
  useEffect(() => {
    if (showConfirmModal) {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
      
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showConfirmModal]);

  // Ringing animation
  useEffect(() => {
    if (isCallStarted) {
      // Pulse animation for avatar
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );

      // Ring animations (staggered)
      const ring1 = Animated.loop(
        Animated.sequence([
          Animated.timing(ringOpacity1, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(ringOpacity1, {
            toValue: 0.7,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );

      const ring2 = Animated.loop(
        Animated.sequence([
          Animated.delay(666),
          Animated.timing(ringOpacity2, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(ringOpacity2, {
            toValue: 0.7,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );

      const ring3 = Animated.loop(
        Animated.sequence([
          Animated.delay(1332),
          Animated.timing(ringOpacity3, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(ringOpacity3, {
            toValue: 0.7,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );

      pulse.start();
      ring1.start();
      ring2.start();
      ring3.start();

      return () => {
        pulse.stop();
        ring1.stop();
        ring2.stop();
        ring3.stop();
      };
    }
  }, [isCallStarted]);

  // Simulate call connecting after 3-5 seconds
  useEffect(() => {
    if (isCallStarted) {
      const connectDelay = Math.random() * 2000 + 3000; // 3-5 seconds
      const timer = setTimeout(() => {
        onCallConnected();
      }, connectDelay);

      return () => clearTimeout(timer);
    }
  }, [isCallStarted]);

  const handleConfirmCall = () => {
    setShowConfirmModal(false);
    setIsCallStarted(true);
  };

  const handleCancelCall = () => {
    setShowConfirmModal(false);
    onBack();
  };

  const handleEndCall = () => {
    onBack();
  };

  return (
    <ImageBackground 
      source={require("../assets/backgrounds/background_vibrant.png")}
      style={convoStyles.background}
      resizeMode='cover'
    >
      <TouchableOpacity onPress={handleEndCall} style={convoStyles.backButton}>
        <ChevronLeft size={40} color={palette.slate} />
      </TouchableOpacity>

      <View style={convoStyles.container}>
        <Text style={convoStyles.statusText}>
          {isCallStarted ? 'Calling...' : 'Ready to call'}
        </Text>

        <View style={convoStyles.callingAvatarContainer}>
          {/* Animated rings */}
          {isCallStarted && (
            <>
              <Animated.View 
                style={[
                  convoStyles.callingRing,
                  { 
                    opacity: ringOpacity1,
                    transform: [{ scale: 1.3 }]
                  }
                ]} 
              />
              <Animated.View 
                style={[
                  convoStyles.callingRing,
                  { 
                    opacity: ringOpacity2,
                    transform: [{ scale: 1.6 }]
                  }
                ]} 
              />
              <Animated.View 
                style={[
                  convoStyles.callingRing,
                  { 
                    opacity: ringOpacity3,
                    transform: [{ scale: 1.9 }]
                  }
                ]} 
              />
            </>
          )}

          {/* Avatar */}
          <Animated.View 
            style={[
              convoStyles.callingAvatar,
              isCallStarted && { transform: [{ scale: pulseAnim }] }
            ]}
          >
            <Image source={require('../assets/frogs/frog.png')} />
          </Animated.View>
        </View>

        <Text style={convoStyles.callingNameText}>{contact.name}</Text>
        <Text style={convoStyles.callingStatusText}>
          {isCallStarted ? 'Ringing...' : 'Preparing to connect'}
        </Text>

        {isCallStarted && (
          <TouchableOpacity 
            style={convoStyles.endCallButton}
            onPress={handleEndCall}
          >
            <PhoneOff size={28} color={palette.cream} />
            <Text style={convoStyles.endCallButtonText}>END CALL</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Confirmation Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={showConfirmModal}
        onRequestClose={handleCancelCall}
      >
        <Animated.View 
          style={[
            convoStyles.modalOverlay,
            { opacity: fadeAnim }
          ]}
        >
          <Animated.View 
            style={[
              convoStyles.confirmModalContent,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <Phone size={48} color={palette.teal} style={{ marginBottom: 20 }} />
            
            <Text style={convoStyles.confirmModalTitle}>
              Start a conversation with {contact.name}?
            </Text>
            
            <Text style={convoStyles.confirmModalText}>
              You're about to initiate a portal conversation. Make sure you're both ready for a meaningful discussion.
            </Text>

            <View style={convoStyles.confirmModalButtons}>
              <TouchableOpacity 
                style={convoStyles.confirmModalButtonCancel}
                onPress={handleCancelCall}
              >
                <Text style={convoStyles.confirmModalButtonCancelText}>Go Back</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={convoStyles.confirmModalButtonConfirm}
                onPress={handleConfirmCall}
              >
                <Phone size={20} color={palette.cream} />
                <Text style={convoStyles.confirmModalButtonConfirmText}>Start Call</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
    </ImageBackground>
  );
};