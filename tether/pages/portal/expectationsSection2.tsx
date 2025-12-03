import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput,
  ImageBackground, 
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import { palette } from '../../styles/palette';
import { ChevronLeft } from 'lucide-react-native';
import portalStyles from '../../styles/portalStyles';

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iyjdjalbdcstlskoildv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5amRqYWxiZGNzdGxza29pbGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzOTA3NTEsImV4cCI6MjA3OTk2Njc1MX0.Oh5zp-WhW8DpzXRYP4exF14cq_oscot7zJsKkzwrPK4'
const db = createClient(supabaseUrl, supabaseKey)

interface ExpectationsSection2Props {
  onBack: () => void;
  onContinue: () => void;
  onBackToPortal: () => void;
}

export const ExpectationsSection2 = ({ onBack, onContinue, onBackToPortal }: ExpectationsSection2Props) => {
  const [textValue, setTextValue] = useState('');
  const [savedText, setSavedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const loadSavedText = async () => {
    try {
      const { data, error } = await db
        .from('expectations2')
        .select('text')
        .eq('section', 'section2')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (error) {
        console.error('Error loading saved text:', error);
        return;
      }
      
      if (data && data.length > 0) {
        setSavedText(data[0].text || '');
      }
    } catch (error) {
      console.error('Error loading saved text:', error);
    }
  };

  useEffect(() => {
    loadSavedText();
  }, []);

  const handleEdit = () => {
    setTextValue(savedText);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setTextValue('');
    setIsEditing(false);
  };

  const submitResponse = async () => {
    try {
      const { data, error } = await db
        .from('expectations2')
        .insert({
          text: textValue.trim(),
          section: 'section2',
        })
        .select();
      
      if (error) {
        Alert.alert('Error', 'Failed to save your response');
        console.error('Error saving:', error);
        return;
      }
      
      if (data && data.length > 0) {
        setSavedText(data[0].text || '');
        setTextValue(''); // Clear the input after saving
        setIsEditing(false); // Exit edit mode
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save your response');
      console.error('Error saving:', error);
    }
  }

  return (
    <ImageBackground 
      source={require("../../assets/backgrounds/background_vibrant.png")}
      style={portalStyles.background}
      resizeMode='cover'
    >
      <View style={portalStyles.container}>
        <TouchableOpacity onPress={onBack} style={portalStyles.backButton}>
          <ChevronLeft size={40} color={palette.slate} />
        </TouchableOpacity>
        
        <ScrollView 
          style={portalStyles.scrollView}
          contentContainerStyle={portalStyles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          <View style={[portalStyles.content, { paddingTop: 80 }]}>
          <Text style={[portalStyles.sectionTitle, { fontFamily: 'Avenir' }]}>What You Can't Control</Text>
          
          <View style={portalStyles.bulletList}>
            <Text style={[portalStyles.bulletPoint, { fontFamily: 'Avenir' }]}>• Their reaction</Text>
            <Text style={[portalStyles.bulletPoint, { fontFamily: 'Avenir' }]}>• Whether they agree with you</Text>
            <Text style={[portalStyles.bulletPoint, { fontFamily: 'Avenir' }]}>• Their emotional state</Text>
            <Text style={[portalStyles.bulletPoint, { fontFamily: 'Avenir' }]}>• How long they need to process</Text>
          </View>

          <Text style={[portalStyles.prompt, { fontFamily: 'Avenir' }]}>What are you worried about that might be outside your control?</Text>
          
          {savedText && !isEditing ? (
              <>
                <TextInput
                  style={[portalStyles.savedTextBox, { fontFamily: 'Avenir' }]}
                  value={savedText}
                  editable={false}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
                <TouchableOpacity onPress={handleEdit} style={portalStyles.editButton}>
                  <Text style={[portalStyles.editButtonText, { fontFamily: 'Avenir' }]}>Edit</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  style={[portalStyles.textBox, { fontFamily: 'Avenir' }]}
                  value={textValue}
                  onChangeText={setTextValue}
                  placeholder="Type your thoughts here..."
                  placeholderTextColor={palette.mutedBrown}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
                <View style={portalStyles.buttonRow}>
                  {isEditing && (
                    <TouchableOpacity onPress={handleCancelEdit} style={portalStyles.cancelButton}>
                      <Text style={[portalStyles.cancelButtonText, { fontFamily: 'Avenir' }]}>Cancel</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={submitResponse} style={[portalStyles.savebutton, isEditing && portalStyles.saveButtonEdit]}>
                    <Text style={[portalStyles.savebuttontext, { fontFamily: 'Avenir' }]}>Save</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </View>
      
      <TouchableOpacity
        style={portalStyles.continueButton}
        onPress={onContinue}
      >
        <Text style={[portalStyles.continueButtonText, { fontFamily: 'Avenir' }]}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBackToPortal} style={portalStyles.backToPortalButton}>
        <Text style={[portalStyles.backToPortalText, { fontFamily: 'Avenir' }]}>Back to Portal</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};
