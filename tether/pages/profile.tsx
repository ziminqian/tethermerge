import React, { useState } from 'react';
import { View, Text, Pressable, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles/styles';
import theme from '../styles/theme';
import { LogOut } from 'lucide-react-native';
import useSession from '../utils/useSession';

interface ProfileProps {
  onBack: () => void;
}

export const Profile = ({ onBack }: ProfileProps) => {

    const {signOut} = useSession();
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            setLoggingOut(true);
            try {
              await signOut();
              // The AuthGate will automatically show the Title screen
              // when session becomes null
            } catch (e) {
              console.error('Logout error:', e);
            } finally {
              setLoggingOut(false);
            }
          }
        }
      ]
    );
  };


  return (
    <View style={styles.imagePlaceholder}>
      <Text>Profile screen</Text>
      <TouchableOpacity
          onPress={handleLogout}
          disabled={loggingOut}
          style={styles.logoutLogo}
        >
          {loggingOut ? (
            <ActivityIndicator size="small" color={theme.buttontext} />
          ) : (
            <>
              <LogOut size={20} color={theme.text} />
              <Text style={[styles.text, { fontSize: 16, fontWeight: '600' }]}>
                Log Out
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
  );
};