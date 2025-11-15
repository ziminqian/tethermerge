import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider, useTheme } from "./styles/themeContext"
import styles from './styles/styles';

/*
import Footer from "./pages/components/Footer"
import Explore from './pages/Explore';
import Boards from './pages/Boards';
import Profile from './pages/Profile';*/

function AppContent() {
  const [activeTab, setActiveTab] = useState<'explore' | 'boards' | 'profile'>('explore');
  const { theme } = useTheme();
  const styles = globalStyles(theme);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log("CURRENT SESSION:", data.session);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.page}>
        {activeTab === "explore" && <Explore />}
        {activeTab === "boards" && <Boards />}
        {activeTab === "profile" && <Profile />}
      </View>
      <View style={{flex: 2}}>
        <Footer activeTab={activeTab} setActiveTab={setActiveTab}/>
      </View>
    </View>
  );
}

export default function App() {
  return (
     <ThemeProvider>
      <AuthGate>
        <ProfileProvider>
          <LikedBooksProvider>
            <AppContent />
          </LikedBooksProvider>
        </ProfileProvider>
      </AuthGate>
    </ThemeProvider>
  );
}