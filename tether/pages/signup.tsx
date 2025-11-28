import React, { useState } from 'react';
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
  Modal
} from 'react-native';
import styles from '../styles/styles';
import { UserPlus, ChevronLeft, X } from 'lucide-react-native';
import { palette } from '../styles/palette';
import theme from '../styles/theme';

const back = require('../assets/onboard1/backgroundonboard1.png');

interface SignupProps {
  onBack: () => void;
  onSignupSuccess?: () => void;
}

export default function Signup({ onBack, onSignupSuccess }: SignupProps) {
  const [areaCode, setAreaCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSignup = async () => {
    if (!phoneNumber || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
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
    
    // Simulate signup process
    setTimeout(() => {
      setLoading(false);
      setShowSuccessModal(true);
    }, 1000);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Navigate to onboard3 after successful signup
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          {/* Back Button */}
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
                <View style={styles.areaCodeContainer}>
                  <Text style={styles.areaCodeText}>{areaCode} -</Text>
                </View>
                <TextInput
                  placeholder="phone number"
                  placeholderTextColor={palette.mutedBrown}
                  style={styles.loginInput}
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  editable={!loading}
                  returnKeyType= "next"
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

        {/* Success Modal */}
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