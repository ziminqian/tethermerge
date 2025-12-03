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
  contactName?: string;
  userExpectations?: string[];
  contactExpectations?: string[];
}

type ContentItem = {
  type: 'subheading' | 'text';
  text: string;
};

const RESOURCE_CONTENT: Record<ResourceType, { title: string; content: ContentItem[] }> = {
  'conversation-starters': {
    title: 'Conversation Starters',
    content: [
      { type: 'subheading', text: 'Timing + Consent:' },
      { type: 'text', text: '"Would you like to tell me how you\'re feeling right now?"' },
      { type: 'text', text: '"Can we talk today, or should we schedule a better time?"' },
      { type: 'text', text: '"I\'m feeling a bit nervous—can we go gently?"' },
      { type: 'text', text: '"I\'m assuming good intent—tell me if I miss something."' },
      { type: 'text', text: '' },
      { type: 'subheading', text: 'Clear "I" Statement Openers:' },
      { type: 'text', text: '"When ___ happened, I felt ___, and I\'d like to talk about it."' },
      { type: 'text', text: '"I\'ve noticed ___, and it\'s affecting me in ___."' },
      { type: 'text', text: '"I\'m feeling ___ lately, and I think it connects to ___."' },
      { type: 'text', text: '"I interpreted ___ as ___; can you help me understand?"' },
      { type: 'text', text: '"I realize I\'ve been quiet about ___, and that\'s on me."' },
      { type: 'text', text: '"I want to share my experience, then I want yours."' },
      { type: 'text', text: '"I want to own my part before anything else."' },
      { type: 'text', text: '"I\'m sorry for ___. I want to understand the impact."' },
    ],
  },
  'revisit-expectations': {
    title: 'Revisit Expectations',
    content: [
      { type: 'text', text: 'Remember: We agreed to listen without interrupting' },
      { type: 'text', text: 'Our goal is to understand each other, not to win' },
      { type: 'text', text: 'We\'re here to have an honest, respectful conversation' },
      { type: 'text', text: 'Let\'s focus on finding common ground' },
      { type: 'text', text: 'Take breaks when needed - it\'s okay to pause' },
    ],
  },
  'empathy-prompts': {
    title: 'Empathy Prompts',
    content: [
      { type: 'subheading', text: 'Curiosity Questions (invites their story):' },
      { type: 'text', text: '"What matters most to you here?"' },
      { type: 'text', text: '"What does this bring up for you from past experiences?"' },
      { type: 'text', text: '"What am I not seeing?"' },
      { type: 'text', text: '' },
      { type: 'subheading', text: 'Reflecting (shows you\'re tracking):' },
      { type: 'text', text: '"What I\'m hearing is ___; did I get that right?"' },
      { type: 'text', text: '"So you\'re feeling ___ because ___—is that accurate?"' },
      { type: 'text', text: '"It sounds like you were trying to protect ___."' },
      { type: 'text', text: '' },
      { type: 'subheading', text: 'Validation (without necessarily agreeing):' },
      { type: 'text', text: '"It matters to me that this matters to you."' },
      { type: 'text', text: '"That makes sense given what you\'ve been carrying."' },
      { type: 'text', text: '"I can see why you\'d feel that way."' },
      { type: 'text', text: '"If I were in your shoes, I might feel similarly."' },
      { type: 'text', text: '"I believe you about your experience."' },
      { type: 'text', text: '"Thanks for trusting me with that."' },
      { type: 'text', text: '' },
      { type: 'subheading', text: 'Emotion-Labeling Options:' },
      { type: 'text', text: '"Are you feeling more hurt or more angry?"' },
      { type: 'text', text: '"What emotion is the loudest right now?"' },
      { type: 'text', text: '"What would help that feeling soften by 10%?"' },
    ],
  },
  'boundary-setting': {
    title: 'Boundary Setting',
    content: [
      { type: 'subheading', text: 'Tone + Respect First:' },
      { type: 'text', text: '"I want to talk about this, and I want it to be respectful."' },
      { type: 'text', text: '"I care about you, and I need a limit here."' },
      { type: 'text', text: '"I can stay in this if we keep it constructive."' },
      { type: 'text', text: '"I\'m not rejecting you—I\'m setting a boundary."' },
      { type: 'text', text: '"I want closeness and safety."' },
      { type: 'text', text: '"Let\'s not bring up past issues unless they directly relate?"' },
    ],
  },
  'goal-setting': {
    title: 'Goal Setting',
    content: [
      { type: 'subheading', text: 'Pick the Mode (prevents mismatched expectations):' },
      { type: 'text', text: '"Do you want me to listen, help solve, or help decide?"' },
      { type: 'text', text: '"Is this a vent, a request, or a hard boundary?"' },
      { type: 'text', text: '"Are we trying to prevent this from happening again?"' },
      { type: 'text', text: '"What would be a \'good enough\' outcome for today?"' },
      { type: 'text', text: '"How will we know this conversation went well?"' },
      { type: 'text', text: '"What\'s one small win we can get in 10 minutes?"' },
      { type: 'text', text: '"What needs to happen for me and you to feel safe?"' },
      { type: 'text', text: '' },
      { type: 'subheading', text: 'Concrete Next Steps:' },
      { type: 'text', text: '"What\'s one action each of us can take this week?"' },
      { type: 'text', text: '"What do I need from you going forward?"' },
      { type: 'text', text: '"What\'s our follow-up date to revisit this?"' },
      { type: 'text', text: '"How do we handle it if it slips again?"' },
    ],
  },
  'de-escalation': {
    title: 'De-escalation Tactics',
    content: [
      { type: 'subheading', text: 'Quick "Pause" Scripts:' },
      { type: 'text', text: '"Can we agree to pause if either of us gets overwhelmed?"' },
      { type: 'text', text: '"Can we take 90 seconds in silence to reset?"' },
      { type: 'text', text: '"I need a breath. I want to continue calmly."' },
      { type: 'text', text: '"Hold on—I\'m feeling defensive. Let me regroup."' },
      { type: 'text', text: '"We\'re looping. Let\'s pause and restart with one sentence each."' },
      { type: 'text', text: '"Can we slow down? I\'m losing track."' },
      { type: 'text', text: '"I\'m not hearing you well because I\'m upset—repeat that slowly?"' },
      { type: 'text', text: '"I want to stay connected. Let\'s reduce intensity by 20%."' },
      { type: 'text', text: '"Can we take a short break and come back with kinder words?"' },
      { type: 'text', text: '' },
      { type: 'subheading', text: 'Repair in the Moment:' },
      { type: 'text', text: '"I don\'t like how I just said that. Let me try again."' },
      { type: 'text', text: '"I\'m sorry—that came out sharp."' },
      { type: 'text', text: '"We\'re both hurting. Let\'s be gentle with each other."' },
      { type: 'text', text: '"I\'m going to listen fully, then respond."' },
    ],
  },
  'reflection-questions': {
    title: 'Reflection Questions',
    content: [
      { type: 'subheading', text: 'What Happened (two truths):' },
      { type: 'text', text: '"What\'s the story you told yourself about me? And can I help inform it now?"' },
      { type: 'text', text: '"What happened from your perspective, step by step?"' },
      { type: 'text', text: '"What did you intend to communicate?"' },
      { type: 'text', text: '"What impact do you think it had on me?"' },
      { type: 'text', text: '"What impact did it have on you?"' },
      { type: 'text', text: '"What did you need that you didn\'t ask for?"' },
      { type: 'text', text: '"Where did we misread each other?"' },
      { type: 'text', text: '' },
      { type: 'subheading', text: 'Emotions + Needs:' },
      { type: 'text', text: '"What were you protecting?"' },
      { type: 'text', text: '"What need was threatened (respect, autonomy, trust, belonging)?"' },
      { type: 'text', text: '"What do you wish I had understood sooner?"' },
      { type: 'text', text: '' },
      { type: 'subheading', text: 'Integration (compassion + growth):' },
      { type: 'text', text: '"What pain is this touching in you?"' },
      { type: 'text', text: '"Should we consider outside support / therapy?"' },
      { type: 'text', text: '"What would we say to a friend in this situation?"' },
      { type: 'text', text: '"What do we appreciate about each other—even right now?"' },
      { type: 'text', text: '"What do we want our relationship to look like a year from now?"' },
    ],
  },
};

