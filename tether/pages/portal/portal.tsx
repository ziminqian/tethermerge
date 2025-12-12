import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ImageBackground, 
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import styles from '../../styles/styles';
import { palette } from '../../styles/palette';
import { ChevronDown, ChevronLeft, ChevronUp, Phone, X, Check, RotateCcw } from 'lucide-react-native';
import portalStyles from '../../styles/portalStyles';
import { Reflect } from './reflect';
import { ExpectationsReviewModal } from './ExpectationsReviewModal';
import useSession from '../../utils/useSession';
import { 
  getPortalProgress, 
  updatePortalProgress, 
  resetPortalProgress as resetPortalProgressDB,
  getOrCreatePortal 
} from '../../utils/database';

const strokemap = require('../../assets/portal/strokemap.png');
const together = require('../../assets/portal/together.png');
const expectationsnum = require('../../assets/portal/expectation#image.png');
const reflect = require('../../assets/portal/reflect_icon.png');
const one = require('../../assets/portal/one.png');
const spiral = require('../../assets/portal/spiral_res.png');
const invite = require('../../assets/portal/invite.png');
const two = require('../../assets/portal/two.png');
const expectations = require('../../assets/portal/expectations_.png');
const lock = require('../../assets/portal/graylock.png');
const assurances = require('../../assets/portal/assurances.png');
const three = require('../../assets/portal/3.png');
const four = require('../../assets/portal/four.png');
const reflectwhite = require('../../assets/portal/reflectwhite.png');
const down = require('../../assets/portal/down.png');
const newbottom = require('../../assets/portal/newbottom.png');

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface PortalProps {
  contact: { id: string; name: string; color: any };
  userColor?: any;
  isNewPortalRequest?: boolean;
  expectationsCompleted?: boolean;
  onBack: () => void;
  onNavigateToExpectations: () => void;
  onNavigateToReflect: () => void;
  onNavigateToAcceptInvite: () => void;
  onNavigateToLockedStep: () => void;
  onNavigateToAIAssurance: () => void;
  onStartCall?: () => void;
  onComplete?: () => void;
}

interface PortalProgress {
  inviteAccepted: boolean;
  expectationsCompleted: boolean;
  assurancesCompleted: boolean;
  reflectCompleted: boolean;
}

