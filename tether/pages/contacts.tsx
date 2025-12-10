import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image, ImageBackground, Animated, ActivityIndicator } from 'react-native';
import styles from '../styles/styles';
import { Search, ChevronDown, ChevronRight } from 'lucide-react-native';
import theme from '../styles/theme';
import { palette } from '../styles/palette';
import { getContacts, getPendingInvites, searchUsers } from '../utils/database';
import useSession from '../utils/useSession';

interface ContactsProps {
  onNext: (contact: { id: string; name: string, color: any }, isInvite?: boolean) => void;
  onBack: () => void;
  onSearch: (query: string) => void;
}

export const Contacts = ({ onNext, onBack, onSearch }: ContactsProps) => {
  const { session } = useSession();
  const [contacts, setContacts] = useState<any[]>([]);
  const [invites, setInvites] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  
  const [input, setInput] = useState<string>("");
  const [showFriends, setShowFriends] = useState(true);
  const [showNewInvites, setShowNewInvites] = useState(true);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState<any[]>([]);
  const [filteredInvites, setFilteredInvites] = useState<any[]>([]);
  const [blinkStates, setBlinkStates] = useState<boolean[]>([]);

  const bounceAnims = useRef<Animated.Value[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      loadData();
    }
  }, [session]);

  useEffect(() => {
    const totalContacts = [...contacts, ...invites, ...searchResults];
    bounceAnims.current = totalContacts.map(() => new Animated.Value(0));
    setBlinkStates(totalContacts.map(() => false));

    // Start animations
    bounceAnims.current.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: -3,
            duration: 1000 + (index * 200),
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
      const newBlinkStates = blinkStates.map(() => Math.random() > 0.7);
      setBlinkStates(newBlinkStates);
      
      setTimeout(() => {
        setBlinkStates(blinkStates.map(() => false));
      }, 150);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, [contacts, invites, searchResults]);

  useEffect(() => {
    if (input.trim() === '') {
      setFilteredContacts(contacts);
      setFilteredInvites(invites);
      setShowSearchResults(false);
      setSearchResults([]);
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
  }, [input, contacts, invites]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [contactsData, invitesData] = await Promise.all([
        getContacts(session!.user!.id),
        getPendingInvites(session!.user!.id),
      ]);
      setContacts(contactsData);
      setInvites(invitesData);
      setFilteredContacts(contactsData);
      setFilteredInvites(invitesData);
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async () => {
    if (input.trim()) {
      setSearching(true);
      try {
        const results = await searchUsers(input.trim(), session!.user!.id);
        setSearchResults(results);
        setShowSearchResults(true);
      } catch (error) {
        console.error('Error searching users:', error);
      } finally {
        setSearching(false);
      }
    }
  };

  const renderFrog = (contact: any, index: number, isBlinking: boolean) => {
    const bounceAnim = bounceAnims.current[index] || new Animated.Value(0);

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

  if (loading) {
    return (
      <ImageBackground 
        source={require("../assets/backgrounds/light_ombre.png")}
        style={{ flex: 1, width: '100%', height: '100%' }}
        resizeMode='cover'
      >
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={palette.slate} />
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground 
      source={require("../assets/backgrounds/light_ombre.png")}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode='cover'
    >
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
              placeholder={"Search users"} 
              placeholderTextColor={theme.textSecondary}
            />
            {searching && <ActivityIndicator size="small" color={palette.slate} />}
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
              height: 2,
              backgroundColor: palette.sage,
              opacity: 0.2,
              marginVertical: 12,
              marginHorizontal: 20,
            }} />

            {showSearchResults && searchResults.length > 0 && (
              <>
                <TouchableOpacity 
                  style={styles.dropdown} 
                  onPress={() => setShowSearchResults(!showSearchResults)}
                >
                  {showSearchResults ? 
                    <ChevronDown color={theme.button}/> : 
                    <ChevronRight color={theme.button}/>
                  }
                  <Text style={styles.subheading}>Search Results</Text>
                </TouchableOpacity>

                {searchResults.map((result, index) => (
                  <TouchableOpacity 
                    key={result.id} 
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
                    onPress={() => onNext(result, false)} 
                  >
                    {renderFrog(result, contacts.length + invites.length + index, blinkStates[contacts.length + invites.length + index])}
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.text, { fontWeight: '600' }]}>{result.name}</Text>
                      <Text style={[styles.text, { fontSize: 15, opacity: 0.6, marginTop: 2, fontStyle: "italic" }]}>
                        Search result
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}

                <View style={{
                  height: 2,
                  backgroundColor: palette.sage,
                  opacity: 0.2,
                  marginVertical: 12,
                  marginHorizontal: 20,
                }} />
              </>
            )}

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
                    {input ? 'No friends found' : 'No friends yet. Search to add some!'}
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
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};