import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import { palette } from '../styles/palette';
import { Lightbulb, MessageCircleHeart, Brain, ShieldBan } from 'lucide-react-native';
import { Play } from 'lucide-react-native';
import convoStyles from '../styles/convoStyles';
import resourceStyles from '../styles/resourceStyles';
import { ResourceModal, ResourceType } from './components/Resources';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface PauseProps {
  contact: { id: string; name: string };
  onResume: () => void;
}

export const Pause = ({ contact, onResume }: PauseProps) => {
  const [timeRemaining, setTimeRemaining] = useState(300);
  const breatheScale = useRef(new Animated.Value(1)).current;
  const breatheOpacity = useRef(new Animated.Value(0.6)).current;
  const borderOpacity = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ResourceType>('conversation-starters');
  

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    const borderAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(borderOpacity, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(borderOpacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    borderAnimation.start();

    const breatheAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(breatheScale, {
            toValue: 1.2,
            duration: 3500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(breatheOpacity, {
            toValue: 1,
            duration: 3500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(500),
        Animated.parallel([
          Animated.timing(breatheScale, {
            toValue: 1,
            duration: 3500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(breatheOpacity, {
            toValue: 0.6,
            duration: 3500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(500),
      ])
    );
    breatheAnimation.start();

    return () => {
      clearInterval(timer);
      borderAnimation.stop();
      breatheAnimation.stop();
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResourcePress = (resourceType: ResourceType) => {
      setSelectedResource(resourceType);
      setModalVisible(true);
    };

  return (
    <ImageBackground 
      source={require("../assets/backgrounds/background_vibrant.png")}
      style={convoStyles.background}
      resizeMode='cover'
    >
      <View style={convoStyles.container_pause}>
        <Text style={convoStyles.statusText_pause}>Conversation Paused</Text>

        <Animated.View 
          style={[
            convoStyles.breatheCircle,
            { 
              transform: [{ scale: breatheScale }],
              opacity: breatheOpacity
            }
          ]}
        >
          <Text style={convoStyles.breatheText}>Breathe</Text>
          
          {/* Pulsing border */}
          <Animated.View 
            style={{
              position: 'absolute',
              top: -4,
              left: -4,
              right: -4,
              bottom: -4,
              borderRadius: 1000,
              borderWidth: 3,
              borderColor: palette.slate,
              opacity: borderOpacity,
            }}
          />
        </Animated.View>

        <View style={convoStyles.timerSection}>
          <Text style={convoStyles.timerLabel}>Time Remaining</Text>
          <Text style={convoStyles.timerText_pause}>{formatTime(timeRemaining)}</Text>
          <Text style={convoStyles.breatheInstruction}>Inhale deeply... Hold... Exhale slowly...</Text>
        </View>

        <View style={resourceStyles.resourcesSection}>
          {/*<Text style={convoStyles.resourcesTitle}>Conversation Resources</Text>*/}
          
          <View style={resourceStyles.resourcesGrid}>
            
            <TouchableOpacity style={resourceStyles.resourceCard}
            onPress={() => handleResourcePress('conversation-starters')}>
              <View style={[resourceStyles.resourceIcon, { backgroundColor: palette.teal }]}>
              <Lightbulb size={35} color={palette.cream}/>
            </View>
              <Text style={resourceStyles.resourceTitle}>Conversation Starters</Text>
              <Text style={resourceStyles.resourceSubtitle}>Prompts to move forward</Text>
            </TouchableOpacity>

            <TouchableOpacity style={resourceStyles.resourceCard}
            onPress={() => handleResourcePress('revisit-expectations')}>
                <View style={[resourceStyles.resourceIcon, { backgroundColor: palette.lightBrown }]}>
                <MessageCircleHeart size={33} color={palette.cream}/>
                </View>
              <Text style={resourceStyles.resourceTitle}>Revisit Expectations</Text>
              <Text style={resourceStyles.resourceSubtitle}>Reminders on your goals</Text>
            </TouchableOpacity>

            <TouchableOpacity style={resourceStyles.resourceCard}
            onPress={() => handleResourcePress('empathy-prompts')}>
              <View style={[resourceStyles.resourceIcon, { backgroundColor: palette.mutedBrown }]}>
              <Brain size={35} color={palette.cream}/>
            </View>
              <Text style={resourceStyles.resourceTitle}>Empathy Prompts</Text>
              <Text style={resourceStyles.resourceSubtitle}>Understand their perspective</Text>
            </TouchableOpacity>

            <TouchableOpacity style={resourceStyles.resourceCard}
            onPress={() => handleResourcePress('boundary-setting')}>
              <View style={[resourceStyles.resourceIcon, { backgroundColor: palette.sage }]}>
              <ShieldBan size={35} color={palette.cream}/>
            </View>
              <Text style={resourceStyles.resourceTitle}>Boundary Setting</Text>
              <Text style={resourceStyles.resourceSubtitle}>Respectful ways to set limits</Text>
            </TouchableOpacity>
            {/*
            <TouchableOpacity style={convoStyles.resourceCard}>
              <View style={[convoStyles.resourceIcon, { backgroundColor: palette.mutedBrown }]}>
              <ShieldBan size={35} color={palette.cream}/>
            </View>
              <Text style={convoStyles.resourceTitle}>De-escalation Tactics</Text>
              <Text style={convoStyles.resourceSubtitle}>Calm heated{'\n'}moments</Text>
            </TouchableOpacity>

            <TouchableOpacity style={convoStyles.resourceCard}>
              <View style={[convoStyles.resourceIcon, { backgroundColor: palette.mutedBrown }]}>
              <Brain size={35} color={palette.cream}/>
            </View>
              <Text style={convoStyles.resourceTitle}>Reflection Questions</Text>
              <Text style={convoStyles.resourceSubtitle}>Deepen mutual{'\n'}understanding</Text>
            </TouchableOpacity>*/}
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity 
            style={convoStyles.resumeButton}
            onPress={onResume}
          >
            <Play size={28} color={palette.cream} fill={palette.cream} />
          </TouchableOpacity>
          <Text style={convoStyles.resumeButtonLabel}>Resume Conversation</Text>
        </View>
      </View>
      <ResourceModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        resourceType={selectedResource}
        contactName={contact.name}
        userExpectations={['Listen without interrupting', 'Stay calm and respectful']} //change
        contactExpectations={['Be honest about feelings', 'Take breaks when needed']}
      />
      
    </ImageBackground>
  );
};