export const ResourceModal = ({ 
  visible, 
  onClose, 
  resourceType,
  contactName,
  userExpectations = [],
  contactExpectations = []
}: ResourceModalProps) => {
  const resource = RESOURCE_CONTENT[resourceType];
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (visible) {
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
    }
  }, [visible]);

  if (!visible) return null;

  const renderExpectationsContent = () => (
    <View style={resourceStyles.expectationsContainer}>
      <View style={resourceStyles.expectationSection}>
        <Text style={resourceStyles.expectationHeader}>You said:</Text>
        {userExpectations.map((expectation, index) => (
          <View key={`user-${index}`} style={resourceStyles.expectationItem}>
            <View style={resourceStyles.expectationBullet} />
            <Text style={resourceStyles.expectationText}>{expectation}</Text>
          </View>
        ))}
      </View>

      <View style={resourceStyles.divider} />

      <View style={resourceStyles.expectationSection}>
        <Text style={resourceStyles.expectationHeader}>{contactName} said:</Text>
        {contactExpectations.map((expectation, index) => (
          <View key={`contact-${index}`} style={resourceStyles.expectationItem}>
            <View style={resourceStyles.expectationBullet} />
            <Text style={resourceStyles.expectationText}>{expectation}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderStandardContent = () => (
    <>
      {resource?.content.map((item, index) => {
        if (item.type === 'subheading') {
          return (
            <Text key={index} style={resourceStyles.subheading}>
              {item.text}
            </Text>
          );
        }
        return (
          <View key={index} style={resourceStyles.contentItem}>
            {item.text !== '' && <View style={resourceStyles.bullet} />}
            <Text style={resourceStyles.contentText}>{item.text}</Text>
          </View>
        );
      })}
    </>
  );

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
            <Text style={resourceStyles.modalTitle}>{resource?.title || 'Resource'}</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={28} color={palette.darkBrown} />
            </TouchableOpacity>
          </View>

          <ScrollView>
            {resourceType === 'revisit-expectations' 
              ? renderExpectationsContent()
              : renderStandardContent()
            }
          </ScrollView>

          <TouchableOpacity onPress={onClose} style={resourceStyles.closeButton}>
            <Text style={resourceStyles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  expectationsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  expectationSection: {
    marginBottom: 20,
  },
  expectationHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.darkBrown,
    marginBottom: 12,
    fontFamily: 'Raleway-Bold',
  },
  expectationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingLeft: 5,
  },
  expectationBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.teal,
    marginTop: 7,
    marginRight: 12,
  },
  expectationText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: palette.darkBrown,
    fontFamily: 'Raleway-Medium',
  },
  divider: {
    height: 1,
    backgroundColor: palette.lightBrown,
    marginVertical: 15,
    opacity: 0.3,
  },
});