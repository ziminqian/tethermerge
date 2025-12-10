import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput,
  ImageBackground, 
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { palette } from '../../styles/palette';
import { ChevronLeft } from 'lucide-react-native';
import portalStyles from '../../styles/portalStyles';
import useSession from '../../utils/useSession';
import { saveExpectation, getLatestExpectation } from '../../utils/database';

interface ExpectationsSection5Props {
  onBack: () => void;
  onContinue: () => void;
  onBackToPortal: () => void;
  portalId: string;
  contactId: string;
}

export const ExpectationsSection5 = ({ 
  onBack, 
  onContinue, 
  onBackToPortal,
  portalId,
  contactId 
}: ExpectationsSection5Props) => {
  const { session } = useSession();
  const [textValue, setTextValue] = useState('');
  const [savedText, setSavedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session?.user?.id && portalId) {
      loadSavedText();
    }
  }, [session, portalId]);

  const loadSavedText = async () => {
    try {
      setLoading(true);
      const data = await getLatestExpectation(
        portalId,
        session!.user!.id,
        'section5' as any
      );
      
      if (data) {
        setSavedText(data.text || '');
      }
    } catch (error) {
      console.error('Error loading saved text:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setTextValue(savedText);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setTextValue('');
    setIsEditing(false);
  };

  const submitResponse = async () => {
    if (!textValue.trim()) {
      Alert.alert('Error', 'Please enter some text before saving');
      return;
    }

    try {
      setSaving(true);
      const data = await saveExpectation(
        portalId,
        session!.user!.id,
        'section5' as any,
        textValue
      );
      
      if (data) {
        setSavedText(data.text || '');
        setTextValue('');
        setIsEditing(false);
        Alert.alert('Success', 'Your response has been saved');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save your response');
      console.error('Error saving:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ImageBackground 
        source={require("../../assets/backgrounds/background_vibrant.png")}
        style={portalStyles.background}
        resizeMode='cover'
      >
        <View style={[portalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={palette.slate} />
        </View>
      </ImageBackground>
    );
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
            <Text style={portalStyles.sectionTitle}>Emotional Preparation</Text>
            
            <View style={portalStyles.bulletList}>
              <Text style={portalStyles.bulletPoint}>• What emotions might come up?</Text>
              <Text style={portalStyles.bulletPoint}>• What do you want to practice staying grounded in?</Text>
              <Text style={portalStyles.bulletPoint}>• What reminder will help you stay steady?</Text>
            </View>

            <View style={portalStyles.examplesContainer}>
              <Text style={portalStyles.examplesTitle}>Examples:</Text>
              <Text style={portalStyles.example}>"It's okay if they need time to respond."</Text>
              <Text style={portalStyles.example}>"My job is to communicate clearly, not control the outcome."</Text>
              <Text style={portalStyles.example}>"I'm having this conversation because I care."</Text>
            </View>
            
            {savedText && !isEditing ? (
              <>
                <TextInput
                  style={portalStyles.savedTextBox}
                  value={savedText}
                  editable={false}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
                <TouchableOpacity onPress={handleEdit} style={portalStyles.editButton}>
                  <Text style={portalStyles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  style={portalStyles.textBox}
                  value={textValue}
                  onChangeText={setTextValue}
                  placeholder="Type your thoughts here..."
                  placeholderTextColor={palette.mutedBrown}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  editable={!saving}
                />
                <View style={portalStyles.buttonRow}>
                  {isEditing && (
                    <TouchableOpacity 
                      onPress={handleCancelEdit} 
                      style={portalStyles.cancelButton}
                      disabled={saving}
                    >
                      <Text style={portalStyles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity 
                    onPress={submitResponse} 
                    style={[portalStyles.savebutton, isEditing && portalStyles.saveButtonEdit]}
                    disabled={saving}
                  >
                    {saving ? (
                      <ActivityIndicator size="small" color={palette.cream} />
                    ) : (
                      <Text style={portalStyles.savebuttontext}>Save</Text>
                    )}
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
        <Text style={portalStyles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBackToPortal} style={portalStyles.backToPortalButton}>
        <Text style={portalStyles.backToPortalText}>Back to Portal</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};