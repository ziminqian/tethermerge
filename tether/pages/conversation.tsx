import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import { palette } from '../styles/palette';
import { ChevronLeft, Pause, Lightbulb, MessageCircleHeart } from 'lucide-react-native';
import convoStyles from "../styles/convoStyles"
import resourceStyles from '../styles/resourceStyles';
import { ResourceModal, ResourceType } from './components/Resources';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ConversationProps {
  contact: { id: string; name: string };
  onBack: () => void;
  onPause: () => void;
}

export const Conversation = ({ contact, onBack, onPause }: ConversationProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ResourceType>('conversation-starters');
  

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
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
            <View style={convoStyles.avatar}>
               <Image source = {require('../assets/frogs/frog.png')}/>
            </View>
            <Text style={convoStyles.nameText}>{contact.name}</Text>
            <View style={convoStyles.statusIndicator}>
              <View style={convoStyles.statusDot} />
              <Text style={convoStyles.statusLabel}>Speaking</Text>
            </View>
          </View>

          <View style={convoStyles.dividerLine} />

          <View style={convoStyles.avatarSection}>
            <View style={[convoStyles.avatar, {width: 100, height: 100}]}>
               <Image source = {require('../assets/frogs/frog.png')}/>
            </View>
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

        <TouchableOpacity 
          style={convoStyles.pauseButton}
          onPress={onPause}
        >
          <Pause size={24} color={palette.cream} fill={palette.cream} />
          <Text style={convoStyles.pauseButtonText}>PAUSE & BREATHE</Text>
        </TouchableOpacity>
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

