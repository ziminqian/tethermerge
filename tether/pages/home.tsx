import React, { useState } from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import styles from '../styles/styles';

interface HomeProps {
  onBack: () => void;
}

export const Home = ({ onBack }: HomeProps) => {
  const [phase, setPhase] = useState<'prepare' | 'during' | 'after'>('prepare');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        
        <Text style={styles.heading}>Conversation Space</Text>
        
        <View style={styles.tabs}>
          <Pressable 
            style={[styles.tab, phase === 'prepare' && styles.tabActive]} 
            onPress={() => setPhase('prepare')}
          >
            <Text style={phase === 'prepare' ? styles.tabTextActive : styles.tabText}>
              📝 Prepare
            </Text>
          </Pressable>
          <Pressable 
            style={[styles.tab, phase === 'during' && styles.tabActive]} 
            onPress={() => setPhase('during')}
          >
            <Text style={phase === 'during' ? styles.tabTextActive : styles.tabText}>
              💬 During
            </Text>
          </Pressable>
          <Pressable 
            style={[styles.tab, phase === 'after' && styles.tabActive]} 
            onPress={() => setPhase('after')}
          >
            <Text style={phase === 'after' ? styles.tabTextActive : styles.tabText}>
              ✨ After
            </Text>
          </Pressable>
        </View>
        
        <View style={styles.content}>
          {phase === 'prepare' && (
            <View style={styles.phaseCard}>
              <Text style={styles.phaseTitle}>Set Your Intentions</Text>
              <Text style={styles.phaseText}>
                What do you hope to achieve in this conversation?
              </Text>
            </View>
          )}
          {phase === 'during' && (
            <View style={styles.phaseCard}>
              <Text style={styles.phaseTitle}>Stay Present</Text>
              <Text style={styles.phaseText}>
                Listen actively and lead with empathy. It's okay to pause and take your time.
              </Text>
            </View>
          )}
          {phase === 'after' && (
            <View style={styles.phaseCard}>
              <Text style={styles.phaseTitle}>Reflect</Text>
              <Text style={styles.phaseText}>
                How did it go? What did you learn? Take time to process the experience.
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};