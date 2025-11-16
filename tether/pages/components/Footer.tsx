import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from '../../styles/styles';
import { palette } from '../../styles/palette';

interface FooterProps {
  activeTab: 'friends' | 'home' | 'profile';
  setActiveTab: (tab: 'friends' | 'home' | 'profile') => void;
}

export default function Footer({ activeTab, setActiveTab }: FooterProps) {
  return (
    <View style={styles.footer}>
      <Pressable 
        style={styles.navButton} 
        onPress={() => setActiveTab('friends')}
      >
        <Text style={{ fontSize: 32 }}>
          {activeTab === 'friends' ? '🎨' : '👥'}
        </Text>
        <Text style={[
          styles.text,
          { color: activeTab === 'friends' ? palette.slate : palette.mutedBrown }
        ]}>
          Friends
        </Text>
      </Pressable>

      <Pressable 
        style={styles.navButton} 
        onPress={() => setActiveTab('home')}
      >
        <Text style={{ fontSize: 32 }}>
          {activeTab === 'home' ? '🏠' : '🏡'}
        </Text>
        <Text style={[
          styles.text,
          { color: activeTab === 'home' ? palette.slate : palette.mutedBrown }
        ]}>
          Home
        </Text>
      </Pressable>

      <Pressable 
        style={styles.navButton} 
        onPress={() => setActiveTab('profile')}
      >
        <Text style={{ fontSize: 32 }}>
          {activeTab === 'profile' ? '🐸' : '👤'}
        </Text>
        <Text style={[
          styles.text,
          { color: activeTab === 'profile' ? palette.slate : palette.mutedBrown }
        ]}>
          Profile
        </Text>
      </Pressable>
    </View>
  );
}