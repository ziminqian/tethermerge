import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { palette } from '../../styles/palette';
import { X } from 'lucide-react-native';
import portalStyles from '../../styles/portalStyles';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iyjdjalbdcstlskoildv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5amRqYWxiZGNzdGxza29pbGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzOTA3NTEsImV4cCI6MjA3OTk2Njc1MX0.Oh5zp-WhW8DpzXRYP4exF14cq_oscot7zJsKkzwrPK4';
const db = createClient(supabaseUrl, supabaseKey);

interface ExpectationsReviewModalProps {
  visible: boolean;
  onClose: () => void;
}

interface SavedExpectation {
  section: string;
  text: string;
  title: string;
}

export const ExpectationsReviewModal = ({ visible, onClose }: ExpectationsReviewModalProps) => {
  const [expectations, setExpectations] = useState<SavedExpectation[]>([]);
  const [loading, setLoading] = useState(true);

  const sectionTitles: { [key: string]: string } = {
    section1: 'What You Can Control',
    section2: 'What You Can\'t Control',
    section3: 'Your Best-Case Outcome',
    section4: 'Your Minimum Acceptable Outcome',
    section5: 'Emotional Preparation',
  };

  useEffect(() => {
    if (visible) {
      loadExpectations();
    }
  }, [visible]);

  const loadExpectations = async () => {
    setLoading(true);
    try {
      const sections = ['section1', 'section2', 'section3', 'section4', 'section5'];
      const loadedExpectations: SavedExpectation[] = [];

      for (const section of sections) {
        const { data, error } = await db
          .from('expectations2')
          .select('text')
          .eq('section', section)
          .order('created_at', { ascending: false })
          .limit(1);

        if (data && data.length > 0) {
          loadedExpectations.push({
            section,
            text: data[0].text || '',
            title: sectionTitles[section],
          });
        }
      }

      setExpectations(loadedExpectations);
    } catch (error) {
      console.error('Error loading expectations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: palette.cream,
            borderRadius: 20,
            padding: 24,
            width: '90%',
            maxHeight: '80%',
            shadowColor: palette.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 10,
            }}
          >
            <X size={28} color={palette.slate} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 26,
              fontWeight: 'bold',
              color: palette.slate,
              marginBottom: 16,
              textAlign: 'center',
              fontFamily: "../../assets/fonts/AbhayaLibre-Regular.ttf"
            }}
          >
            Your Expectations
          </Text>

          {loading ? (
            <View style={{ padding: 40, alignItems: 'center' }}>
              <ActivityIndicator size="large" color={palette.slate} />
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {expectations.map((expectation, index) => (
                <View
                  key={expectation.section}
                  style={{
                    marginBottom: 20,
                    padding: 16,
                    backgroundColor: palette.beige + '40',
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: palette.slate,
                      marginBottom: 8,
                      fontFamily: "../../assets/fonts/AbhayaLibre-Regular.ttf"
                    }}
                  >
                    {expectation.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: palette.darkBrown,
                      lineHeight: 24,
                      fontFamily: "../../assets/fonts/AbhayaLibre-Regular.ttf"
                    }}
                  >
                    {expectation.text}
                  </Text>
                </View>
              ))}

              {expectations.length === 0 && (
                <Text
                  style={{
                    textAlign: 'center',
                    color: palette.mutedBrown,
                    fontSize: 16,
                    padding: 20,
                    fontFamily: "../../assets/fonts/AbhayaLibre-Regular.ttf"
                  }}
                >
                  No expectations saved yet
                </Text>
              )}
            </ScrollView>
          )}

          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: palette.slate,
              paddingVertical: 14,
              paddingHorizontal: 32,
              borderRadius: 30,
              marginTop: 16,
              alignItems: 'center',
              shadowColor: palette.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <Text
              style={{
                color: palette.cream,
                fontSize: 16,
                fontWeight: '700',
                fontFamily: "../../assets/fonts/AbhayaLibre-Regular.ttf"
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};