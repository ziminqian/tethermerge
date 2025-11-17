import { StyleSheet } from 'react-native';
import { palette } from './palette';
import theme from './theme';

// Global stylesheet for Tether app using extracted palette
const globalStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: palette.cream,

  },
  screen: {
    flex: 1,
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContent: {
    flex: 1,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Login/Auth Styles
  loginContainer: {
    flex: 1,
    backgroundColor: palette.cream,
  },
  loginScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  loginLogoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  loginLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: palette.slate,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutLogo:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: theme.button,
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
  },
  titleLarge: {
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
    color: palette.beige,
    marginBottom: 8,
  },
  titleSubtitleItalic: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: palette.lightBrown,
  },
  imagePlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: palette.mutedBrown,
    marginBottom: 8,
  },
  areaCodeContainer: {
    paddingRight: 8,
    borderRightWidth: 1,
    borderRightColor: palette.lightGray,
    marginRight: 8,
  },
  areaCodeText: {
    fontSize: 16,
    color: palette.darkBrown,
  },
  loginInputPassword: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 16,
    fontSize: 16,
    color: palette.darkBrown,
  },
  signUpLinkContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  signUpLink: {
    fontSize: 16,
    color: palette.mediumBrown,
    textDecorationLine: 'underline',
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: palette.mediumBrown,
    marginBottom: 4,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 16,
    color: palette.lightBrown,
    textAlign: 'center',
    opacity: 0.8,
  },
  loginInputContainer: {
    marginBottom: 16,
  },
  loginInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.lightBeige,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: palette.lightGray,
  },
  loginInputIcon: {
    marginRight: 12,
  },
  loginInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: palette.darkBrown,
  },
  loginButton: {
    backgroundColor: palette.slate,
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 12,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 16,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: palette.cream,
    fontSize: 17,
    fontWeight: '700',
  },
  loginButtonTextSecondary: {
    color: palette.mediumBrown,
    fontSize: 17,
    fontWeight: '700',
  },
  loginFooterText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 13,
    color: palette.mutedBrown,
    opacity: 0.6,
    lineHeight: 20,
  },

  // Typography
  logo: {
    fontSize: 80,
    textAlign: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
    color: palette.mediumBrown,
    marginBottom: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '600',
    color: palette.mediumBrown,
    marginBottom: 24,
  },
  subheading: {
    fontSize: 22,
    fontWeight: '600',
    color: palette.mediumBrown,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: palette.lightBrown,
    lineHeight: 26,
  },
  body: {
    fontSize: 17,
    color: palette.darkBrown,
    lineHeight: 24,
  },
  bodySecondary: {
    fontSize: 17,
    color: palette.lightBrown,
    lineHeight: 22,
  },
  caption: {
    fontSize: 13,
    color: palette.mutedBrown,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: palette.mediumBrown,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: palette.lightBrown,
  },

  // Buttons
  button: {
    backgroundColor: palette.slate,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonSecondary: {
    backgroundColor: palette.teal,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: palette.slate,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonSmall: {
    padding: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: palette.cream,
    fontSize: 18,
    fontWeight: '600',
  },
  buttonTextOutline: {
    color: palette.slate,
    fontSize: 18,
    fontWeight: '600',
  },
  buttonTextSmall: {
    fontSize: 15,
  },

  // Navigation
  backButton: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 17,
    color: palette.slate,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: palette.cream,
    borderTopWidth: 1,
    paddingBottom: 20,
    borderTopColor: palette.divider,
  },
  navButton: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
  },

  // Cards
  card: {
    backgroundColor: palette.lightBeige,
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLarge: {
    backgroundColor: palette.lightBeige,
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardElevated: {
    backgroundColor: palette.lightBeige,
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },

  // Contact Card
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.lightBeige,
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: palette.slate,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarLarge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: palette.slate,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: palette.cream,
    fontSize: 18,
    fontWeight: '600',
  },
  avatarTextLarge: {
    color: palette.cream,
    fontSize: 24,
    fontWeight: '600',
  },
  contactName: {
    fontSize: 17,
    color: palette.darkBrown,
    fontWeight: '500',
  },

  // Input Fields
  input: {
    backgroundColor: palette.lightBeige,
    borderRadius: 16,
    padding: 16,
    fontSize: 17,
    color: palette.darkBrown,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: palette.lightGray,
  },
  inputMultiline: {
    backgroundColor: palette.lightBeige,
    borderRadius: 16,
    padding: 16,
    fontSize: 17,
    color: palette.darkBrown,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: palette.lightGray,
  },

  // Tabs
  tabs: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: palette.lightBeige,
    borderRadius: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: palette.beige,
  },
  tabText: {
    fontSize: 15,
    color: palette.mutedBrown,
  },
  tabTextActive: {
    fontSize: 15,
    color: palette.slate,
    fontWeight: '600',
  },

  // Message Box
  messageBox: {
    backgroundColor: palette.lightBeige,
    padding: 24,
    borderRadius: 16,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  message: {
    fontSize: 17,
    color: palette.darkBrown,
    lineHeight: 24,
  },

  // Phase Cards
  phaseCard: {
    backgroundColor: palette.lightBeige,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  phaseTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: palette.mediumBrown,
    marginBottom: 16,
    textAlign: 'center',
  },
  phaseText: {
    fontSize: 17,
    color: palette.lightBrown,
    textAlign: 'center',
    lineHeight: 24,
  },

  // Lists
  list: {
    flex: 1,
  },
  listItem: {
    backgroundColor: palette.lightBeige,
    padding: 16,
    borderRadius: 12,
    marginBottom: 4,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  listItemText: {
    fontSize: 17,
    color: palette.darkBrown,
  },

  // Dividers
  divider: {
    height: 1,
    backgroundColor: palette.divider,
    marginVertical: 16,
  },
  dividerThick: {
    height: 2,
    backgroundColor: palette.divider,
    marginVertical: 24,
  },

  // Spacing Utilities
  marginBottomSm: {
    marginBottom: 8,
  },
  marginBottomMd: {
    marginBottom: 16,
  },
  marginBottomLg: {
    marginBottom: 24,
  },
  marginTopSm: {
    marginTop: 8,
  },
  marginTopMd: {
    marginTop: 16,
  },
  marginTopLg: {
    marginTop: 24,
  },
  paddingMd: {
    padding: 16,
  },
  paddingLg: {
    padding: 24,
  },

  // Alignment Utilities
  centerAlign: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Status/Alert Cards
  successCard: {
    backgroundColor: palette.sage + '20',
    padding: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: palette.sage,
    marginBottom: 16,
  },
  warningCard: {
    backgroundColor: palette.coral + '20',
    padding: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: palette.coral,
    marginBottom: 16,
  },
  errorCard: {
    backgroundColor: palette.coral + '30',
    padding: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: palette.coral,
    marginBottom: 16,
  },
  accentCard: {
    backgroundColor: palette.teal + '20',
    padding: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: palette.teal,
    marginBottom: 16,
  },
});

export default globalStyles;