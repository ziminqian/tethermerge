import React from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import { palette } from './palette';

const chosenFont = "../assets/fonts/AbhayaLibre-Bold.ttf" // or "Avenir"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const resourceStyles = StyleSheet.create({
resourcesContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  resourceCard: {
    backgroundColor: palette.cream + '80',
    borderRadius: 16,
    padding: 9,
    width: SCREEN_WIDTH * 0.41,
    alignItems: 'center',
  },
  resourceCard2: {
    backgroundColor: palette.cream + '95',
    borderRadius: 16,
    padding: 9,
    width: SCREEN_WIDTH * 0.41,
    alignItems: 'center',
  },
  resourceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  resourceIconText: {
    fontSize: 24,
  },
  resourceTitle: {
    fontSize: 16,
    fontFamily: chosenFont,
    color: palette.slate,
    textAlign: 'center',
    fontWeight: '500',
  },
  resourcesTitle: {
    fontSize: 20,
    fontFamily: chosenFont,
    color: palette.slate,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 10,
  },
    resourcesSection: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: "center",
  },
  resourceSubtitle: {
    fontSize: 15,
    marginTop: 4,
    fontFamily: chosenFont,
    color: palette.slate + 'AA',
    textAlign: 'center',
    lineHeight: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    maxHeight: '80%',
    backgroundColor: palette.cream,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: palette.beige,
  },
  modalTitle: {
    fontFamily: chosenFont,
    fontSize: 24,
    fontWeight: '700',
    color: palette.slate,
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    marginBottom: 15,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingHorizontal: 5,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.teal,
    marginRight: 12,
    marginTop: 6,
  },
  contentText: {
    flex: 1,
    fontFamily: chosenFont,
    fontSize: 16,
    lineHeight: 24,
    color: palette.darkBrown,
  },
  closeButton: {
    backgroundColor: palette.slate,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: palette.cream,
    fontFamily: chosenFont,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default resourceStyles;