import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Pressable, 
  Alert, 
  TouchableOpacity, 
  ActivityIndicator, 
  SafeAreaView, 
  ImageBackground,
  ScrollView,
  TextInput,
  Modal,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import theme from '../styles/theme';
import { palette } from '../styles/palette';
import { LogOut, Edit2, X, Check } from 'lucide-react-native';
import useSession from '../utils/useSession';

const PROFILE_KEY = '@tether_profile';

interface UserProfile {
  username: string;
  bio: string;
  iconColor: string;
}

interface ProfileProps {
  onBack: () => void;
}

const ICON_COLORS = [
  { name: 'Slate', color: palette.slate },
  { name: 'Teal', color: palette.teal },
  { name: 'Sage', color: palette.sage },
  { name: 'Coral', color: palette.coral },
  { name: 'Brown', color: palette.darkBrown },
  { name: 'Medium Brown', color: palette.mediumBrown },
];

export const Profile = ({ onBack }: ProfileProps) => {
  const { signOut, session } = useSession();
  const [loggingOut, setLoggingOut] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    username: 'Test User',
    bio: '',
    iconColor: palette.slate,
  });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [editBio, setEditBio] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  // Load profile on mount
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const storedProfile = await AsyncStorage.getItem(PROFILE_KEY);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const saveProfile = async (newProfile: UserProfile) => {
    try {
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
      setProfile(newProfile);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleEditPress = () => {
    setEditUsername(profile.username);
    setEditBio(profile.bio);
    setSelectedColor(profile.iconColor);
    setEditModalVisible(true);
  };

  const handleSaveProfile = async () => {
    const updatedProfile = {
      username: editUsername || 'Test User',
      bio: editBio,
      iconColor: selectedColor,
    };
    await saveProfile(updatedProfile);
    setEditModalVisible(false);
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            setLoggingOut(true);
            try {
              await signOut();
            } catch (e) {
              console.error('Logout error:', e);
            } finally {
              setLoggingOut(false);
            }
          }
        }
      ]
    );
  };

  return (
    <ImageBackground 
      source={require("../assets/backgrounds/light_ombre.png")}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode='cover'
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.screen}>
            {/* Profile Header */}
            <View style={styles.profileHeader}>
              <View style={styles.profileAvatarRow}>
                {/* Custom colored icon */}
                <View style={[styles.profileAvatar, { backgroundColor: palette.cream, borderColor: profile.iconColor }]}>
                  <Image 
                    source={require('../assets/other/cute_frog.png')}
                    style={[styles.profileAvatarImage, {transform: [{ translateX: 3}]}]}
                    tintColor={profile.iconColor}
                  />
                </View>

                {/* Username and Bio */}
                <View style={styles.profileInfo}>
                  <View style={styles.profileNameRow}>
                    <Text style={styles.profileUsername}>{profile.username}</Text>
                    <TouchableOpacity onPress={handleEditPress} style={styles.editButton}>
                      <Edit2 size={18} color={palette.cream} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.profileBio}>
                    {profile.bio || 'Tap edit to add a bio!'}
                  </Text>
                  <Text style={styles.profilePhone}>
                    {session?.user?.phone || 'No phone'}
                  </Text>
                </View>
              </View>
              <View style={styles.centeredContent}>
                <TouchableOpacity
                  onPress={handleLogout}
                  disabled={loggingOut}
                  style={styles.loginButton}
                >
                  {loggingOut ? (
                    <ActivityIndicator size="small" color={theme.buttontext} />
                  ) : (
                    <>
                      <LogOut size={20} color={theme.buttontext} />
                      <Text style={[styles.loginButtonText, { fontSize: 16, fontWeight: '600' }]}>
                        Log Out
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Edit Profile Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Edit Profile</Text>
                <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                  <X size={28} color={palette.darkBrown} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Username Input */}
                <Text style={styles.modalLabel}>Username</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editUsername}
                  onChangeText={setEditUsername}
                  placeholder="Enter username"
                  placeholderTextColor={palette.mutedBrown}
                />

                {/* Bio Input */}
                <Text style={styles.modalLabel}>Bio</Text>
                <TextInput
                  style={[styles.modalInput, styles.modalInputMultiline]}
                  value={editBio}
                  onChangeText={setEditBio}
                  placeholder="Tell us about yourself..."
                  placeholderTextColor={palette.mutedBrown}
                  multiline
                  numberOfLines={4}
                />

                {/* Icon Color Picker */}
                <Text style={styles.modalLabel}>Icon Color</Text>
                <View style={styles.colorPicker}>
                  {ICON_COLORS.map((colorOption) => (
                    <TouchableOpacity
                      key={colorOption.color}
                      onPress={() => setSelectedColor(colorOption.color)}
                      style={[
                        styles.colorOption,
                        { backgroundColor: colorOption.color },
                        selectedColor === colorOption.color && styles.colorOptionSelected
                      ]}
                    >
                      {selectedColor === colorOption.color && (
                        <Check size={24} color={palette.cream} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity onPress={handleSaveProfile} style={styles.saveButton}>
                  <Check size={22} color={palette.cream} />
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};