import React, { useState } from 'react';
import { View, Text, Pressable, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image, ImageBackground } from 'react-native';
import styles from '../styles/styles';
import { ChevronDown, ChevronRight, Search, Plus } from 'lucide-react-native';
import theme from '../styles/theme';

interface HomeProps {
  onBack: () => void;
  onNext: () => void;
  onSearch: (query: string) => void;
}

export const Home = ({ onBack, onNext, onSearch }: HomeProps) => {
  
  const activePortals: any[] = [];


  const [showActivePortals, setShowActivePortals] = useState(true);
  const [showRequestPortals, setShowRequestPortals] = useState(true);

  const requestPortals = [
    { id: '1', name: 'Yuina' },
  ];
  const [input, setInput] = useState<string>("");

  const handleSearchSubmit = () => {
        if (input.trim()) {
            onSearch(input.trim());
        }
    };

  const handleAddPortal = () => {
    // stuff
    console.log('Add new portal');
  };


  return (
    <ImageBackground 
          source= {require("../assets/backgrounds/light_ombre.png")}
          // {require("../assets/backgrounds/light_ombre.png")}
          style={{ flex: 1, width: '100%', height: '100%' }}
          resizeMode='cover'
        >
    <SafeAreaView style={{flex: 1}}>
      
      <View style={styles.screen}>
        <View style={styles.heading}>
          <Text style={styles.titleLarge}>Tether</Text>
        </View>
        <View style={[styles.search]}>
          <Search size={20} style={{margin: 5}} color={theme.button}></Search>
          <TextInput 
              style={[styles.text, { flex: 1 }]} 
              value={input} 
              onChangeText={setInput}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
              placeholder={"Search conversations"} 
              placeholderTextColor={theme.textSecondary}
          />
        </View>
        <ScrollView>
          <TouchableOpacity style={styles.dropdown} onPress={() => setShowActivePortals(!showActivePortals)}>
              {showActivePortals ? 
                <ChevronDown color={theme.button}/> : 
                <ChevronRight color={theme.button}/>
              }
              <Text style={styles.subheading}>Active Portals</Text>
            </TouchableOpacity>
            {showActivePortals && (
              activePortals.length === 0 ? (
                <View style={styles.empty}>
                  <Text style={styles.text}>No active portals</Text>
                </View>
              ) : (
                activePortals.map((contact) => (
                  <TouchableOpacity 
                    key={contact.id} 
                    style={styles.contactCard} 
                    onPress={onNext}
                  >
                    <View style={styles.avatar}>
                      <Image source={require('../assets/frogs/frog.png')}/>
                    </View>
                    <Text style={styles.text}>{contact.name}</Text>
                  </TouchableOpacity>
                ))
              )
            )}
          <TouchableOpacity style={styles.dropdown} onPress={() => setShowRequestPortals(!showRequestPortals)}>
            {showActivePortals ? 
                <ChevronDown color={theme.button}/> : 
                <ChevronRight color={theme.button}/>
              }
            <Text style={styles.subheading}>New Portal Requests</Text>
          </TouchableOpacity>
          {showRequestPortals && (
              requestPortals.length === 0 ? (
                <View style={styles.empty}>
                  <Text style={styles.text}>No new portal requests</Text>
                </View>
              ) : (
                requestPortals.map((invite) => (
                  <TouchableOpacity 
                    key={invite.id} 
                    style={styles.contactCard} 
                    onPress={onNext}
                  >
                    <View style={styles.avatar}>
                      <Image source = {require('../assets/frogs/frog.png')}/>
                    </View>
                    <Text style={styles.text}>{invite.name}</Text>
                  </TouchableOpacity>
                
                ))
              )
            )}
          
        </ScrollView>
        <View style={{
            paddingHorizontal: 10,
            paddingBottom: 10,
            backgroundColor: 'transparent',
          }}>
            <TouchableOpacity 
              style={[styles.loginInputWrapper, { 
                justifyContent: 'center', 
                paddingVertical: 14,
                flexDirection: 'row',
                alignItems: 'center',
              }]}
              onPress={handleAddPortal}
            >
              <Plus size={24} color={theme.button} />
              <Text style={[styles.text, { fontSize: 18, marginLeft: 8 }]}>Start a new portal</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </ImageBackground>
  );
};