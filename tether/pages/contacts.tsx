import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image, ImageBackground, Animated } from 'react-native';
import styles from '../styles/styles';
import { Search, ChevronDown, ChevronRight } from 'lucide-react-native';
import theme from '../styles/theme';
import { palette } from '../styles/palette';

interface ContactsProps {
  onNext: (contact: { id: string; name: string, color: any }, isInvite?: boolean) => void;
  onBack: () => void;
  onSearch: (query: string) => void;
}

export const Contacts = ({ onNext, onBack, onSearch }: ContactsProps) => {
  const contacts = [
    { id: '1', name: 'Zafar', color: palette.beige},
    { id: '2', name: 'Yuina', color: palette.sage},
    { id: '3', name: 'Zimin', color: palette.slate},
  ];

  const invites = [
    { id: '1', name: 'James', color: palette.lightBrown},
    { id: '2', name: 'Charlotte', color: palette.teal},
  ];
  
  const [input, setInput] = useState<string>("");
  const [showFriends, setShowFriends] = useState(true);
  const [showNewInvites, setShowNewInvites] = useState(true);
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [filteredInvites, setFilteredInvites] = useState(invites);
  const [blinkStates, setBlinkStates] = useState<boolean[]>(
      [...contacts, ...invites].map(() => false)
    );

  // Bounce animation for frogs
  const bounceAnims = useRef(
    [...contacts, ...invites].map(() => new Animated.Value(0))
  ).current;

  

  useEffect(() => {
    // Start bounce animations for all frogs
    bounceAnims.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: -3,
            duration: 1000 + (index * 200), // Stagger the animations
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 1000 + (index * 200),
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
    const blinkInterval = setInterval(() => {
      const newBlinkStates = blinkStates.map(() => Math.random() > 0.7); // 30% chance to blink
      setBlinkStates(newBlinkStates);
      
      // Reset blink after 150ms
      setTimeout(() => {
        setBlinkStates(blinkStates.map(() => false));
      }, 150);
    }, 3000); // Check every 3 seconds

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    // Filter contacts based on search input
    if (input.trim() === '') {
      setFilteredContacts(contacts);
      setFilteredInvites(invites);
    } else {
      const searchLower = input.toLowerCase();
      setFilteredContacts(
        contacts.filter(contact => 
          contact.name.toLowerCase().includes(searchLower)
        )
      );
      setFilteredInvites(
        invites.filter(invite => 
          invite.name.toLowerCase().includes(searchLower)
        )
      );
    }
  }, [input]);

  const handleSearchSubmit = () => {
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  const renderFrog = (contact: any, index: number, isBlinking: boolean) => {
    const animIndex = contacts.findIndex(c => c.id === contact.id);
    const bounceAnim = bounceAnims[animIndex !== -1 ? animIndex : contacts.length + invites.findIndex(i => i.id === contact.id)];

    return (
      <Animated.View 
        style={[
          styles.avatar,
          { transform: [{ translateY: bounceAnim }] }
        ]}
      >
        <Image 
          source={require('../assets/frogs/cute_frog_body.png')}
          style={[styles.profileAvatarImage, {height: 37}, {transform: [{ translateY: 6}, {translateX: -5}]}]}
          resizeMode="contain"
          tintColor={contact.color}
        />
        <Image 
          source={isBlinking 
            ? require('../assets/frogs/cute_frog_blinking.png')
            : require('../assets/frogs/cute_frog_outline.png')
          }
          style={[styles.profileAvatarImage, { position: 'absolute', height: 46, }, {transform: [{ translateY: 6}, {translateX: -5}]}]}
          resizeMode="contain"
        />
        <Image 
          source={require('../assets/frogs/cute_frog_cheeks.png')}
          style={[styles.profileAvatarImage, { position: 'absolute', height: 44,}, {transform: [{ translateY: 4}, {translateX: -3}]}]}
        />
      </Animated.View>
    );
  };

  return (
    <ImageBackground 
      source={require("../assets/backgrounds/light_ombre.png")}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode='cover'
    >
      {/* Subtle pattern overlay */}
      <View style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.03,
        backgroundColor: 'transparent',
      }}>
        <Image 
          source={require('../assets/other/portal.png')}
          style={{ width: '100%', height: '100%', opacity: 0.05 }}
          resizeMode="repeat"
        />
      </View>

      <SafeAreaView style={{flex: 1}}>
        <View style={styles.screen}>
          <View style={styles.heading}>
            <Text style={styles.headingtext}>Select Contact</Text>
          </View>
          
          <View style={[styles.search, {
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: 16,
            shadowColor: palette.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 2,
          }]}>
            <Search size={20} style={{margin: 5}} color={theme.button}></Search>
            <TextInput 
              style={[styles.text, { flex: 1 }]} 
              value={input} 
              onChangeText={setInput}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
              placeholder={"Search contacts"} 
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Decorative divider */}
            <View style={{
              height: 2,
              backgroundColor: palette.sage,
              opacity: 0.2,
              marginVertical: 12,
              marginHorizontal: 20,
            }} />

            <TouchableOpacity 
              style={styles.dropdown} 
              onPress={() => setShowFriends(!showFriends)}
            >
              {showFriends ? 
                <ChevronDown color={theme.button}/> : 
                <ChevronRight color={theme.button}/>
              }
              <Text style={styles.subheading}>Friends on Tether</Text>
            </TouchableOpacity>

            {showFriends && (
              filteredContacts.length === 0 ? (
                <View style={styles.empty}>
                  <Image 
                    source={require('../assets/frogs/cute_frog_body.png')}
                    style={{ width: 80, height: 80, opacity: 0.3, marginBottom: 12 }}
                    resizeMode="contain"
                    tintColor={palette.sage}
                  />
                  <Text style={[styles.text, { opacity: 0.6 }]}>
                    {input ? 'No friends found' : 'No friends to show'}
                  </Text>
                </View>
              ) : (
                filteredContacts.map((friend, index) => (
                  <TouchableOpacity 
                    key={friend.id} 
                    style={[styles.contactCard, {
                      backgroundColor: 'rgba(255, 255, 255, 0.6)',
                      borderRadius: 16,
                      marginBottom: 12,
                      marginHorizontal: 8,
                      padding: 16,
                      shadowColor: palette.shadow,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 8,
                      elevation: 2,
                    }]} 
                    onPress={() => onNext(friend, false)} 
                  >
                    {renderFrog(friend, index, blinkStates[index])}
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.text, { fontWeight: '600' }]}>{friend.name}</Text>
                      <Text style={[styles.text, { fontSize: 15, opacity: 0.6, marginTop: 2, fontStyle: "italic" }]}>
                        Close friend
                      </Text>
                    </View>
                    <View style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: palette.teal,
                    }} />
                  </TouchableOpacity>
                ))
              )
            )}
            
            {/* Decorative divider */}
            <View style={{
              height: 2,
              backgroundColor: palette.lightBrown,
              opacity: 0.2,
              marginVertical: 12,
              marginHorizontal: 20,
            }} />

            <TouchableOpacity 
              style={styles.dropdown} 
              onPress={() => setShowNewInvites(!showNewInvites)}
            >
              {showNewInvites ? 
                <ChevronDown color={theme.button}/> : 
                <ChevronRight color={theme.button}/>
              }
              <Text style={styles.subheading}>Invite to Tether</Text>
            </TouchableOpacity>

            {showNewInvites && (
              filteredInvites.length === 0 ? (
                <View style={styles.empty}>
                  <Image 
                    source={require('../assets/frogs/cute_frog_body.png')}
                    style={{ width: 80, height: 80, opacity: 0.3, marginBottom: 12 }}
                    resizeMode="contain"
                    tintColor={palette.teal}
                  />
                  <Text style={[styles.text, { opacity: 0.6 }]}>
                    {input ? 'No contacts found' : 'No new contacts to invite'}
                  </Text>
                </View>
              ) : (
                filteredInvites.map((invite, index) => (
                  <TouchableOpacity 
                    key={invite.id} 
                    style={[styles.contactCard, {
                      backgroundColor: 'rgba(255, 255, 255, 0.6)',
                      borderRadius: 16,
                      marginBottom: 12,
                      marginHorizontal: 8,
                      padding: 16,
                      shadowColor: palette.shadow,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 8,
                      elevation: 2,
                    }]} 
                    onPress={() => onNext(invite, true)}
                  >
                    {renderFrog(invite, contacts.length + index, blinkStates[index])}
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.text, { fontWeight: '600' }]}>{invite.name}</Text>
                      <Text style={[styles.text, { fontSize: 15, opacity: 0.6, marginTop: 2, fontStyle: "italic" }]}>
                        Not on Tether yet
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              )
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};