import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ImageBackground, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  KeyboardAvoidingView,
  Image,
  Platform
} from 'react-native';
import styles from '../../styles/styles';
import { palette } from '../../styles/palette';
import { ChevronLeft, Send, Sparkles } from 'lucide-react-native';
import portalStyles from '../../styles/portalStyles';
import { updatePortalStep } from '../../utils/portalProgress';

interface AIPageProps {
  contact: { id: string; name: string; color: any };
  onBack: () => void;
  onContinue: () => void;
  onBackToPortal: () => void;
}

interface ChatMessage {
  id: string;
  text: string;
  isAI: boolean;
}

export const AIPage = ({ contact, onBack, onContinue, onBackToPortal }: AIPageProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: `Hi! I'm Tether AI, and I'm here to help you prepare for your upcoming conversation with ${contact.name}.\n\nTaking time to ground yourself before the conversation can help you:\n\n• Feel more confident and emotionally centered\n\n• Clarify what you want to express and why it matters\n\n• Approach the conversation with calm and empathy\n\n• Remember what you value about this relationship\n\nWhat's on your mind as you prepare for this conversation?`,
      isAI: true
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputText.trim(),
        isAI: false
      };
      setMessages([...messages, userMessage]);
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: `That's a great insight. Preparing emotionally helps you show up as your best self. Remember, this conversation is an opportunity to strengthen your connection with ${contact.name}. What else would you like to explore before your conversation?`,
          isAI: true
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
      
      setInputText('');
    }
  };

  const handleContinue = async () => {
    // Mark assurances as completed
    await updatePortalStep(contact.id, 'assurancesCompleted', true);
    onContinue();
  };

  return (
    <ImageBackground 
      source={require("../../assets/backgrounds/background_vibrant.png")}
      style={portalStyles.background}
      resizeMode='cover'
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <View style={styles.screen}>
            <View style={[styles.heading, {marginBottom: 10}]}>
              <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <ChevronLeft size={40} color={palette.slate} />
              </TouchableOpacity>
              <Text style={styles.headingtext}>Assurances</Text>
            </View>

            <ScrollView 
              style={styles.chatContainer}
              contentContainerStyle={{ paddingHorizontal: 16 }}
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
                      <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                        <Sparkles size={28} color={palette.slate}/>
                        <Text style={[styles.headingtext, {fontSize: 24}]}>Tether AI</Text>
                      </View>
                      <View style={styles.divider} />
                    </View>
                  )}
                  <Text style={styles.messageText}>{message.text}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={[styles.inputArea, { marginBottom: 80 }]}>
              <TextInput
                style={styles.chatInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Share your thoughts, concerns, or what you hope to accomplish..."
                placeholderTextColor={palette.mutedBrown}
                multiline
              />
              <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                <Send size={26} color={palette.slate} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[portalStyles.continueButton, { bottom: 20, right: 80 }]}
              onPress={handleContinue}
            >
              <Text style={portalStyles.continueButtonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onBackToPortal} style={[portalStyles.backToPortalButton, { bottom: 20, left: 70 }]}>
              <Text style={portalStyles.backToPortalText}>Back to Portal</Text>
            </TouchableOpacity>
          </View>
          
        </KeyboardAvoidingView>

        
      </SafeAreaView>
    </ImageBackground>
  );
};