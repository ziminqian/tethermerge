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
      text: `Hi! I'm Tether AI, and I'm here to help you reflect on the relationship before this conversation.\n\nTaking a moment to reflect can help you:\n\n• Ground yourself in what this relationship means to you\n\n• Remember the moments that shaped your connection\n\n• Clarify what you genuinely appreciate about each other\n\n• Approach the conversation with empathy and emotional clarity`,
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
          text: `That's a great question about reflecting on your relationship! Taking time to reflect helps you approach this conversation with empathy and clarity. What else would you like to explore?`,
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
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <View style={portalStyles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingHorizontal: 16, marginBottom: 10 }}>
              <TouchableOpacity onPress={onBack} style={{ marginRight: 24 }}>
                <ChevronLeft size={40} color={palette.slate} />
              </TouchableOpacity>
              <Text style={[portalStyles.title, { fontSize: 36 }]}>Assurances</Text>
            </View>

            <ScrollView 
              style={[portalStyles.scrollView, { marginTop: 0 }]}
              contentContainerStyle={[portalStyles.scrollContent, { paddingTop: 20, paddingBottom: 180, paddingHorizontal: 16 }]}
              showsVerticalScrollIndicator={false}
            >
              <View style={[portalStyles.content, { marginTop: 0, paddingTop: 0 }]}>
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
              </View>
            </ScrollView>

            <View style={[styles.inputArea, { 
              position: 'absolute',
              bottom: 80,
              left: 16,
              right: 16,
              paddingBottom: 8,
              backgroundColor: 'transparent',
              zIndex: 5
            }]}>
              <TextInput
                style={styles.chatInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Ask about reflecting on your relationship, connection, or emotional clarity..."
                placeholderTextColor={palette.mutedBrown}
                multiline
              />
              <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                <Send size={26} color={palette.slate} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        <TouchableOpacity
          style={portalStyles.continueButton}
          onPress={handleContinue}
        >
          <Text style={portalStyles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onBackToPortal} style={portalStyles.backToPortalButton}>
          <Text style={portalStyles.backToPortalText}>Back to Portal</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};