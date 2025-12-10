import React, { useState, useEffect, useRef } from 'react';
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
  Modal,
  Animated
} from 'react-native';
import styles from '../styles/styles';
import { UserPlus, ChevronLeft, X } from 'lucide-react-native';
import { palette } from '../styles/palette';
import theme from '../styles/theme';
import useSession from '../utils/useSession';

const back = require('../assets/backgrounds/light_ombre.png');

interface SignupProps {
  onBack: () => void;
  onSignupSuccess?: () => void;
}

export default function Signup({ onBack, onSignupSuccess }: SignupProps) {
  const { signUp } = useSession();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (username.length < 3) {
      Alert.alert('Error', 'Username must be at least 3 characters');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    try {
      await signUp(email.toLowerCase().trim(), password, username.trim());
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error('Signup error:', error);
      Alert.alert('Error', error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    if (onSignupSuccess) {
      onSignupSuccess();
    } else {
      onBack();
    }
  };

  return (
    <ImageBackground 
      source={back}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode='cover'
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={[styles.heading, { marginTop: 10 }]}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <ChevronLeft size={40} color={palette.slate} />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.loginLogoContainer}>
              <Text style={styles.titleLarge}>Join Tether</Text>
              <Text style={styles.titleSubtitleItalic}>Sign up to Create Your Account</Text>
            </View>

            <View style={styles.imagePlaceholder}>
              <Image 
                source={require("../assets/frogs/cute_frogx1.png")} 
                style={{width: 120, height: 140}} 
              />
              <Text style={styles.userGraphicLabel}>This could be you</Text>
            </View>

            <View style={styles.loginInputContainer}>
              <View style={styles.loginInputWrapper}>
                <TextInput
                  placeholder="username"
                  placeholderTextColor={palette.mutedBrown}
                  style={styles.loginInputPassword}
                  value={username}
                  onChangeText={setUsername}
                  editable={!loading}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </View>
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
                  returnKeyType="next"
                />
              </View>
            </View>

            <View style={styles.loginInputContainer}>
              <View style={styles.loginInputWrapper}>
                <TextInput
                  placeholder="confirm password"
                  placeholderTextColor={palette.mutedBrown}
                  secureTextEntry
                  autoCapitalize="none"
                  style={styles.loginInputPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  editable={!loading}
                  returnKeyType="go"
                  onSubmitEditing={handleSignup}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={theme.buttonicon} />
              ) : (
                <>
                  <UserPlus size={20} color={theme.buttonicon} />
                  <Text style={styles.loginButtonText}>Sign Up</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        </Animated.View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={showSuccessModal}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.successModal}>
              <TouchableOpacity 
                onPress={handleCloseModal} 
                style={styles.modalCloseButton}
              >
                <X size={24} color={palette.darkBrown} />
              </TouchableOpacity>
              <View style={styles.popup}>
                <Text style={styles.successText}>Account Created</Text>
                <Text style={styles.titleSubtitleItalic}>
                  Welcome to Tether!
                </Text>
                <Image 
                  source={require("../assets/other/hands.png")} 
                  style={{ height: 200, width: 300, transform: [{ translateY: 10 }] }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}