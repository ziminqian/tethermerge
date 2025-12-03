import React, { useState, useEffect, useRef } from 'react';
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
  Image,
  Animated
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import resourceStyles from '../styles/resourceStyles';
import theme from '../styles/theme';
import { palette } from '../styles/palette';
import { LogOut, Edit2, X, Check, Lightbulb, MessageCircleHeart, Brain, ShieldBan, Goal, Snail, CircleQuestionMark } from 'lucide-react-native';
import useSession from '../utils/useSession';
import { ResourceModal, ResourceType } from './components/Resources';


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
  { name: 'Beige', color: palette.beige },
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ResourceType>('conversation-starters');

  // Animation values for edit modal
  const editFadeAnim = useRef(new Animated.Value(0)).current;
  const editScaleAnim = useRef(new Animated.Value(0.9)).current;

  // Load profile on mount
  useEffect(() => {
    loadProfile();
  }, []);

  // Animate edit modal
  useEffect(() => {
    if (editModalVisible) {
      // Reset values before animating in
      editFadeAnim.setValue(0);
      editScaleAnim.setValue(0.9);
      
      // Fade in
      Animated.parallel([
        Animated.timing(editFadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(editScaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Fade out
      Animated.parallel([
        Animated.timing(editFadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(editScaleAnim, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [editModalVisible]);

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

  const handleResourcePress = (resourceType: ResourceType) => {
    setSelectedResource(resourceType);
    setModalVisible(true);
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
      source= {require("../assets/backgrounds/light_ombre.png")}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode='cover'
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.screen}>
            <View style={styles.profileHeader}>
              <View style={styles.profileAvatarRow}>
                <View style={[styles.profileAvatar, ]}>
                  <Image 
                    source={require('../assets/frogs/cute_frog_body.png')}
                    style={[styles.profileAvatarImage,{height:55}, {transform: [{ translateY: 9}, {translateX: -8}]}]}
                    resizeMode="contain"
                    tintColor={profile.iconColor}
                  />
                  <Image 
                    source={require('../assets/frogs/cute_frog_outline.png')}
                    style={[styles.profileAvatarImage, { position: 'absolute' }, {transform: [{ translateY: 9}, {translateX: -8}]}]}
                    resizeMode="contain"
                  />
                  <Image 
                    source={require('../assets/frogs/cute_frog_cheeks.png')}
                    style={[styles.profileAvatarImage, { position: 'absolute'}, {transform: [{ translateY: 6}, {translateX: -4}]}]}
                  />
                </View>
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
          <View style={resourceStyles.resourcesSection}>
          <Text style={resourceStyles.resourcesTitle}>Conversation Resources</Text>
          
          <View style={resourceStyles.resourcesGrid}>
            
            <TouchableOpacity style={resourceStyles.resourceCard2}
            onPress={() => handleResourcePress('conversation-starters')}>
              <View style={[resourceStyles.resourceIcon, { backgroundColor: palette.teal }]}>
              <Lightbulb size={35} color={palette.cream}/>
            </View>
              <Text style={resourceStyles.resourceTitle}>Conversation Starters</Text>
              <Text style={resourceStyles.resourceSubtitle}>Prompts to move forward</Text>
            </TouchableOpacity>

            <TouchableOpacity style={resourceStyles.resourceCard2}
            onPress={() => handleResourcePress('empathy-prompts')}>
              <View style={[resourceStyles.resourceIcon, { backgroundColor: palette.mutedBrown }]}>
              <Brain size={35} color={palette.cream}/>
            </View>
              <Text style={resourceStyles.resourceTitle}>Empathy Prompts</Text>
              <Text style={resourceStyles.resourceSubtitle}>Understand their perspective</Text>
            </TouchableOpacity>

            <TouchableOpacity style={resourceStyles.resourceCard2}
            onPress={() => handleResourcePress('boundary-setting')}>
              <View style={[resourceStyles.resourceIcon, { backgroundColor: palette.sage }]}>
              <ShieldBan size={35} color={palette.cream}/>
            </View>
              <Text style={resourceStyles.resourceTitle}>Boundary Setting</Text>
              <Text style={resourceStyles.resourceSubtitle}>Respectful ways to set limits</Text>
            </TouchableOpacity>

            <TouchableOpacity style={resourceStyles.resourceCard2}
            onPress={() => handleResourcePress('goal-setting')}>
                <View style={[resourceStyles.resourceIcon, { backgroundColor: palette.slate }]}>
                <Goal size={33} color={palette.cream}/>
                </View>
              <Text style={resourceStyles.resourceTitle}>Goal Setting</Text>
              <Text style={resourceStyles.resourceSubtitle}>How to set conversation goals</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={resourceStyles.resourceCard2}
            onPress={() => handleResourcePress('de-escalation')}>
              <View style={[resourceStyles.resourceIcon, { backgroundColor: palette.mediumGray }]}>
              <Snail size={35} color={palette.cream}/>
            </View>
              <Text style={resourceStyles.resourceTitle}>De-escalation Tactics</Text>
              <Text style={resourceStyles.resourceSubtitle}>Calm heated{'\n'}moments</Text>
            </TouchableOpacity>

            <TouchableOpacity style={resourceStyles.resourceCard2}
            onPress={() => handleResourcePress('reflection-questions')}>
              <View style={[resourceStyles.resourceIcon, { backgroundColor: palette.orange }]}>
              <CircleQuestionMark size={35} color={palette.cream}/>
            </View>
              <Text style={resourceStyles.resourceTitle}>Reflection Questions</Text>
              <Text style={resourceStyles.resourceSubtitle}>Deepen mutual{'\n'}understanding</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>

        {/* Edit Profile Modal with Fade Animation */}
        <Modal
          animationType="none"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <Animated.View 
            style={[
              styles.modalOverlay,
              { opacity: editFadeAnim }
            ]}
          >
            <Animated.View 
              style={[
                styles.modalContent,
                {
                  opacity: editFadeAnim,
                  transform: [{ scale: editScaleAnim }]
                }
              ]}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Edit Profile</Text>
                <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                  <X size={28} color={palette.darkBrown} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.modalLabel}>Username</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editUsername}
                  onChangeText={setEditUsername}
                  placeholder="Enter username"
                  placeholderTextColor={palette.mutedBrown}
                />

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
            </Animated.View>
          </Animated.View>
        </Modal>
        
        <ResourceModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          resourceType={selectedResource}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};