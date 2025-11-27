import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { TetherProvider } from './context/TetherContext';
import { Contacts } from './pages/contacts';
import { Message } from './pages/message';
import { Portal } from './pages/portal';
import { Home } from './pages/home';
import { Profile } from './pages/profile';
import { Expectations } from './pages/expectations';
import { Reflect } from './pages/reflect';
import { AcceptInvite } from './pages/acceptInvite';
import Welcome from './pages/welcome';
import Onboard1 from './pages/onboard1';
import Onboard2 from './pages/onboard2';
import Onboard3 from './pages/onboard3';
import Footer from './pages/components/Footer';
import styles from './styles/styles';
import AuthGate from './pages/components/AuthGate';
//import { supabase } from './config/supabase';

function AppContent() {
  const [activeTab, setActiveTab] = useState< 'friends' | 'home' | 'profile'>('home');

  //　
  const [showMessage, setShowMessage] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [showExpectations, setShowExpectations] = useState(false);
  const [showReflect, setShowReflect] = useState(false);
  const [showAcceptInvite, setShowAcceptInvite] = useState(false);
  const [selectedContact, setSelectedContact] = useState<{ id: string; name: string } | null>(null);

  // supabase stuff : for later
  /*
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log("CURRENT SESSION:", data.session);
    });
  }, []);*/

  const handleContactSelect = (contact: { id: string; name: string }, isInvite?: boolean) => {
    setSelectedContact(contact);
    if (isInvite) {
      // Navigate to initiate conversation (Message page) for invites
      setShowMessage(true);
      setShowPortal(false);
    } else {
      // Navigate to portal page for friends
      setShowPortal(true);
      setShowMessage(false);
    }
  };

  const handleBackToContacts = () => {
    setShowMessage(false);
    setShowPortal(false);
    setShowExpectations(false);
    setShowReflect(false);
    setShowAcceptInvite(false);
    setSelectedContact(null);
    setActiveTab('friends');
  };

  const handleNavigateToExpectations = () => {
    setShowExpectations(true);
    setShowPortal(false);
  };

  const handleNavigateToReflect = () => {
    setShowReflect(true);
    setShowPortal(false);
  };

  const handleNavigateToAcceptInvite = () => {
    setShowAcceptInvite(true);
    setShowPortal(false);
  };

  const handleBackToPortal = () => {
    setShowExpectations(false);
    setShowReflect(false);
    setShowAcceptInvite(false);
    setShowPortal(true);
  };

  const handleSendInvite = () => {
    setShowMessage(false);
    setSelectedContact(null);
  };

  const handleTabChange = (tab: 'friends' | 'home' | 'profile') => {
    if (tab === 'friends') {
      // Reset all state when navigating to friends tab
      setShowMessage(false);
      setShowPortal(false);
      setShowExpectations(false);
      setShowReflect(false);
      setShowAcceptInvite(false);
      setSelectedContact(null);
    }
    setActiveTab(tab);
  };

  console.log(activeTab);
  
  const showOverlay = showExpectations || showReflect || showAcceptInvite;
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: showOverlay ? 1 : 9 }}>
        {activeTab === 'friends' && !showMessage && !showPortal && !showOverlay && (
          <Contacts 
            onNext={handleContactSelect} 
            onBack={() => {}}
            onSearch={(query) => console.log(query)}
          />
        )}
        {activeTab === 'friends' && showPortal && !showExpectations && !showReflect && !showAcceptInvite && selectedContact && (
          <Portal 
            contact={selectedContact}
            onBack={handleBackToContacts}
            onNavigateToExpectations={handleNavigateToExpectations}
            onNavigateToReflect={handleNavigateToReflect}
            onNavigateToAcceptInvite={handleNavigateToAcceptInvite}
          />
        )}
        {activeTab === 'friends' && showExpectations && (
          <Expectations onBack={handleBackToPortal} />
        )}
        {activeTab === 'friends' && showReflect && (
          <Reflect onBack={handleBackToPortal} />
        )}
        {activeTab === 'friends' && showAcceptInvite && (
          <AcceptInvite onBack={handleBackToPortal} />
        )}
        {activeTab === 'friends' && showMessage && selectedContact && (
          <Message 
            contact={selectedContact}
            onNext={handleSendInvite} 
            onBack={handleBackToContacts}
          />
        )}
        {activeTab === 'home' && !showOverlay && (
          <Home 
            onBack={() => {}}
            onNext={() => {}}
            onSearch={(query) => console.log(query)}
          />
        )}
        {activeTab === 'profile' && !showOverlay && (
          <Profile 
            onBack={() => setActiveTab('profile')} 
          />
        )}
      </View>
      {!showOverlay && (
        <View style={{flex: 1}}>
          <Footer activeTab={activeTab} setActiveTab={handleTabChange}/>
        </View>
      )}
    </View>
  );
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'onboard1' | 'onboard2' | 'onboard3' | 'app'>('welcome');

  const handleWelcomeContinue = () => {
    setCurrentScreen('onboard1');
  };

  const handleOnboard1Continue = () => {
    setCurrentScreen('onboard2');
  };

  const handleOnboard2Continue = () => {
    setCurrentScreen('onboard3');
  };

  const handleOnboard3Continue = () => {
    setCurrentScreen('app');
  };

  // Show welcome page first
  if (currentScreen === 'welcome') {
    return (
      <TetherProvider>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <Welcome onContinue={handleWelcomeContinue} />
        </View>
      </TetherProvider>
    );
  }

  // Show onboard1
  if (currentScreen === 'onboard1') {
    return (
      <TetherProvider>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <Onboard1 onContinue={handleOnboard1Continue} />
        </View>
      </TetherProvider>
    );
  }

  // Show onboard2
  if (currentScreen === 'onboard2') {
    return (
      <TetherProvider>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <Onboard2 onContinue={handleOnboard2Continue} />
        </View>
      </TetherProvider>
    );
  }

  // Show onboard3
  if (currentScreen === 'onboard3') {
    return (
      <TetherProvider>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <Onboard3 onContinue={handleOnboard3Continue} />
        </View>
      </TetherProvider>
    );
  }

  // After onboarding, show login/auth flow
  return (
    <TetherProvider>
      <AuthGate>
        <AppContent/>
      </AuthGate>
    </TetherProvider>
  );
}