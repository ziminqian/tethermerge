import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { TetherProvider } from './context/TetherContext';
import { Contacts } from './pages/contacts';
import { Message } from './pages/message';
import { Portal } from './pages/portal';
import { Home } from './pages/home';
import { Profile } from './pages/profile';
import { Expectations } from './pages/expectations';
import {Expectations2} from './pages/expectations2';
import { Reflect } from './pages/reflect';
import { AcceptInvite } from './pages/acceptInvite';
import Welcome from './pages/welcome';
import Onboard1 from './pages/onboard1';
import Onboard2 from './pages/onboard2';
import Onboard3 from './pages/onboard3';
import Title from './pages/title';
import Signup from './pages/signup';
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
  const [showExpectations2, setShowExpectations2] = useState(false);

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
    setShowExpectations2(false);
  };

  const handleNavigateToExpectations = () => {
    setShowExpectations(true);
    setShowPortal(false);
  };

  const handleNavigateToExpectations2 = () => {
    setShowExpectations2(true);
    setShowExpectations(false);
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
    setShowExpectations2(false);
    setShowReflect(false);
    setShowAcceptInvite(false);
    setShowPortal(true);
  };

  const handleBackToExpectations = () => {
    setShowExpectations2(false);
    setShowExpectations(true);
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
      setShowExpectations2(false);
    }
    setActiveTab(tab);
  };

  console.log(activeTab);
  
  const showOverlay = showExpectations || showExpectations2 || showReflect || showAcceptInvite;
  
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
        {activeTab === 'friends' && showPortal && !showExpectations && !showExpectations2 && !showReflect && !showAcceptInvite && selectedContact && (
          <Portal 
            contact={selectedContact}
            onBack={handleBackToContacts}
            onNavigateToExpectations={handleNavigateToExpectations}
            onNavigateToReflect={handleNavigateToReflect}
            onNavigateToAcceptInvite={handleNavigateToAcceptInvite}
          />
        )}
        {activeTab === 'friends' && showExpectations && !showExpectations2 && (
          <Expectations onBack={handleBackToPortal} onContinue={handleNavigateToExpectations2} />
        )}
        {activeTab === 'friends' && showExpectations2 && !showPortal && !showMessage && (
          <Expectations2 onBack={handleBackToExpectations} />
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
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'onboard1' | 'onboard2' | 'login' | 'signup' | 'onboard3' | 'app'>('welcome');
  const [showSignup, setShowSignup] = useState(false);

  const handleWelcomeContinue = () => {
    setCurrentScreen('onboard1');
  };

  const handleOnboard1Continue = () => {
    setCurrentScreen('onboard2');
  };

  const handleOnboard2Continue = () => {
    setCurrentScreen('login');
  };

  const handleShowSignup = () => {
    setShowSignup(true);
  };

  const handleBackToLogin = () => {
    setShowSignup(false);
  };

  const handleSignupSuccess = () => {
    setCurrentScreen('onboard3');
  };

  const handleLoginSuccess = () => {
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

  // Show login page
  if (currentScreen === 'login') {
    return (
      <TetherProvider>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          {showSignup ? (
            <Signup onBack={handleBackToLogin} onSignupSuccess={handleSignupSuccess} />
          ) : (
            <Title onSignup={handleShowSignup} onLoginSuccess={handleLoginSuccess} />
          )}
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