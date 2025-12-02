import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import { X } from 'lucide-react-native';
import { palette } from '../../styles/palette';
import resourceStyles from '../../styles/resourceStyles';

export type ResourceType = 
  | 'conversation-starters'
  | 'revisit-expectations'
  | 'empathy-prompts'
  | 'boundary-setting'
  | 'goal-setting'
  | 'de-escalation'
  | 'reflection-questions';

interface ResourceModalProps {
  visible: boolean;
  onClose: () => void;
  resourceType: ResourceType;
}

const RESOURCE_CONTENT: Record<ResourceType, { title: string; content: string[] }> = {
  'conversation-starters': {
    title: 'Conversation Starters',
    content: [
      'What\'s been on your mind lately?',
      'How have you been feeling about [topic]?',
      'Can you help me understand your perspective on this?',
      'What would an ideal outcome look like for you?',
      'Is there something specific you\'d like to discuss today?',
    ],
  },
  'revisit-expectations': {
    title: 'Revisit Expectations',
    content: [
      'Remember: We agreed to listen without interrupting',
      'Our goal is to understand each other, not to win',
      'We\'re here to have an honest, respectful conversation',
      'Let\'s focus on finding common ground',
      'Take breaks when needed - it\'s okay to pause',
    ],
  },
  'empathy-prompts': {
    title: 'Empathy Prompts',
    content: [
      'Try to see the situation from their perspective',
      'What emotions might they be experiencing right now?',
      'How would I feel if I were in their position?',
      'What unmet needs might be driving their feelings?',
      'Can I acknowledge their feelings even if I disagree?',
    ],
  },
  'boundary-setting': {
    title: 'Boundary Setting',
    content: [
      'I need to take a break. Can we continue this later?',
      'I\'m feeling overwhelmed. Can we slow down?',
      'I\'m not comfortable discussing this right now',
      'I need you to hear me out before responding',
      'Let\'s agree to stay calm and respectful',
    ],
  },
  'goal-setting': {
    title: 'Goal Setting',
    content: [
      'Define what success looks like for this conversation',
      'Set intentions: What do you hope to achieve?',
      'Identify shared goals you both care about',
      'Break down big topics into smaller, manageable parts',
      'Agree on ground rules before diving in',
    ],
  },
  'de-escalation': {
    title: 'De-escalation Tactics',
    content: [
      'Take a deep breath and pause before responding',
      'Lower your voice and speak more slowly',
      'Acknowledge their feelings: "I can see you\'re upset"',
      'Take a timeout if emotions are running high',
      'Focus on one issue at a time',
      'Use "I" statements instead of "you" statements',
    ],
  },
  'reflection-questions': {
    title: 'Reflection Questions',
    content: [
      'What am I learning about their perspective?',
      'How might my actions have contributed to this?',
      'What assumptions am I making?',
      'Am I truly listening or just waiting to respond?',
      'What do we actually agree on?',
      'What would help us move forward together?',
    ],
  },
};

export const ResourceModal = ({ visible, onClose, resourceType }: ResourceModalProps) => {
  const resource = RESOURCE_CONTENT[resourceType];
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (visible) {
      //reset
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);

      //fadein
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
      //fadeout
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
  }, [visible]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Animated.View 
        style={[
          resourceStyles.modalOverlay,
          { opacity: fadeAnim }
        ]}
      >
        <Animated.View 
          style={[
            resourceStyles.modalContent,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <View style={resourceStyles.modalHeader}>
            <Text style={resourceStyles.modalTitle}>{resource.title}</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={28} color={palette.darkBrown} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={resourceStyles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {resource.content.map((item, index) => (
              <View key={index} style={resourceStyles.contentItem}>
                <View style={resourceStyles.bullet} />
                <Text style={resourceStyles.contentText}>{item}</Text>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity onPress={onClose} style={resourceStyles.closeButton}>
            <Text style={resourceStyles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

