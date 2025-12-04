import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { TetherProvider } from './context/TetherContext';
import { Contacts } from './pages/contacts';
import { Message } from './pages/message';
import { Portal } from './pages/portal/portal';
import { Home } from './pages/home';
import { Profile } from './pages/profile';
import { ExpectationsIntro } from './pages/portal/expectationsIntro';
import { AIPage } from './pages/portal/aipage';
import { ExpectationsSection1 } from './pages/portal/expectationsSection1';
import { ExpectationsSection2 } from './pages/portal/expectationsSection2';
import { ExpectationsSection3 } from './pages/portal/expectationsSection3';
import { ExpectationsSection4 } from './pages/portal/expectationsSection4';
import { ExpectationsSection5 } from './pages/portal/expectationsSection5';
import { ExpectationsComplete } from './pages/portal/expectationsComplete';
import { Reflect } from './pages/portal/reflect';
import { AcceptInvite } from './pages/portal/acceptInvite';
import { AIPage as AIAssurance } from './pages/portal/ai_assurance';
import { LockedStep } from './pages/portal/lockedStep';
import Welcome from './pages/onboarding/welcome';
import Onboard1 from './pages/onboarding/onboard1';
import Onboard2 from './pages/onboarding/onboard2';
import Onboard3 from './pages/onboarding/onboard3';
import Title from './pages/title';
import Signup from './pages/signup';
import Footer from './pages/components/Footer';
import {Pause} from './pages/pause';
import {Conversation} from './pages/conversation';
import { Calling } from './pages/calling';
import { ConfirmCallModal } from './pages/components/ConfirmCall';
import styles from './styles/styles';
import AuthGate from './pages/components/AuthGate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { palette } from './styles/palette';

