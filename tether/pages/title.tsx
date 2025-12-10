import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
  Platform,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import styles from '../styles/styles';
import { LogIn } from 'lucide-react-native';
import { palette } from '../styles/palette';
import useSession from '../utils/useSession';
import theme from '../styles/theme';

interface TitleProps {
  onSignup?: () => void;
  onLoginSuccess?: () => void;
}

export default function Title({ onSignup, onLoginSuccess }: TitleProps = {}) {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef<TextInput | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    try {
      await signIn(email.toLowerCase().trim(), password);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground 
      source={require("../assets/backgrounds/light_ombre.png")}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode='cover'
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: "center", alignItems: "center"  }}
        >
            <View style={styles.loginLogoContainer}>
              <Text style={styles.titleLarge}>Tether</Text>
              <Text style={styles.titleSubtitleItalic}>A Safe Space</Text>
              <Text style={styles.titleSubtitleItalic}>For Difficult Conversations</Text>
            </View>

            <View style={styles.imagePlaceholder}>
              <Image source={require("../assets/other/hands.png")} style={styles.image}></Image>
            </View>

            <View style={styles.loginInputContainer}>
              <View style={styles.loginInputWrapper}>
                <TextInput
                  placeholder="email"
                  placeholderTextColor={palette.mutedBrown}
                  style={styles.loginInputPassword}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                  editable={!loading}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  blurOnSubmit={false}
                />
              </View>
            </View>

            <View style={styles.loginInputContainer}>
              <View style={styles.loginInputWrapper}>
                <TextInput
                  ref={passwordRef}
                  placeholder="password"
                  placeholderTextColor={palette.mutedBrown}
                  secureTextEntry
                  autoCapitalize="none"
                  style={styles.loginInputPassword}
                  value={password}
                  onChangeText={setPassword}
                  editable={!loading}
                  returnKeyType="go"
                  onSubmitEditing={handleLogin}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={theme.buttonicon} />
              ) : (
                <>
                  <LogIn size={20} color={theme.buttonicon} />
                  <Text style={styles.loginButtonText}>Login</Text>
                </>
              )}
            </TouchableOpacity>

            <View style={styles.signUpLinkContainer}>
              <TouchableOpacity onPress={onSignup}>
                <Text style={styles.signUpLink}>New user? Sign up</Text>
              </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}