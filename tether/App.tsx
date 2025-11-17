import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { TetherProvider } from './context/TetherContext';
import { Contacts } from './pages/contacts';
import { Message } from './pages/message';
import { Home } from './pages/home';
import { Profile } from './pages/profile';
import Footer from './pages/components/Footer';
import styles from './styles/styles';
import AuthGate from './pages/components/AuthGate';
//import { supabase } from './config/supabase';

function AppContent() {
  const [activeTab, setActiveTab] = useState< 'friends' | 'home' | 'profile'>('home');

  // supabase stuff : for later
  /*
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log("CURRENT SESSION:", data.session);
    });
  }, []);*/

  console.log(activeTab);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 9 }}>
        {activeTab === 'friends' && (
          <Contacts 
            onNext={() => setActiveTab('friends')} 
            onBack={() => setActiveTab('friends')} // to-FIX
          />
        )}
        {activeTab === 'home' && (
          <Home 
            onBack={() => setActiveTab('friends')} 
          />
        )}
        {activeTab === 'profile' && (
          <Profile 
            onBack={() => setActiveTab('profile')} 
          />
        )}
      </View>
      <View style={{flex: 1}}>
        <Footer activeTab={activeTab} setActiveTab={setActiveTab}/>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <TetherProvider>
      <AuthGate>
        <AppContent/>
      </AuthGate>
    </TetherProvider>
  );
}