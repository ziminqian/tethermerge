import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput,
  ImageBackground, 
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
  Alert,
  ScrollView
} from 'react-native';
import { palette } from '../../styles/palette';
import { ChevronLeft } from 'lucide-react-native';

import { createClient } from '@supabase/supabase-js'
import expectationStyles from '../../styles/expectationStyles';

const supabaseUrl = 'https://iyjdjalbdcstlskoildv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5amRqYWxiZGNzdGxza29pbGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzOTA3NTEsImV4cCI6MjA3OTk2Njc1MX0.Oh5zp-WhW8DpzXRYP4exF14cq_oscot7zJsKkzwrPK4'
const db = createClient(supabaseUrl, supabaseKey)

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ExpectationsSection1Props {
  onBack: () => void;
  onContinue: () => void;
  onBackToPortal: () => void;
}

export const ExpectationsSection1 = ({ onBack, onContinue, onBackToPortal }: ExpectationsSection1Props) => {
  const [textValue, setTextValue] = useState('');
  const [savedText, setSavedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const loadSavedText = async () => {
    try {
      const { data, error } = await db
        .from('expectations2')
        .select('text')
        .eq('section', 'section1')
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
          section: 'section1',
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
      style={expectationStyles.background}
      resizeMode='cover'
    >
      <View style={expectationStyles.container}>
        <TouchableOpacity onPress={onBack} style={expectationStyles.backButton}>
          <ChevronLeft size={40} color={palette.slate} />
        </TouchableOpacity>
        
        <ScrollView 
          style={expectationStyles.scrollView}
          contentContainerStyle={expectationStyles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          <View style={expectationStyles.content}>
            <Text style={expectationStyles.sectionTitle}>What You Can Control</Text>
            
            <View style={expectationStyles.bulletList}>
              <Text style={expectationStyles.bulletPoint}>• Your tone and body language</Text>
              <Text style={expectationStyles.bulletPoint}>• Your honesty and vulnerability</Text>
              <Text style={expectationStyles.bulletPoint}>• How calmly you communicate</Text>
              <Text style={expectationStyles.bulletPoint}>• How you respond if emotions rise</Text>
              <Text style={expectationStyles.bulletPoint}>• The clarity of what you want to say</Text>
            </View>

            <Text style={expectationStyles.prompt}>What do you want to make sure you stay in control of during this conversation?</Text>
            
            {savedText && !isEditing ? (
              <>
                <TextInput
                  style={expectationStyles.savedTextBox}
                  value={savedText}
                  editable={false}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
                <TouchableOpacity onPress={handleEdit} style={expectationStyles.editButton}>
                  <Text style={expectationStyles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  style={expectationStyles.textBox}
                  value={textValue}
                  onChangeText={setTextValue}
                  placeholder="Type your thoughts here..."
                  placeholderTextColor={palette.mutedBrown}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
                <View style={expectationStyles.buttonRow}>
                  {isEditing && (
                    <TouchableOpacity onPress={handleCancelEdit} style={expectationStyles.cancelButton}>
                      <Text style={expectationStyles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={submitResponse} style={[expectationStyles.savebutton, isEditing && expectationStyles.saveButtonEdit]}>
                    <Text style={expectationStyles.savebuttontext}>Save</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </View>
      
      <Pressable
        style={expectationStyles.continueButton}
        onPress={onContinue}
      >
        <Text style={expectationStyles.continueButtonText}>Continue</Text>
      </Pressable>

      <TouchableOpacity onPress={onBackToPortal} style={expectationStyles.backToPortalButton}>
        <Text style={expectationStyles.backToPortalText}>Back to Portal</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};
