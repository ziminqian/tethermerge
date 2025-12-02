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
  StyleSheet
} from 'react-native';
import styles from '../styles/styles';
import { LogIn } from 'lucide-react-native';
import { palette } from '../styles/palette';
import useSession from '../utils/useSession';
import theme from '../styles/theme';

const TEST_PHONE = '1234567890';
const TEST_PASSWORD = 'test';

interface TitleProps {
  onSignup?: () => void;
  onLoginSuccess?: () => void;
}

export default function Title({ onSignup, onLoginSuccess }: TitleProps = {}) {
  const { signIn } = useSession();
  const [areaCode, setAreaCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef<TextInput | null>(null);

  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      Alert.alert('Error', 'Please enter both phone number and password');
      return;
    }

    setLoading(true);
    
    setTimeout(async () => {
      if (phoneNumber === TEST_PHONE && password === TEST_PASSWORD) {
        await signIn(areaCode + phoneNumber);
        // Call onLoginSuccess callback if provided
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        Alert.alert('Error', 'Invalid phone number or password');
      }
      setLoading(false);
    }, 1000);
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
              <Text style={styles.titleSubtitleItalic}>Test credentials are: phone# 1234567890, pw test</Text>
            </View>

            <View style={styles.loginInputContainer}>
              <View style={styles.loginInputWrapper}>
                <View style={styles.areaCodeContainer}>
                  <Text style={styles.areaCodeText}>{areaCode} -</Text>
                </View>
                <TextInput
                  ref = {passwordRef}
                  placeholder="phone number"
                  placeholderTextColor={palette.mutedBrown}
                  style={styles.loginInput}
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  editable={!loading}
                  blurOnSubmit={false}
                />
              </View>
            </View>

            <View style={styles.loginInputContainer}>
              <View style={styles.loginInputWrapper}>
                <TextInput
                  placeholder="password"
                  placeholderTextColor={palette.mutedBrown}
                  secureTextEntry
                  autoCapitalize="none"
                  style={styles.loginInputPassword}
                  value={password}
                  onChangeText={setPassword}
                  editable={!loading}
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
