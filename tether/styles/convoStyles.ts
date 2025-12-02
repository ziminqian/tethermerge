import React from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import { palette } from './palette';

const chosenFont = "../assets/fonts/AbhayaLibre-Bold.ttf" // or "Avenir"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const convoStyles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.05,
    left: SCREEN_WIDTH * 0.05,
    zIndex: 10,
  },
  container: {
    flex: 1,
    paddingTop: SCREEN_HEIGHT * 0.06,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 20,
    fontFamily: chosenFont,
    color: palette.slate,
    margin: 8,
  },
  timerText: {
    fontSize: 30,
    fontFamily: chosenFont,
    color: palette.slate,
    fontWeight: '800',
    marginBottom: 20,
  },
  avatarsContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatarLetter: {
    fontSize: 48,
    color: palette.cream,
    fontWeight: '700',
  },
  nameText: {
    fontSize: 24,
    fontFamily: chosenFont,
    color: palette.slate,
    fontWeight: '600',
    marginBottom: 8,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.teal,
  },
  statusLabel: {
    fontSize: 14,
    fontFamily: chosenFont,
    color: palette.teal,
  },
  dividerLine: {
    width: 2,
    height: 60,
    backgroundColor: palette.cream + '40',
  },
  pauseHintText: {
    fontSize: 15,
    fontFamily: chosenFont,
    fontStyle: "italic",
    color: palette.teal,
    fontWeight: "400",
    margin: 8,
    marginTop: 20,
  },
  pauseButton: {
    backgroundColor: palette.slate,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: SCREEN_WIDTH * 0.85,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  pauseButtonText: {
    fontSize: 18,
    fontFamily: chosenFont,
    color: palette.cream,
    fontWeight: '700',
  },
  container_pause: {
    flex: 1,
    paddingTop: SCREEN_HEIGHT * 0.05,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  statusText_pause: {
    fontSize: 18,
    fontFamily: chosenFont,
    color: palette.slate,
    marginBottom: 30,
    marginTop: 20,
    fontWeight: "900"
  },
  breatheCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: palette.slate,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: palette.slate,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  breatheText: {
    fontSize: 28,
    fontFamily: chosenFont,
    color: palette.cream,
    fontWeight: '600',
  },
  timerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  timerLabel: {
    fontSize: 16,
    fontFamily: chosenFont,
    color: palette.lightBrown,
    marginBottom: 8,
  },
  timerText_pause: {
    fontSize: 48,
    fontFamily: chosenFont,
    color: palette.lightBrown,
    fontWeight: '700',
    marginBottom: 12,
  },
  breatheInstruction: {
    fontSize: 15,
    fontFamily: chosenFont,
    color: palette.lightBrown + 'CC',
    fontStyle: 'italic',
  },
  resumeButton: {
    backgroundColor: palette.slate,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: SCREEN_WIDTH * 0.85,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  resumeButtonText: {
    fontSize: 16,
    fontFamily: chosenFont,
    color: palette.cream,
    fontWeight: '700',
  },
  callingAvatarContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 60,
  height: 200,
  width: 200,
  alignSelf: 'center',
},

callingAvatar: {
  width: 150,
  height: 150,
  borderRadius: 75,
  backgroundColor: palette.cream,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: palette.shadow,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
},

callingRing: {
  position: 'absolute',
  width: 150,
  height: 150,
  borderRadius: 75,
  borderWidth: 3,
  borderColor: palette.teal,
},

callingNameText: {
  fontSize: 32,
  fontWeight: '700',
  color: palette.slate,
  textAlign: 'center',
  marginBottom: 8,
},

callingStatusText: {
  fontSize: 18,
  color: palette.mutedBrown,
  textAlign: 'center',
  marginBottom: 40,
},
endCallButton: {
  backgroundColor: palette.coral,
  paddingVertical: 16,
  paddingHorizontal: 32,
  borderRadius: 30,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
  marginTop: 20,
},
endCallButtonText: {
  color: palette.cream,
  fontSize: 18,
  fontWeight: '700',
},

modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},

confirmModalContent: {
  width: '85%',
  backgroundColor: palette.cream,
  borderRadius: 20,
  padding: 30,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
},

confirmModalTitle: {
  fontSize: 24,
  fontWeight: '700',
  color: palette.slate,
  textAlign: 'center',
  marginBottom: 12,
},

confirmModalText: {
  fontSize: 16,
  color: palette.darkBrown,
  textAlign: 'center',
  lineHeight: 24,
  marginBottom: 30,
},

confirmModalButtons: {
  flexDirection: 'row',
  gap: 12,
  width: '100%',
},

confirmModalButtonCancel: {
  flex: 1,
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: palette.slate,
  alignItems: 'center',
},

confirmModalButtonCancelText: {
  color: palette.slate,
  fontSize: 16,
  fontWeight: '700',
},

confirmModalButtonConfirm: {
  flex: 1,
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 12,
  backgroundColor: palette.teal,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  shadowColor: palette.shadow,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 4,
},

confirmModalButtonConfirmText: {
  color: palette.cream,
  fontSize: 16,
  fontWeight: '700',
},
});

export default convoStyles;