function AppContent() {
  const [activeTab, setActiveTab] = useState< 'friends' | 'home' | 'profile'>('home');

  const [showMessage, setShowMessage] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [showExpectationsIntro, setShowExpectationsIntro] = useState(false);
  const [showAIPage, setShowAIPage] = useState(false);
  const [showExpectationsSection1, setShowExpectationsSection1] = useState(false);
  const [showExpectationsSection2, setShowExpectationsSection2] = useState(false);
  const [showExpectationsSection3, setShowExpectationsSection3] = useState(false);
  const [showExpectationsSection4, setShowExpectationsSection4] = useState(false);
  const [showExpectationsSection5, setShowExpectationsSection5] = useState(false);
  const [showExpectationsComplete, setShowExpectationsComplete] = useState(false);
  const [showReflect, setShowReflect] = useState(false);
  const [showAcceptInvite, setShowAcceptInvite] = useState(false);
  const [showAIAssurance, setShowAIAssurance] = useState(false);
  const [showLockedStep, setShowLockedStep] = useState(false);
  const [selectedContact, setSelectedContact] = useState<{ id: string; name: string, color: any } | null>(null);
  const [showConversation, setShowConversation] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const [isNewPortalRequest, setIsNewPortalRequest] = useState(false);
  const [showCalling, setShowCalling] = useState(false);
  const [showConfirmCallModal, setShowConfirmCallModal] = useState(false);
  const [expectationsCompleted, setExpectationsCompleted] = useState(false);
  const [userProfile, setUserProfile] = useState<{ iconColor: string } | null>(null);


  useEffect(() => {
  const loadUserProfile = async () => {
    try {
      const storedProfile = await AsyncStorage.getItem('@tether_profile');
      if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };
  
  loadUserProfile();
}, []);

  const handleContactSelect = (contact: { id: string; name: string, color: any }, isInvite?: boolean) => {
    setSelectedContact(contact);
    setIsNewPortalRequest(false);
    setExpectationsCompleted(false);
    if (isInvite) {
      setShowMessage(true);
      setShowPortal(false);
    } else {
      setShowPortal(true);
      setShowMessage(false);
    }
  };

  const handleBackToContacts = () => {
    setShowMessage(false);
    setShowPortal(false);
    setShowExpectationsIntro(false);
    setShowAIPage(false);
    setShowExpectationsSection1(false);
    setShowExpectationsSection2(false);
    setShowExpectationsSection3(false);
    setShowExpectationsSection4(false);
    setShowExpectationsSection5(false);
    setShowExpectationsComplete(false);
    setShowReflect(false);
    setShowAcceptInvite(false);
    setShowLockedStep(false);
    setShowCalling(false); 
    setShowConversation(false);
    setShowPause(false);
    setShowConfirmCallModal(false);
    setSelectedContact(null);
    setIsNewPortalRequest(false);
    setActiveTab('friends');
  };

  const handleCompleteConversation = () => {
    setShowPortal(false);
    setSelectedContact(null);
    setActiveTab('home');
  };

  const handleNavigateToExpectations = () => {
    setShowExpectationsIntro(true);
    setShowPortal(false);
    setShowAcceptInvite(false);
  };

  const handleNavigateToAIPage = () => {
    setShowAIPage(true);
    setShowExpectationsIntro(false);
  };

  const handleNavigateToSection1 = () => {
    setShowExpectationsSection1(true);
    setShowAIPage(false);
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
    setExpectationsCompleted(true);
  };

  const handleNavigateToReflect = () => {
    setShowReflect(true);
    setShowPortal(false);
  };

  const handleNavigateToAIAssurance = () => {
    setShowAIAssurance(true);
    setShowPortal(false);
  };

  const handleNavigateToAcceptInvite = () => {
    setShowAcceptInvite(true);
    setShowPortal(false);
  };

  const handleNavigateToLockedStep = () => {
    setShowLockedStep(true);
    setShowPortal(false);
  };

  const handleBackToPortal = () => {
    setShowExpectationsIntro(false);
    setShowAIPage(false);
    setShowExpectationsSection1(false);
    setShowExpectationsSection2(false);
    setShowExpectationsSection3(false);
    setShowExpectationsSection4(false);
    setShowExpectationsSection5(false);
    setShowExpectationsComplete(false);
    setShowReflect(false);
    setShowAcceptInvite(false);
    setShowAIAssurance(false);
    setShowLockedStep(false);
    setShowCalling(false);
    setShowConversation(false);
    setShowPause(false);
    setShowConfirmCallModal(false);
    setShowPortal(true);
  };

  const handleBackToExpectationsIntro = () => {
    setShowAIPage(false);
    setShowExpectationsIntro(true);
  };

  const handleBackToAIPage = () => {
    setShowExpectationsSection1(false);
    setShowAIPage(true);
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

  // Show confirm call modal when call button is pressed
  const handleStartCall = () => {
    setShowConfirmCallModal(true);
  };

  // Cancel button in confirm modal - just close modal, stay on portal
  const handleCancelCall = () => {
    setShowConfirmCallModal(false);
  };

  // Confirm button in modal - start the calling screen
  const handleConfirmCall = () => {
    setShowConfirmCallModal(false);
    setShowCalling(true);
    setShowPortal(false);
  };

  const handleCallConnected = () => {
    setShowCalling(false);
    setShowConversation(true);
  };

  const handlePauseConversation = () => {
    setShowPause(true);
    setShowConversation(false);
  };

  const handleResumeConversation = () => {
    setShowConversation(true);
    setShowPause(false);
  };

  const handleEndCall = () => {
    setShowConversation(false);
    setShowCalling(false);
    setShowPause(false);
    setShowPortal(true);
  };

  const handleTabChange = (tab: 'friends' | 'home' | 'profile') => {
    if (tab === 'friends') {
      setShowMessage(false);
      setShowPortal(false);
      setShowExpectationsIntro(false);
      setShowAIPage(false);
      setShowExpectationsSection1(false);
      setShowExpectationsSection2(false);
      setShowExpectationsSection3(false);
      setShowExpectationsSection4(false);
      setShowExpectationsSection5(false);
      setShowExpectationsComplete(false);
      setShowReflect(false);
      setShowAcceptInvite(false);
      setShowAIAssurance(false);
      setShowLockedStep(false);
      setShowConversation(false);
      setShowPause(false);
      setShowCalling(false);
      setShowConfirmCallModal(false);
      setSelectedContact(null);
    }
    setActiveTab(tab);
  };

  const showOverlay = showExpectationsIntro || showAIPage || showExpectationsSection1 || showExpectationsSection2 || 
    showExpectationsSection3 || showExpectationsSection4 || showExpectationsSection5 || 
    showExpectationsComplete || showReflect || showAcceptInvite || showAIAssurance || showLockedStep;
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: showOverlay ? 1 : 9 }}>
        {/* Contacts Page */}
        {activeTab === 'friends' && !showMessage && !showPortal && !showCalling && !showConversation && !showPause && !showOverlay && (
          <Contacts 
            onNext={handleContactSelect} 
            onBack={() => {}}
            onSearch={(query) => console.log(query)}
          />
        )}

        {/* Portal Page with Confirm Call Modal */}
        {activeTab === 'friends' && showPortal && !showCalling && !showConversation && !showPause && !showOverlay && selectedContact && (
          <>
            <Portal 
              contact={selectedContact}
              userColor={userProfile?.iconColor || palette.sage}
              isNewPortalRequest={isNewPortalRequest}
              expectationsCompleted={expectationsCompleted}
              onBack={handleBackToContacts}
              onNavigateToExpectations={handleNavigateToExpectations}
              onNavigateToReflect={handleNavigateToReflect}
              onNavigateToAcceptInvite={handleNavigateToAcceptInvite}
              onNavigateToLockedStep={handleNavigateToLockedStep}
              onNavigateToAIAssurance={handleNavigateToAIAssurance}
              onStartCall={handleStartCall}
              onComplete={handleCompleteConversation}
            />
            <ConfirmCallModal
              visible={showConfirmCallModal}
              contactName={selectedContact.name}
              onConfirm={handleConfirmCall}
              onCancel={handleCancelCall}
            />
          </>
        )}

        {/* Calling Page */}
        {activeTab === 'friends' && showCalling && !showConversation && selectedContact && (
          <Calling 
            contact={selectedContact}
            onBack={handleEndCall}
            onCallConnected={handleCallConnected}
          />
        )}

        {/* Conversation Page */}
        {activeTab === 'friends' && showConversation && !showPause && selectedContact && (
          <Conversation 
            contact={selectedContact}
            onBack={handleEndCall}
            onPause={handlePauseConversation}
            onEndConversation={handleBackToPortal}
          />
        )}

        {/* Pause Page */}
        {activeTab === 'friends' && showPause && selectedContact && (
          <Pause 
           contact={selectedContact}
            onResume={handleResumeConversation}          
          />
        )}

        {/* Expectations Flow */}
        {activeTab === 'friends' && showExpectationsIntro && (
          <ExpectationsIntro 
            onBack={handleBackToPortal} 
            onContinue={handleNavigateToAIPage}
            onBackToPortal={handleBackToPortal}
          />
        )}
        {activeTab === 'friends' && showAIPage && (
          <AIPage 
            onBack={handleBackToExpectationsIntro} 
            onContinue={handleNavigateToSection1}
            onBackToPortal={handleBackToPortal}
          />
        )}
        {activeTab === 'friends' && showExpectationsSection1 && (
          <ExpectationsSection1 
            onBack={handleBackToAIPage} 
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
        {activeTab === 'friends' && showExpectationsComplete && selectedContact &&(
          <ExpectationsComplete 
            contact={selectedContact}
            onBack={handleBackToSection5}
            onBackToPortal={handleBackToPortal}
          />
        )}

        {/* Reflect & Accept Invite */}
        {activeTab === 'friends' && showReflect && (
          <Reflect onBack={handleBackToPortal} />
        )}
        {activeTab === 'friends' && showAIAssurance && selectedContact &&(
          <AIAssurance 
            contact={selectedContact}
            onBack={handleBackToPortal}
            onContinue={handleBackToPortal}
            onBackToPortal={handleBackToPortal}
          />
        )}
        {activeTab === 'friends' && showAcceptInvite && selectedContact && (
          <AcceptInvite 
            contact={selectedContact}
            isNewPortalRequest={isNewPortalRequest}
            onBack={handleBackToPortal}
            onNavigateToExpectations={handleNavigateToExpectations}
          />
        )}
        {activeTab === 'friends' && showLockedStep && (
          <LockedStep onBack={handleBackToPortal} />
        )}

        {/* Message Page */}
        {activeTab === 'friends' && showMessage && selectedContact && (
          <Message 
            contact={selectedContact}
            onNext={handleSendInvite} 
            onBack={handleBackToContacts}
          />
        )}

        {/* Home Page */}
        {activeTab === 'home' && !showOverlay && (
          <Home 
            onBack={() => setActiveTab('friends')}
            onNext={(contact) => {
              setSelectedContact(contact);
              setIsNewPortalRequest(true);
              setActiveTab('friends');
              setShowPortal(true);
            }}
            onSearch={(query) => console.log(query)}
          />
        )}

        {/* Profile Page */}
        {activeTab === 'profile' && !showOverlay && (
          <Profile 
            onBack={() => setActiveTab('profile')} 
            onProfileUpdate={(profile) => setUserProfile(profile)}
          />
        )}
      </View>

      {/* Footer */}
      {!showOverlay && (
        <View style={{flex: 1}}>
          <Footer activeTab={activeTab} setActiveTab={handleTabChange}/>
        </View>
      )}
    </View>
  );
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'onboard1' | 'onboard2' | 'login' | 'signup' | 'app'>('welcome');
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
    setCurrentScreen('app');
  };

  

  const handleLoginSuccess = () => {
    setCurrentScreen('app');
  };

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

  return (
    <TetherProvider>
      <AuthGate>
        <AppContent/>
      </AuthGate>
    </TetherProvider>
  );
}