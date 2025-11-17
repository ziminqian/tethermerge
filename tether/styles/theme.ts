import { palette } from "./palette";

const theme = {
  // bg
  bg: palette.cream,              
  bgSecondary: palette.lightBeige, 
  bgTertiary: palette.beige,      
  
  // text
  heading: palette.mediumBrown,   
  text: palette.darkBrown,       
  textSecondary: palette.lightBrown, 
  textMuted: palette.mutedBrown,

  //button
  button: palette.slate,  
  buttontext: palette.cream,
  
  // footer
  pressed: palette.sage,
  notpressed: palette.slate,

  // ui
  primary: palette.slate,  
  secondary: palette.teal,    
  accent: palette.sage,
  border: palette.lightGray,    
  divider: palette.divider, 
  
  // navigation
  navigation: palette.slate,     
  navigationInactive: palette.mutedBrown,
  
  // shadows
  shadows: {
    shadowColor: palette.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  title: {
    fontSize: 34,
    fontWeight: '700' as const,
    lineHeight: 41,
  },
  heading: {
    fontSize: 28,
    fontWeight: '600' as const,
    lineHeight: 34,
  },
  subheading: {
    fontSize: 22,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 17,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export default theme;