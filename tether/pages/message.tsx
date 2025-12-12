import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ImageBackground, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Image,
  Platform,
  ActivityIndicator
} from 'react-native';
import styles from '../styles/styles';
import { palette } from '../styles/palette';
import { ChevronLeft, Send, X, HeartHandshake, Sparkles } from 'lucide-react-native';
import { draftMessage } from '../utils/gemini';

interface MessageProps {
  contact: { id: string; name: string };
  onNext: () => void;
  onBack: () => void;
}

interface ChatMessage {
  id: string;
  text: string;
  isAI: boolean;
}

export const Message = ({ contact, onNext, onBack }: MessageProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: `Hi User, I am Tether AI, here to help you navigate difficult conversations — from reaching out, to preparing, to navigating, and reflecting :)\n\nThe first step is to write a short message to ${contact.name} inviting him to Tether (I'll handle the logistics of sending your message in an SMS invitation, so for about it, just focus on writing the message).\n\n1. What do you want to talk about with ${contact.name}?`,
      isAI: true
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (inputText.trim() && !isLoading) {
      const userInput = inputText.trim();
      
      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: userInput,
        isAI: false
      };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsLoading(true);
      setInputText('');

      try {
        // Check if user is asking for a draft or providing feedback/refinement
        const isRefinement = generatedMessage && (
          userInput.toLowerCase().includes('change') ||
          userInput.toLowerCase().includes('different') ||
          userInput.toLowerCase().includes('revise') ||
          userInput.toLowerCase().includes('update') ||
          userInput.toLowerCase().includes('make it') ||
          userInput.toLowerCase().includes('more') ||
          userInput.toLowerCase().includes('less')
        );
        
        // Call Gemini AI to draft the message
        const draftedMessage = await draftMessage(
          contact.name,
          userInput,
          messages
        );
        
        // Add AI response with the drafted message
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: isRefinement
            ? `Here's a revised version:\n\n"${draftedMessage}"\n\nWould you like me to adjust anything else?`
            : `Sure, here's a draft invitation message:\n\n"${draftedMessage}"\n\nWould you like me to change anything about it?`,
          isAI: true
        };
        setMessages(prev => [...prev, aiResponse]);
        setGeneratedMessage(draftedMessage);
      } catch (error) {
        console.error('Error generating message:', error);
        // Add error message
        const errorResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: `I'm sorry, I encountered an error while generating your message. Please try again or check your internet connection.`,
          isAI: true
        };
        setMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSendInvite = () => {
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    onNext();
  };

  return (
    <ImageBackground 
      source={require("../assets/backgrounds/light_ombre.png")}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode='cover'
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <View style={styles.screen}>
            <View style={[styles.heading, {marginBottom: 0}]}>
              <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <ChevronLeft size={40} color={palette.slate} />
              </TouchableOpacity>
              <Text style={styles.headingtext}>Initiate Conversation</Text>
            </View>

            <View style={{flexDirection: "column"}}>
              <View style={styles.userImg}>
                <Image source={require("../assets/frogs/cute_frogsx2.png")} style={{width: 150, height: 65}} />
              </View>
              <View style={styles.userGraphic}>
                <Text style={styles.userGraphicLabel}>You</Text>
                <Text style={styles.userGraphicLabel}>{contact.name}</Text>
              </View>
            </View>

            <ScrollView 
              style={styles.chatContainer}
              showsVerticalScrollIndicator={false}
            >
              {messages.map((message) => (
                <View 
                  key={message.id}
                  style={[
                    styles.messageBubble,
                    message.isAI ? styles.aiMessage : styles.userMessage
                  ]}
                >
                  {message.isAI && (
                    <View style={{flexDirection: "column"}}>
                      <View style={{flexDirection: "row", gap: 5}}><Sparkles size={28} color={palette.slate}/>
                      <Text style={[styles.headingtext, {fontSize: 24}]}>Tether AI</Text></View>
                    <View style={styles.divider} />
                    </View>
                  )}
                  <Text style={styles.messageText}>{message.text}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputArea}>
              <TextInput
                style={styles.chatInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder={generatedMessage
                  ? "Ask to revise the message, or type 'send' to use this version..."
                  : "What do you want to talk about with them? I'll help draft an invitation message."}
                placeholderTextColor={palette.mutedBrown}
                multiline
                editable={!isLoading}
              />
              <TouchableOpacity 
                onPress={handleSend} 
                style={styles.sendButton}
                disabled={isLoading || !inputText.trim()}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color={palette.slate} />
                ) : (
                  <Send size={26} color={palette.slate} />
                )}
              </TouchableOpacity>
            </View>
            <View style={{alignItems: "center", marginTop: 10}}>
              {generatedMessage && (
                <View style={{marginBottom: 10, paddingHorizontal: 20}}>
                  <Text style={[styles.messageText, {textAlign: 'center', fontStyle: 'italic', color: palette.mutedBrown}]}>
                    Drafted message: "{generatedMessage}"
                  </Text>
                </View>
              )}
              <TouchableOpacity 
                onPress={handleSendInvite}
                style={[
                  styles.loginButton,
                  {width: 200, opacity: generatedMessage ? 1 : 0.5}
                ]}
                disabled={!generatedMessage}
              >
                <HeartHandshake size={30} color={palette.cream}/>
                <Text style={styles.loginButtonText}>Send Invite</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        <Modal
          animationType="fade"
          transparent={true}
          visible={showSuccessModal}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.successModal}>
              <TouchableOpacity onPress={handleCloseModal} style={styles.modalCloseButton}>
                <X size={24} color={palette.darkBrown} />
              </TouchableOpacity>
              <View style={styles.popup}>
                  <Text style={styles.successText}>Invitation Sent!</Text>
                  <Image source={require("../assets/other/people_talking.png")} style={{height:200, width: 300, transform: [{ translateY: 50}]}}/>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};