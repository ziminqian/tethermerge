import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles/styles';
import { palette } from '../../styles/palette';
import { House, Users, Snail } from 'lucide-react-native';
import theme from '../../styles/theme';

interface FooterProps {
  activeTab: 'friends' | 'home' | 'profile';
  setActiveTab: (tab: 'friends' | 'home' | 'profile') => void;
}

export default function Footer({ activeTab, setActiveTab }: FooterProps) {

  const activeFrog = require("../../assets/frogs/cuter_thicker_frog_g3.png")
  const inactiveFrog = require("../../assets/frogs/cuter_thicker_frog_b3.png");

  /* less cuter frog icon
  const activeFrog = require("../../assets/other/frog_g.png")
  const inactiveFrog = require("../../assets/other/frog_b.png");*/

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.navButton} onPress={()=>setActiveTab("friends")}>
        <Users size = {40} color={activeTab == "friends" ? theme.pressed : theme.notpressed}></Users><Text style={styles.text}>Contacts</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={()=>setActiveTab("home")}>
        <House size = {40} color={activeTab == "home" ? theme.pressed : theme.notpressed}></House><Text style={styles.text}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.navButton, {transform: [{ translateY: -4}]}]} onPress={()=>setActiveTab("profile")}>
        <Image source={(activeTab == "profile") ? activeFrog : inactiveFrog}  style={{ width: 47,  height: 47, }} resizeMode="contain"></Image><Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}