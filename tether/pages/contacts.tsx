import React, { use } from 'react';
import { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native';
import styles from '../styles/styles';
import { Search, ChevronDown, ChevronRight } from 'lucide-react-native';
import theme from '../styles/theme';
import { palette } from '../styles/palette';

interface ContactsProps {
  onNext: (contact: { id: string; name: string }, isInvite?: boolean) => void;
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


  const handleSearchSubmit = () => {
        if (input.trim()) {
            onSearch(input.trim());
        }
    };

  return (
    <ImageBackground 
              source={require("../assets/backgrounds/light_ombre.png")}
              style={{ flex: 1, width: '100%', height: '100%' }}
              resizeMode='cover'
            >
      <SafeAreaView style={{flex: 1}}>
        
        <View style={styles.screen}>
          <View style={styles.heading}>
            <Text style={styles.headingtext}>Select Contact</Text>
          </View>
          <View style={[styles.search]}>
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
          <ScrollView>
            <TouchableOpacity style={styles.dropdown} onPress={() => setShowFriends(!showFriends)}>
            {showFriends ? 
                <ChevronDown color={theme.button}/> : 
                <ChevronRight color={theme.button}/>
              }
            <Text style={styles.subheading}>Friends on Tether</Text>
          </TouchableOpacity>
          {showFriends && (
              contacts.length === 0 ? (
                <View style={styles.empty}>
                  <Text style={styles.text}>No Friends to show</Text>
                </View>
              ) : (
                contacts.map((friend) => (
                  <TouchableOpacity 
                    key={friend.id} 
                    style={styles.contactCard} 
                    onPress={() => onNext(friend, false)} 
                  >
                    <View style={styles.avatar}>
                      <Image 
                        source={require('../assets/frogs/cute_frog_body.png')}
                        style={[styles.profileAvatarImage, {height: 37}, {transform: [{ translateY: 6}, {translateX: -5}]}]}
                        resizeMode="contain"
                        tintColor={friend.color}
                      />
                      <Image 
                        source={require('../assets/frogs/cute_frog_outline.png')}
                        style={[styles.profileAvatarImage, { position: 'absolute', height: 46, }, {transform: [{ translateY: 6}, {translateX: -5}]}]}
                        resizeMode="contain"
                      />
                      <Image 
                        source={require('../assets/frogs/cute_frog_cheeks.png')}
                        style={[styles.profileAvatarImage, { position: 'absolute', height: 44,}, {transform: [{ translateY: 4}, {translateX: -3}]}]}
                      />
                    </View>
                    <Text style={styles.text}>{friend.name}</Text>
                  </TouchableOpacity>
                
                ))
              )
            )}
            
          <TouchableOpacity style={styles.dropdown} onPress={() => setShowNewInvites(!showNewInvites)}>
            {showNewInvites ? 
                <ChevronDown color={theme.button}/> : 
                <ChevronRight color={theme.button}/>
              }
            <Text style={styles.subheading}>Invite to Tether</Text>
          </TouchableOpacity>
          {showNewInvites && (
              invites.length === 0 ? (
                <View style={styles.empty}>
                  <Text style={styles.text}>No new contacts to invite</Text>
                </View>
              ) : (
                invites.map((invite) => (
                  <TouchableOpacity 
                    key={invite.id} 
                    style={styles.contactCard} 
                    onPress={() => onNext(invite, true)}
                  >
                    <View style={styles.avatar}>
                      <Image 
                        source={require('../assets/frogs/cute_frog_body.png')}
                        style={[styles.profileAvatarImage, {height: 37}, {transform: [{ translateY: 6}, {translateX: -5}]}]}
                        resizeMode="contain"
                        tintColor={invite.color}
                      />
                      <Image 
                        source={require('../assets/frogs/cute_frog_outline.png')}
                        style={[styles.profileAvatarImage, { position: 'absolute', height: 46, }, {transform: [{ translateY: 6}, {translateX: -5}]}]}
                        resizeMode="contain"
                      />
                      <Image 
                        source={require('../assets/frogs/cute_frog_cheeks.png')}
                        style={[styles.profileAvatarImage, { position: 'absolute', height: 44,}, {transform: [{ translateY: 4}, {translateX: -3}]}]}
                      />
                    </View>
                    <Text style={styles.text}>{invite.name}</Text>
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