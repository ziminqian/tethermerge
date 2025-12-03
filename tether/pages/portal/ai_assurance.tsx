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
import { ChevronLeft, Send } from 'lucide-react-native';
import portalStyles from '../../styles/portalStyles';

interface AIPageProps {
  onBack: () => void;
  onContinue: () => void;
  onBackToPortal: () => void;
}

interface ChatMessage {
  id: string;
  text: string;
  isAI: boolean;
}

export const AIPage = ({ onBack, onContinue, onBackToPortal }: AIPageProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: `Hi! I'm Tether AI, and I'm here to help you set clear expectations for this conversation.\n\nSetting expectations helps you:\n• Stay grounded in what you can control\n• Prepare for different outcomes\n• Communicate with clarity and intention\n• Protect your emotional well-being\n\nWhat would you like to explore about setting expectations? You can ask me about what you can control, what you can't control, your ideal outcomes, or how to prepare emotionally.`,
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
          text: `That's a great question about expectations! Setting clear expectations helps you approach this conversation with intention. What else would you like to explore?`,
          isAI: true
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
      
      setInputText('');
    }
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
              <Text style={[portalStyles.title, { fontSize: 36 }]}>Set Expectations</Text>
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
                          <Image source={require("../../assets/other/ai.png")} style={{height: 30, width: 30}}/>
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
              bottom: 120,
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
                placeholder="Ask about what you can control, outcomes, or emotional preparation..."
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
          onPress={onContinue}
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