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
  ScrollView
} from 'react-native';
import styles from '../styles/styles';
import { palette } from '../styles/palette';


export default function Title () {
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
    // Add authentication logic here
    // await supabase.auth.signInWithPassword({ phone: areaCode + phoneNumber, password });
    
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.loginScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <View style={styles.loginLogoContainer}>
            <Text style={styles.titleLarge}>Tether</Text>
            <Text style={styles.titleSubtitleItalic}>Safe Space</Text>
            <Text style={styles.titleSubtitleItalic}>For Difficult Conversations</Text>
          </View>

          {/* Center Image Placeholder */}
          <View style={styles.imagePlaceholder}>
            {/* Keep blank for image */}
          </View>

          {/* Phone Number Input */}
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

          {/* Password Input */}
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

          {/* Login Button */}
          <Pressable
            style={[
              styles.loginButtonPrimary,
              styles.loginButtonSpacing,
              loading && styles.loginButtonDisabled
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

          {/* Sign Up Link */}
          <View style={styles.signUpLinkContainer}>
            <Text style={styles.signUpLink}>New user? Sign up</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};