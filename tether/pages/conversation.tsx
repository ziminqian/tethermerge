import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Animated
} from 'react-native';
import { palette } from '../styles/palette';
import { ChevronLeft, Pause, Lightbulb, MessageCircleHeart, X } from 'lucide-react-native';
import convoStyles from "../styles/convoStyles"
import resourceStyles from '../styles/resourceStyles';
import { ResourceModal, ResourceType } from './components/Resources';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ConversationProps {
  contact: { id: string; name: string, color: any };
  userColor?: any;
  onBack: () => void;
  onPause: (contact: { id: string; name: string }) => void;
  onEndConversation: () => void;
}

export const Conversation = ({ 
  contact, 
  userColor = palette.sage,
  onBack, 
  onPause, 
  onEndConversation 
}: ConversationProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ResourceType>('conversation-starters');
  const [blinkStates, setBlinkStates] = useState<[boolean, boolean]>([false, false]);
  
  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Pulsing animation for the status dot
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    const opacityAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();
    opacityAnimation.start();

    return () => {
      pulseAnimation.stop();
      opacityAnimation.stop();
    };
  }, []);

  // Blinking animation for frogs
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      const newBlinkStates: [boolean, boolean] = [
        Math.random() > 0.5, // 30% chance for contact frog to blink
        Math.random() > 0.7  // 30% chance for user frog to blink
      ];
      setBlinkStates(newBlinkStates);
      
      // Reset blink after 150ms
      setTimeout(() => {
        setBlinkStates([false, false]);
      }, 150);
    }, 3000); // Check every 3 seconds

    return () => clearInterval(blinkInterval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResourcePress = (resourceType: ResourceType) => {
    setSelectedResource(resourceType);
    setModalVisible(true);
  };

  const renderFrog = (color: any, isBlinking: boolean, isFlipped: boolean = false) => {
    const transform = isFlipped 
      ? [{ translateY: 6 }, { translateX: 9 }, { scaleX: -1 }]
      : [{ translateY: 6 }, { translateX: -5 }];
    
    const outlineTransform = isFlipped
      ? [{ translateY: 6 }, { translateX: 9 }, { scaleX: -1 }]
      : [{ translateY: 6 }, { translateX: -5 }];
    
    const cheeksTransform = isFlipped
      ? [{ translateY: 4 }, { translateX: 2 }, { scaleX: -1 }]
      : [{ translateY: 4 }, { translateX: 0 }];

    return (
      <View style={convoStyles.avatar}>
        <Image 
          source={require('../assets/frogs/cute_frog_body.png')}
          style={[
            { height: 90, width: 74 },
            { transform }
          ]}
          resizeMode="contain"
          tintColor={color}
        />
        <Image 
          source={isBlinking 
            ? require('../assets/frogs/cute_frog_blinking.png')
            : require('../assets/frogs/cute_frog_outline.png')
          }
          style={[
            { position: 'absolute', height: 100, width: 90 },
            { transform: outlineTransform }
          ]}
          resizeMode="contain"
        />
        <Image 
          source={require('../assets/frogs/cute_frog_cheeks.png')}
          style={[
            { position: 'absolute', height: 100, width: 90 },
            { transform: cheeksTransform }
          ]}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <ImageBackground 
      source={require("../assets/backgrounds/background_vibrant.png")}
      style={convoStyles.background}
      resizeMode='cover'
    >
      <TouchableOpacity onPress={onBack} style={convoStyles.backButton}>
        <ChevronLeft size={40} color={palette.slate} />
      </TouchableOpacity>
      <View style={convoStyles.container}>
        <Text style={convoStyles.statusText}>In conversation</Text>
        <Text style={convoStyles.timerText}>{formatTime(elapsedTime)}</Text>

        <View style={convoStyles.avatarsContainer}>
          <View style={convoStyles.avatarSection}>
            {renderFrog(contact.color || palette.sage, blinkStates[0], false)}
            <Text style={convoStyles.nameText}>{contact.name}</Text>
            <View style={convoStyles.statusIndicator}>
              <Animated.View 
                style={[
                  convoStyles.statusDot,
                  { 
                    transform: [{ scale: pulseAnim }],
                    opacity: opacityAnim
                  }
                ]} 
              />
              <Text style={[convoStyles.statusLabel, {fontSize: 17}]}>Speaking</Text>
            </View>
          </View>

          <View style={convoStyles.dividerLine} />

          <View style={convoStyles.avatarSection}>
            {renderFrog(userColor, blinkStates[1], false)}
            <Text style={convoStyles.nameText}>You</Text>
          </View>
        </View>

        <View style={resourceStyles.resourcesContainer}>
          <TouchableOpacity style={resourceStyles.resourceCard}
          onPress={() => handleResourcePress('conversation-starters')}>
            <View style={[resourceStyles.resourceIcon, { backgroundColor: palette.teal }]}>
              <Lightbulb size={35} color={palette.cream}/>
            </View>
            <Text style={resourceStyles.resourceTitle}>Conversation{'\n'}Starters</Text>
          </TouchableOpacity>

          <TouchableOpacity style={resourceStyles.resourceCard}
          onPress={() => handleResourcePress('revisit-expectations')}>
            <View style={[resourceStyles.resourceIcon, { backgroundColor: palette.lightBrown }]}>
              <MessageCircleHeart size={33} color={palette.cream}/>
            </View>
            <Text style={resourceStyles.resourceTitle}>Revisit{'\n'}Expectations</Text>
          </TouchableOpacity>
        </View>

        <Text style={convoStyles.pauseHintText}>Pause for more resources</Text>

        <View style={convoStyles.actionButtonsRow}>
          <View style={convoStyles.actionButtonContainer}>
            <TouchableOpacity 
              style={convoStyles.circularActionButton}
              onPress={() => onPause(contact)}
            >
              <Pause size={28} color={palette.cream} fill={palette.cream} />
            </TouchableOpacity>
            <Text style={convoStyles.actionButtonLabel}>Pause</Text>
          </View>

          <View style={convoStyles.actionButtonContainer}>
            <TouchableOpacity 
              style={convoStyles.circularActionButtonTeal}
              onPress={onEndConversation}
            >
              <X size={28} color={palette.cream} fill={palette.cream} />
            </TouchableOpacity>
            <Text style={convoStyles.actionButtonLabel}>End</Text>
          </View>
        </View>
    
      </View>
      <ResourceModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        resourceType={selectedResource}
        contactName={contact.name}
        userExpectations={['Listen without interrupting', 'Stay calm and respectful']}
        contactExpectations={['Be honest about feelings', 'Take breaks when needed']}
      />
    </ImageBackground>
  );
};