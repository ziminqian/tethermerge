import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { TetherProvider } from './context/TetherContext';
import Title from './pages/title';
import { Contacts } from './pages/contacts';
import { Message } from './pages/message';
import { Home } from './pages/home';
import Footer from './pages/components/Footer';
import styles from './styles/styles';
import AuthGate from './pages/components/AuthGate';
import { supabase } from './config/supabase';

function AppContent() {
  const [activeScreen, setActiveScreen] = useState< 'friends' | 'home' | 'profile'>('home');
  const [activeTab, setActiveTab] = useState< 'friends' | 'home' | 'profile'>('home');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log("CURRENT SESSION:", data.session);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View>
        {activeScreen === 'friends' && (
          <Contacts 
            onNext={() => setActiveScreen('friends')} 
            onBack={() => setActiveScreen('friends')} // to-FIX
          />
        )}
        {activeScreen === 'home' && (
          <Message 
            onNext={() => setActiveScreen('home')} 
            onBack={() => setActiveScreen('friends')} 
          />
        )}
        {activeScreen === 'profile' && (
          <Home 
            onBack={() => setActiveScreen('friends')} 
          />
        )}
      </View>
      <View style={{flex: 2}}>
        <Footer activeTab={activeTab} setActiveTab={setActiveTab}/>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <TetherProvider>
      <AuthGate>
        <AppContent />
      </AuthGate>
    </TetherProvider>
  );
}