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

interface ExpectationsSection3Props {
  onBack: () => void;
  onContinue: () => void;
  onBackToPortal: () => void;
  portalId: string;
  contactId: string;
}

export const ExpectationsSection3 = ({ 
  onBack, 
  onContinue, 
  onBackToPortal,
  portalId,
  contactId 
}: ExpectationsSection3Props) => {
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
        'section3'
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
        'section3',
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
            <Text style={portalStyles.sectionTitle}>Your Best-Case Outcome</Text>
            
            <View style={portalStyles.bulletList}>
              <Text style={portalStyles.bulletPoint}>• Feeling heard</Text>
              <Text style={portalStyles.bulletPoint}>• Clearing up a misunderstanding</Text>
              <Text style={portalStyles.bulletPoint}>• Naming a need</Text>
              <Text style={portalStyles.bulletPoint}>• Repairing tension</Text>
            </View>

            <Text style={portalStyles.prompt}>
              What would a meaningful, realistic positive outcome look like?
            </Text>
            
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