export const Portal = ({
  contact,
  userColor,
  isNewPortalRequest = false,
  expectationsCompleted = false,
  onBack,
  onNavigateToExpectations,
  onNavigateToReflect,
  onNavigateToAcceptInvite,
  onNavigateToLockedStep,
  onNavigateToAIAssurance,
  onStartCall,
  onComplete,
}: PortalProps) => {
  const { session } = useSession();
  const [portalId, setPortalId] = useState<string>('');
  const [progress, setProgress] = useState<PortalProgress>({
    inviteAccepted: false,
    expectationsCompleted: false,
    assurancesCompleted: false,
    reflectCompleted: false,
  });

  const [showReflect, setShowReflect] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isInLowerHalf, setIsInLowerHalf] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize portal and load progress from database
  useEffect(() => {
    const initializePortal = async () => {
      if (!session?.user?.id) return;

      try {
        setLoading(true);
        
        // Get or create portal
        const portalIdResult = await getOrCreatePortal(session.user.id, contact.id);
        setPortalId(portalIdResult);

        // Load progress from database
        const dbProgress = await getPortalProgress(portalIdResult, session.user.id);
        
        setProgress({
          inviteAccepted: dbProgress.inviteAccepted || !isNewPortalRequest,
          expectationsCompleted: dbProgress.expectationsCompleted || expectationsCompleted,
          assurancesCompleted: dbProgress.assurancesCompleted || false,
          reflectCompleted: dbProgress.reflectCompleted || false,
        });
      } catch (error) {
        console.error('Error initializing portal:', error);
      } finally {
        setLoading(false);
      }
    };

    initializePortal();
  }, [session?.user?.id, contact.id, isNewPortalRequest, expectationsCompleted]);

  // Save progress to database whenever it changes
  useEffect(() => {
    const saveProgress = async () => {
      if (!session?.user?.id || !portalId || loading) return;

      try {
        await updatePortalProgress(portalId, session.user.id, progress);
      } catch (error) {
        console.error('Error saving portal progress:', error);
      }
    };

    saveProgress();
  }, [progress, portalId, session?.user?.id, loading]);

  const scrollToLowerHalf = () => {
    scrollViewRef.current?.scrollTo({ 
      y: SCREEN_HEIGHT, 
      animated: true 
    });
    setTimeout(() => setIsInLowerHalf(true), 800);
  };

  const scrollToUpperHalf = () => {
    scrollViewRef.current?.scrollTo({ 
      y: 0, 
      animated: true 
    });
    setTimeout(() => setIsInLowerHalf(false), 800);
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsInLowerHalf(offsetY > SCREEN_HEIGHT / 2);
  };

  // Mark invite as accepted
  const handleInviteAccepted = () => {
    setProgress(prev => ({ ...prev, inviteAccepted: true }));
    onNavigateToAcceptInvite();
  };

  // Mark assurances as completed
  const handleAssurancesComplete = () => {
    setProgress(prev => ({ ...prev, assurancesCompleted: true }));
    onNavigateToAIAssurance();
  };

  // Mark reflect as completed
  const handleReflectComplete = () => {
    setProgress(prev => ({ ...prev, reflectCompleted: true }));
    setShowReflect(true);
  };

  // Handle reset confirmation
  const handleResetProgress = async () => {
    if (!session?.user?.id || !portalId) return;

    try {
      await resetPortalProgressDB(portalId, session.user.id);
      
      setProgress({
        inviteAccepted: false,
        expectationsCompleted: false,
        assurancesCompleted: false,
        reflectCompleted: false,
      });
      
      setShowResetModal(false);
      setIsInLowerHalf(false);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    } catch (error) {
      console.error('Error resetting portal progress:', error);
    }
  };

  // Render checkmark or number
  const renderStepIcon = (stepCompleted: boolean, numberImage: any, size: number = 0.18) => {
    if (stepCompleted) {
      return (
        <View style={{
          width: SCREEN_WIDTH * size,
          height: SCREEN_WIDTH * size,
          borderRadius: (SCREEN_WIDTH * size) / 2,
          backgroundColor: palette.sage,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: palette.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 4,
        }}>
          <Check size={SCREEN_WIDTH * size * 0.6} color={palette.cream} strokeWidth={3} />
        </View>
      );
    }
    return (
      <Image
        source={numberImage}
        style={{
          width: SCREEN_WIDTH * size,
          height: SCREEN_WIDTH * size,
          resizeMode: 'contain',
        }}
      />
    );
  };

  if (showReflect) {
    return (
      <Reflect 
        contact={contact} 
        onBack={() => {
          setShowReflect(false);
          setIsInLowerHalf(false);
          setTimeout(() => {
            scrollViewRef.current?.scrollTo({ y: 0, animated: false });
          }, 100);
        }} 
      />
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/backgrounds/background_vibrant.png')}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, overflow: 'visible' }}>
        <View style={styles.screen}>
          <View style={[styles.heading, {marginBottom: 0}]}>
              <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <ChevronLeft size={40} color={palette.slate} />
              </TouchableOpacity>
              <Text style={styles.headingtext}>Portal with {contact.name}</Text>
              <TouchableOpacity 
                onPress={() => setShowResetModal(true)} 
                style={{
                  position: 'absolute',
                  right: 8,
                  bottom: -6,
                  zIndex: 2,
                }}
              >
                <RotateCcw size={32} color={palette.slate} />
              </TouchableOpacity>
          </View>

          <ScrollView 
            ref={scrollViewRef}
            style={{ flex: 1 }}
            contentContainerStyle={{
              height: SCREEN_HEIGHT * 2,
            }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            <View style={{ height: SCREEN_HEIGHT }} />
            
            <View style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH, paddingHorizontal: 16, paddingBottom: 32, alignItems: 'center' }}>
              <Image
                source={together}
                style={{
                  width: SCREEN_WIDTH * 1.2,
                  resizeMode: 'contain',
                  marginTop: 0,
                  marginBottom: 0,
                  top: -20,
                  left: -8
                }}
              />
              <Image
                source={newbottom}
                style={{
                  width: SCREEN_WIDTH * 0.4,
                  height: SCREEN_HEIGHT * 0.3,
                  resizeMode: 'contain',
                  marginTop: -150,
                  left: -20,
                }}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      {!isInLowerHalf && (
        <>
      <View style={portalStyles.frogsContainer}>
        <View style={portalStyles.frogPair}>
          <View style={portalStyles.singleFrog}>
            <Image 
              source={require('../../assets/frogs/cute_frog_body.png')}
              style={[
                portalStyles.frogBody,
                { height: 37 },
                { transform: [{ translateY: 6 }, { translateX: 9 }, { scaleX: -1 }] },
              ]}
              resizeMode="contain"
              tintColor={userColor} 
            />
            <Image 
              source={require('../../assets/frogs/cute_frog_outline.png')}
              style={[
                portalStyles.frogBody,
                { position: 'absolute', height: 46 },
                { transform: [{ translateY: 6 }, { translateX: 9 }, { scaleX: -1 }] },
              ]}
              resizeMode="contain"
            />
            <Image 
              source={require('../../assets/frogs/cute_frog_cheeks.png')}
              style={[
                portalStyles.frogBody,
                { position: 'absolute', height: 44 },
                { transform: [{ translateY: 4 }, { translateX: 3 }, { scaleX: -1 }] },
              ]}
            />
          </View>

          <View style={portalStyles.singleFrog}>
            <Image 
              source={require('../../assets/frogs/cute_frog_body.png')}
              style={[
                portalStyles.frogBody,
                { height: 37 },
                { transform: [{ translateY: 6 }, { translateX: -5 }] },
              ]}
              resizeMode="contain"
              tintColor={contact.color || palette.sage}
            />
            <Image 
              source={require('../../assets/frogs/cute_frog_outline.png')}
              style={[
                portalStyles.frogBody,
                { position: 'absolute', height: 46 },
                { transform: [{ translateY: 6 }, { translateX: -5 }] },
              ]}
              resizeMode="contain"
            />
            <Image 
              source={require('../../assets/frogs/cute_frog_cheeks.png')}
              style={[
                portalStyles.frogBody,
                { position: 'absolute', height: 44 },
                { transform: [{ translateY: 4 }, { translateX: 1 }] },
              ]}
            />
          </View>
        </View>

        <View style={portalStyles.labelsContainer}>
          <Text style={portalStyles.userGraphicLabel}>You</Text>
          <Text style={portalStyles.userGraphicLabel}>{contact.name}</Text>
        </View>
      </View>

      <View style={[portalStyles.spiralTouchable, { alignSelf: 'flex-start' }]}>
        <TouchableOpacity onPress={handleInviteAccepted}>
          {progress.inviteAccepted ? (
            renderStepIcon(true, one, 0.18)
          ) : (
            <Image source={lock} style={portalStyles.one} />
          )}
        </TouchableOpacity>
      </View>
      <Image source={invite} style={portalStyles.invite} />
      <Image source={spiral} style={portalStyles.spiral} />

      <TouchableOpacity 
        onPress={() => {
          if (!progress.inviteAccepted) {
            onNavigateToLockedStep();
          } else if (progress.expectationsCompleted) {
            setShowReviewModal(true);
          } else {
            onNavigateToExpectations();
          }
        }}
        style={portalStyles.expectationsTouchable}
      >
        {!progress.inviteAccepted ? (
          <Image source={lock} style={portalStyles.two} />
        ) : (
          renderStepIcon(progress.expectationsCompleted, two, 0.18)
        )}
      </TouchableOpacity>
      <Image source={expectations} style={portalStyles.expectationsImage} />

      <View style={[portalStyles.reflectContainer]}> 
        <TouchableOpacity 
          onPress={() => {
            if (!progress.expectationsCompleted) {
              onNavigateToLockedStep();
            } else {
              handleAssurancesComplete();
            }
          }}
          style={portalStyles.reflectTouchable}
        > 
          {!progress.expectationsCompleted ? (
            <Image source={lock} style={portalStyles.lock} />
          ) : (
            renderStepIcon(progress.assurancesCompleted, three, 0.18)
          )}
        </TouchableOpacity>
      </View>
      <Image source={assurances} style={portalStyles.assurances} />
      
      <TouchableOpacity 
        style={[
          portalStyles.portalCallButton, 
          {bottom: 140, left: 150},
          !progress.expectationsCompleted && { opacity: 1 }
        ]}
        onPress={() => {
          if (!progress.expectationsCompleted) {
            onNavigateToLockedStep();
          } else {
            onStartCall?.();
          }
        }}
      >
        <View style={[portalStyles.portalCallButtonInner, {backgroundColor: !progress.expectationsCompleted ? '#ABB6A0' : palette.slate}]}>
          <Phone size={34} color={palette.cream} />
        </View>
      </TouchableOpacity>

      <View style={portalStyles.elementcontainer}>
        <Image source={strokemap} style={portalStyles.strokemap} />
        <Image source={together} style={[portalStyles.together, {top: -25, width: 600, height: 400}]} />
      </View>

      <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
        <TouchableOpacity onPress={scrollToLowerHalf} style={portalStyles.scrollButton}>
          <ChevronDown size={16} color="white" />
          <Text style={portalStyles.scrollText}>See full map</Text>
        </TouchableOpacity>
      </View>
        </>
      )}

      {isInLowerHalf && (
        <>
      <TouchableOpacity
        onPress={() => {
          if (!progress.expectationsCompleted) {
            onNavigateToLockedStep();
          } else {
            handleReflectComplete();
          }
        }}
        style={{
          position: 'absolute',
          bottom: SCREEN_HEIGHT * 0.24,
          right: SCREEN_WIDTH * 0.1,
          zIndex: 100,
        }}
      >
        <Image
          source={reflectwhite}
          style={{
            width: SCREEN_WIDTH * 0.35,
            height: SCREEN_WIDTH * 0.27,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>

      {!progress.expectationsCompleted ? (
        <TouchableOpacity
          onPress={onNavigateToLockedStep}
          style={{
            position: 'absolute',
            bottom: SCREEN_HEIGHT * 0.19,
            right: SCREEN_WIDTH * 0.16,
            zIndex: 100,
          }}
        >
          <Image
            source={lock}
            style={{
              width: SCREEN_WIDTH * 0.18,
              height: SCREEN_WIDTH * 0.18,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleReflectComplete}
          style={{
            position: 'absolute',
            bottom: SCREEN_HEIGHT * 0.18,
            right: SCREEN_WIDTH * 0.18,
            zIndex: 100,
          }}
        >
          {renderStepIcon(progress.reflectCompleted, four, 0.18)}
        </TouchableOpacity>
      )}

      <View style={{ position: 'absolute', top: 99, alignSelf: 'center', zIndex: 1000 }}>
        <TouchableOpacity onPress={scrollToUpperHalf} style={[portalStyles.scrollButton, {top: 15}]}>
          <ChevronUp size={16} color="white" />
          <Text style={portalStyles.scrollText}>Back to Top</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 30,
          alignSelf: 'center',
          backgroundColor: palette.slate,
          paddingVertical: 14,
          paddingHorizontal: 32,
          borderRadius: 30,
          zIndex: 10,
          shadowColor: palette.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
          opacity: !progress.expectationsCompleted ? 0.4 : 1,
        }}
        onPress={() => {
          if (!progress.expectationsCompleted) {
            onNavigateToLockedStep();
          } else {
            setShowCompleteModal(true);
          }
        }}
      >
        <Text style={{ ...portalStyles.continueButtonText, color: palette.cream }}>Complete</Text>
      </TouchableOpacity>
        </>
      )}
      
      {/* Complete Modal */}
      {showCompleteModal && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
          }}
        >
          <View
            style={{
              backgroundColor: palette.cream,
              borderRadius: 20,
              padding: 32,
              alignItems: 'center',
              width: SCREEN_WIDTH * 0.8,
              shadowColor: palette.shadow,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setShowCompleteModal(false);
                if (onComplete) {
                  onComplete();
                }
              }}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 10,
              }}
            >
              <X size={28} color={palette.slate} />
            </TouchableOpacity>
            
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: palette.slate,
                marginTop: 8,
                marginBottom: 16,
                textAlign: 'center',
                fontFamily: "../../assets/fonts/AbhayaLibre-Regular.ttf",
              }}
            >
              Conversation Complete!
            </Text>
            
            <Text
              style={{
                fontSize: 16,
                color: palette.slate,
                textAlign: 'center',
                opacity: 0.8,
                fontFamily: "../../assets/fonts/AbhayaLibre-Regular.ttf",
              }}
            >
              Great work on your conversation
            </Text>
          </View>
        </View>
      )}

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
          }}
        >
          <View
            style={{
              backgroundColor: palette.cream,
              borderRadius: 20,
              padding: 32,
              alignItems: 'center',
              width: SCREEN_WIDTH * 0.85,
              shadowColor: palette.shadow,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <TouchableOpacity
              onPress={() => setShowResetModal(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 10,
              }}
            >
              <X size={28} color={palette.slate} />
            </TouchableOpacity>
            
            <RotateCcw size={48} color={palette.slate} style={{ marginBottom: 16 }} />
            
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: palette.slate,
                marginBottom: 12,
                textAlign: 'center',
              }}
            >
              Reset Portal Progress?
            </Text>
            
            <Text
              style={{
                fontSize: 16,
                color: palette.darkBrown,
                textAlign: 'center',
                marginBottom: 24,
                lineHeight: 24,
              }}
            >
              This will reset all progress for this portal, including completed steps. This action cannot be undone.
            </Text>

            <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
              <TouchableOpacity
                onPress={() => setShowResetModal(false)}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  paddingVertical: 14,
                  paddingHorizontal: 24,
                  borderRadius: 30,
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: palette.slate,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: palette.slate,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleResetProgress}
                style={{
                  flex: 1,
                  backgroundColor: palette.slate,
                  paddingVertical: 14,
                  paddingHorizontal: 24,
                  borderRadius: 30,
                  alignItems: 'center',
                  shadowColor: palette.shadow,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: palette.cream,
                  }}
                >
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      
      {/* Expectations Review Modal */}
      <ExpectationsReviewModal
        portalId={portalId}
        visible={showReviewModal}
        onClose={() => setShowReviewModal(false)}
      />
    </ImageBackground>
  );
};