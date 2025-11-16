import React from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import styles from '../styles/styles';

interface MessageProps {
  onNext: () => void;
  onBack: () => void;
}

export const Message = ({ onNext, onBack }: MessageProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        
        <Text style={styles.heading}>Generate Message</Text>
        
        <View style={styles.content}>
          <View style={styles.messageBox}>
            <Text style={styles.label}>Opening Message:</Text>
            <Text style={styles.message}>
              Hi, I've been thinking about something and wanted to reach out. 
              Would you have some time to talk? I'd really appreciate the chance 
              to share what's on my mind.
            </Text>
          </View>
        </View>
        
        <Pressable style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};