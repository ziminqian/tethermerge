import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Change this line:
const SESSION_KEY = '@tether_session';  // Use consistent key

type MockSession = {
  user: {
    phone: string;
  };
} | null;

export default function useSession() {
  const [session, setSession] = useState<MockSession>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const storedSession = await AsyncStorage.getItem(SESSION_KEY);
      if (storedSession) {
        setSession(JSON.parse(storedSession));
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (phone: string) => {
    const newSession = {
      user: { phone }
    };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(newSession)); 
    setSession(newSession);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  return { session, loading, signIn, signOut };
}