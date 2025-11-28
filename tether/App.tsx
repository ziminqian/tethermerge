import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { TetherProvider } from './context/TetherContext';
import { Contacts } from './pages/contacts';
import { Message } from './pages/message';
import { Portal } from './pages/portal';
import { Home } from './pages/home';
import { Profile } from './pages/profile';
import { ExpectationsIntro } from './pages/expectationsIntro';
import { ExpectationsSection1 } from './pages/expectationsSection1';
import { ExpectationsSection2 } from './pages/expectationsSection2';
import { ExpectationsSection3 } from './pages/expectationsSection3';
import { ExpectationsSection4 } from './pages/expectationsSection4';
import { ExpectationsSection5 } from './pages/expectationsSection5';
import { ExpectationsComplete } from './pages/expectationsComplete';
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
  const [showExpectationsIntro, setShowExpectationsIntro] = useState(false);
  const [showExpectationsSection1, setShowExpectationsSection1] = useState(false);
  const [showExpectationsSection2, setShowExpectationsSection2] = useState(false);
  const [showExpectationsSection3, setShowExpectationsSection3] = useState(false);
  const [showExpectationsSection4, setShowExpectationsSection4] = useState(false);
  const [showExpectationsSection5, setShowExpectationsSection5] = useState(false);
  const [showExpectationsComplete, setShowExpectationsComplete] = useState(false);
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
    setShowExpectationsIntro(false);
    setShowExpectationsSection1(false);
    setShowExpectationsSection2(false);
    setShowExpectationsSection3(false);
    setShowExpectationsSection4(false);
    setShowExpectationsSection5(false);
    setShowExpectationsComplete(false);
    setShowReflect(false);
    setShowAcceptInvite(false);
    setSelectedContact(null);
    setActiveTab('friends');
  };

  const handleNavigateToExpectations = () => {
    setShowExpectationsIntro(true);
    setShowPortal(false);
  };

  const handleNavigateToSection1 = () => {
    setShowExpectationsSection1(true);
    setShowExpectationsIntro(false);
  };

  const handleNavigateToSection2 = () => {
    setShowExpectationsSection2(true);
    setShowExpectationsSection1(false);
  };

  const handleNavigateToSection3 = () => {
    setShowExpectationsSection3(true);
    setShowExpectationsSection2(false);
  };

  const handleNavigateToSection4 = () => {
    setShowExpectationsSection4(true);
    setShowExpectationsSection3(false);
  };

  const handleNavigateToSection5 = () => {
    setShowExpectationsSection5(true);
    setShowExpectationsSection4(false);
  };

  const handleNavigateToComplete = () => {
    setShowExpectationsComplete(true);
    setShowExpectationsSection5(false);
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
    setShowExpectationsIntro(false);
    setShowExpectationsSection1(false);
    setShowExpectationsSection2(false);
    setShowExpectationsSection3(false);
    setShowExpectationsSection4(false);
    setShowExpectationsSection5(false);
    setShowExpectationsComplete(false);
    setShowReflect(false);
    setShowAcceptInvite(false);
    setShowPortal(true);
  };

  const handleBackToExpectationsIntro = () => {
    setShowExpectationsSection1(false);
    setShowExpectationsIntro(true);
  };

  const handleBackToSection1 = () => {
    setShowExpectationsSection2(false);
    setShowExpectationsSection1(true);
  };

  const handleBackToSection2 = () => {
    setShowExpectationsSection3(false);
    setShowExpectationsSection2(true);
  };

  const handleBackToSection3 = () => {
    setShowExpectationsSection4(false);
    setShowExpectationsSection3(true);
  };

  const handleBackToSection4 = () => {
    setShowExpectationsSection5(false);
    setShowExpectationsSection4(true);
  };

  const handleBackToSection5 = () => {
    setShowExpectationsComplete(false);
    setShowExpectationsSection5(true);
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
      setShowExpectationsIntro(false);
      setShowExpectationsSection1(false);
      setShowExpectationsSection2(false);
      setShowExpectationsSection3(false);
      setShowExpectationsSection4(false);
      setShowExpectationsSection5(false);
      setShowExpectationsComplete(false);
      setShowReflect(false);
      setShowAcceptInvite(false);
      setSelectedContact(null);
    }
    setActiveTab(tab);
  };

  console.log(activeTab);
  
  const showOverlay = showExpectationsIntro || showExpectationsSection1 || showExpectationsSection2 || 
    showExpectationsSection3 || showExpectationsSection4 || showExpectationsSection5 || 
    showExpectationsComplete || showReflect || showAcceptInvite;
  
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
        {activeTab === 'friends' && showPortal && !showExpectationsIntro && !showExpectationsSection1 && 
          !showExpectationsSection2 && !showExpectationsSection3 && !showExpectationsSection4 && 
          !showExpectationsSection5 && !showExpectationsComplete && !showReflect && !showAcceptInvite && selectedContact && (
          <Portal 
            contact={selectedContact}
            onBack={handleBackToContacts}
            onNavigateToExpectations={handleNavigateToExpectations}
            onNavigateToReflect={handleNavigateToReflect}
            onNavigateToAcceptInvite={handleNavigateToAcceptInvite}
          />
        )}
        {activeTab === 'friends' && showExpectationsIntro && (
          <ExpectationsIntro 
            onBack={handleBackToPortal} 
            onContinue={handleNavigateToSection1}
            onBackToPortal={handleBackToPortal}
          />
        )}
        {activeTab === 'friends' && showExpectationsSection1 && (
          <ExpectationsSection1 
            onBack={handleBackToExpectationsIntro} 
            onContinue={handleNavigateToSection2}
            onBackToPortal={handleBackToPortal}
          />
        )}
        {activeTab === 'friends' && showExpectationsSection2 && (
          <ExpectationsSection2 
            onBack={handleBackToSection1} 
            onContinue={handleNavigateToSection3}
            onBackToPortal={handleBackToPortal}
          />
        )}
        {activeTab === 'friends' && showExpectationsSection3 && (
          <ExpectationsSection3 
            onBack={handleBackToSection2} 
            onContinue={handleNavigateToSection4}
            onBackToPortal={handleBackToPortal}
          />
        )}
        {activeTab === 'friends' && showExpectationsSection4 && (
          <ExpectationsSection4 
            onBack={handleBackToSection3} 
            onContinue={handleNavigateToSection5}
            onBackToPortal={handleBackToPortal}
          />
        )}
        {activeTab === 'friends' && showExpectationsSection5 && (
          <ExpectationsSection5 
            onBack={handleBackToSection4} 
            onContinue={handleNavigateToComplete}
            onBackToPortal={handleBackToPortal}
          />
        )}
        {activeTab === 'friends' && showExpectationsComplete && (
          <ExpectationsComplete 
            onBack={handleBackToSection5}
            onBackToPortal={handleBackToPortal}
          />
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