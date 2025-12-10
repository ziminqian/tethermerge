import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image, ImageBackground, Animated, ActivityIndicator } from 'react-native';
import styles from '../styles/styles';
import { ChevronDown, ChevronRight, Search, Plus, Clock } from 'lucide-react-native';
import theme from '../styles/theme';
import { palette } from '../styles/palette';
import { getActivePortals, getPortalRequests } from '../utils/database';
import useSession from '../utils/useSession';

interface HomeProps {
  onBack: () => void;
  onNext: (contact: { id: string; name: string, color: any  }) => void;
  onSearch: (query: string) => void;
}

export const Home = ({ onBack, onNext, onSearch }: HomeProps) => {
  const { session } = useSession();
  const [activePortals, setActivePortals] = useState<any[]>([]);
  const [requestPortals, setRequestPortals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showActivePortals, setShowActivePortals] = useState(true);
  const [showRequestPortals, setShowRequestPortals] = useState(true);
  const [input, setInput] = useState<string>("");
  const [filteredActivePortals, setFilteredActivePortals] = useState<any[]>([]);
  const [filteredRequestPortals, setFilteredRequestPortals] = useState<any[]>([]);
  const [blinkStates, setBlinkStates] = useState<boolean[]>([]);

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const bounceAnims = useRef<Animated.Value[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      loadPortals();
    }
  }, [session]);

  useEffect(() => {
    const totalPortals = [...activePortals, ...requestPortals];
    bounceAnims.current = totalPortals.map(() => new Animated.Value(0));
    setBlinkStates(totalPortals.map(() => false));
  }, [activePortals, requestPortals]);

  useEffect(() => {
    if (input.trim() === '') {
      setFilteredActivePortals(activePortals);
      setFilteredRequestPortals(requestPortals);
    } else {
      const searchLower = input.toLowerCase();
      setFilteredActivePortals(
        activePortals.filter(portal => 
          portal.name.toLowerCase().includes(searchLower)
        )
      );
      setFilteredRequestPortals(
        requestPortals.filter(portal => 
          portal.name.toLowerCase().includes(searchLower)
        )
      );
    }
  }, [input, activePortals, requestPortals]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

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
  }, []);

  const loadPortals = async () => {
    try {
      setLoading(true);
      const [activeData, requestsData] = await Promise.all([
        getActivePortals(session!.user!.id),
        getPortalRequests(session!.user!.id),
      ]);
      setActivePortals(activeData);
      setRequestPortals(requestsData);
      setFilteredActivePortals(activeData);
      setFilteredRequestPortals(requestsData);
    } catch (error) {
      console.error('Error loading portals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = () => {
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  const handleAddPortal = () => {
    onBack();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8]
  });

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
      <SafeAreaView style={{flex: 1}}>
        <View style={[styles.screen, { overflow: 'visible' }]}>
          <View style={[styles.heading, {flexDirection: "column"}]}>
            <Text style={styles.tetherTitle}>Tether</Text>
            <Text style={styles.subtitle}>A Safe Space for Difficult Conversations </Text>
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
            <Search size={20} style={{margin: 5}} color={palette.slate}></Search>
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

          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <TouchableOpacity 
              style={styles.dropdown} 
              onPress={() => setShowActivePortals(!showActivePortals)}
            >
              {showActivePortals ? 
                <ChevronDown color={palette.slate}/> : 
                <ChevronRight color={palette.slate}/>
              }
              <Text style={styles.subheading}>Active Portals</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{filteredActivePortals.length}</Text>
              </View>
            </TouchableOpacity>

            {showActivePortals && (
              filteredActivePortals.length === 0 ? (
                <View style={styles.empty}>
                  <Animated.Image 
                    source={require('../assets/other/portal.png')}
                    style={{ 
                      width: 100, 
                      height: 100, 
                      opacity: 0.3, 
                      marginBottom: 12,
                      transform: [{ rotate: spin }]
                    }}
                    resizeMode="contain"
                  />
                  <Text style={[styles.text, { opacity: 0.6 }]}>
                    {input ? 'No portals found' : 'No active portals. Start one below!'}
                  </Text>
                </View>
              ) : (
                filteredActivePortals.map((contact, index) => (
                  <TouchableOpacity 
                    key={contact.id} 
                    style={styles.portalCard}
                    onPress={() => onNext(contact)}
                  >
                    <View style={styles.portalCardContent}>
                      {renderFrog(contact, index, blinkStates[index])}
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.portalName}>{contact.name}</Text>
                        <View style={styles.statusRow}>
                          <Clock size={12} color={palette.mutedBrown} />
                          <Text style={[styles.requestText, {color: palette.teal}]}>{contact.lastActive}</Text>
                        </View>
                      </View>
                      <View style={styles.activeIndicator} />
                    </View>
                  </TouchableOpacity>
                ))
              )
            )}

            <TouchableOpacity 
              style={styles.dropdown} 
              onPress={() => setShowRequestPortals(!showRequestPortals)}
            >
              {showRequestPortals ? 
                <ChevronDown color={palette.slate}/> : 
                <ChevronRight color={palette.slate}/>
              }
              <Text style={styles.subheading}>New Portal Requests</Text>
              {filteredRequestPortals.length > 0 && (
                <View style={[styles.badge, { backgroundColor: palette.orange }]}>
                  <Text style={styles.badgeText}>{filteredRequestPortals.length}</Text>
                </View>
              )}
            </TouchableOpacity>

            {showRequestPortals && (
              filteredRequestPortals.length === 0 ? (
                <View style={styles.empty}>
                  <Image 
                    source={require('../assets/frogs/cute_frog_body.png')}
                    style={{ width: 80, height: 80, opacity: 0.3, marginBottom: 12 }}
                    resizeMode="contain"
                    tintColor={palette.beige}
                  />
                  <Text style={[styles.text, { opacity: 0.6 }]}>
                    {input ? 'No requests found' : 'No new portal requests'}
                  </Text>
                </View>
              ) : (
                filteredRequestPortals.map((invite, index) => (
                  <TouchableOpacity 
                    key={invite.id} 
                    style={[styles.portalCard, styles.requestCard]}
                    onPress={() => onNext(invite)}
                  >
                    <View style={styles.portalCardContent}>
                      {renderFrog(invite, activePortals.length + index, blinkStates[activePortals.length + index])}
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.portalName}>{invite.name}</Text>
                        <Text style={styles.requestText}>Wants to connect • {invite.requestTime}</Text>
                      </View>
                      <View style={styles.newIndicator}>
                        <Text style={styles.newText}>NEW</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              )
            )}
            <View style={{ height: 220 }} />
          </ScrollView>

          <View style={styles.bottomSection}>
            <TouchableOpacity 
              style={styles.addPortalButton}
              onPress={handleAddPortal}
            >
              <Plus size={20} color={palette.cream} />
              <Text style={styles.addPortalButtonText}>Start a new portal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};