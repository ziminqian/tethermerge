import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  SafeAreaView, 
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from '../styles/styles';
import { palette } from '../styles/palette';
import useSession from '../utils/useSession';

const TEST_PHONE = '1234567890';            // test credentials
const TEST_PASSWORD = 'test';

export default function Title () {
  const { signIn } = useSession();
  const [areaCode, setAreaCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      Alert.alert('Error', 'Please enter both phone number and password');
      return;
    }

    setLoading(true);
    
    setTimeout(async () => {
      // Check against hardcoded credentials
      if (phoneNumber === TEST_PHONE && password === TEST_PASSWORD) {
        //Alert.alert('Success', 'Login successful!');
        await signIn(areaCode + phoneNumber);
      } else {
        Alert.alert('Error', 'Invalid phone number or password', [
          { text: 'OK' }
        ]);
      }
      setLoading(false);
    }, 1000);

    // await supabase.auth.signInWithPassword({ phone: areaCode + phoneNumber, password });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        
          <View style={styles.loginLogoContainer}>
            <Text style={styles.titleLarge}>Tether</Text>
            <Text style={styles.titleSubtitleItalic}>Safe Space</Text>
            <Text style={styles.titleSubtitleItalic}>For Difficult Conversations</Text>
          </View>

          <View style={styles.imagePlaceholder}>
            <Text>Change this later :p</Text>
            <Text>Test credentials are: phone# 1234567890, pw test</Text>
          </View>

          <View style={styles.loginInputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.loginInputWrapper}>
              <View style={styles.areaCodeContainer}>
                <Text style={styles.areaCodeText}>{areaCode} -</Text>
              </View>
              <TextInput
                placeholder=""
                placeholderTextColor={palette.mutedBrown}
                style={styles.loginInput}
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                editable={!loading}
              />
            </View>
          </View>

          <View style={styles.loginInputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.loginInputWrapper}>
              <TextInput
                placeholder="..."
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

          <Pressable
            style={[
              styles.loginButton,
              styles.loginButtonSpacing,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={palette.cream} />
            ) : (
              <Text style={styles.loginButtonTextPrimary}>Login</Text>
            )}
          </Pressable>

          <View style={styles.signUpLinkContainer}>
            <Text style={styles.signUpLink}>New user? Sign up</Text>
          </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};