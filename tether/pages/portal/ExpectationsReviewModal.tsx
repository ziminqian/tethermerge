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
import useSession from '../../utils/useSession';
import { getAllExpectations } from '../../utils/database';

interface ExpectationsReviewModalProps {
  visible: boolean;
  onClose: () => void;
  portalId: string;
}

interface SavedExpectation {
  section: string;
  text: string;
  title: string;
}

export const ExpectationsReviewModal = ({ 
  visible, 
  onClose, 
  portalId 
}: ExpectationsReviewModalProps) => {
  const { session } = useSession();
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
    if (visible && session?.user?.id && portalId) {
      loadExpectations();
    }
  }, [visible, session, portalId]);

  const loadExpectations = async () => {
    setLoading(true);
    try {
      const data = await getAllExpectations(portalId, session!.user!.id);
      
      const loadedExpectations: SavedExpectation[] = [];
      Object.entries(data).forEach(([section, value]: [string, any]) => {
        if (value && value.text) {
          loadedExpectations.push({
            section,
            text: value.text,
            title: sectionTitles[section] || section,
          });
        }
      });

      // Sort by section order
      const sectionOrder = ['section1', 'section2', 'section3', 'section4', 'section5'];
      loadedExpectations.sort((a, b) => 
        sectionOrder.indexOf(a.section) - sectionOrder.indexOf(b.section)
      );

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
              fontFamily: "../../assets/fonts/AbhayaLibre-Regular.ttf",
              fontSize: 26,
              fontWeight: 'bold',
              color: palette.slate,
              marginBottom: 16,
              textAlign: 'center',
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
                      fontFamily: "../../assets/fonts/AbhayaLibre-Regular.ttf",
                      fontSize: 18,
                      fontWeight: '700',
                      color: palette.slate,
                      marginBottom: 8,
                    }}
                  >
                    {expectation.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "../../assets/fonts/AbhayaLibre-Regular.ttf",
                      fontSize: 16,
                      color: palette.darkBrown,
                      lineHeight: 24,
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
                    fontFamily: "../../assets/fonts/AbhayaLibre-Regular.ttf",
                    padding: 20,
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
                fontFamily: "../../assets/fonts/AbhayaLibre-Regular.ttf",
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