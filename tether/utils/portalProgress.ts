import AsyncStorage from '@react-native-async-storage/async-storage';

export interface PortalProgress {
  inviteAccepted: boolean;
  expectationsCompleted: boolean;
  assurancesCompleted: boolean;
  reflectCompleted: boolean;
}

const PROGRESS_KEY_PREFIX = '@portal_progress_';

/**
 * Load portal progress for a specific contact
 */
export const loadPortalProgress = async (contactId: string): Promise<PortalProgress | null> => {
  try {
    const key = `${PROGRESS_KEY_PREFIX}${contactId}`;
    const storedProgress = await AsyncStorage.getItem(key);
    if (storedProgress) {
      return JSON.parse(storedProgress);
    }
    return null;
  } catch (error) {
    console.error('Error loading portal progress:', error);
    return null;
  }
};

/**
 * Save portal progress for a specific contact
 */
export const savePortalProgress = async (
  contactId: string,
  progress: PortalProgress
): Promise<void> => {
  try {
    const key = `${PROGRESS_KEY_PREFIX}${contactId}`;
    await AsyncStorage.setItem(key, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving portal progress:', error);
  }
};

/**
 * Update a specific step in portal progress
 */
export const updatePortalStep = async (
  contactId: string,
  step: keyof PortalProgress,
  completed: boolean
): Promise<void> => {
  try {
    const currentProgress = await loadPortalProgress(contactId);
    const updatedProgress: PortalProgress = currentProgress || {
      inviteAccepted: false,
      expectationsCompleted: false,
      assurancesCompleted: false,
      reflectCompleted: false,
    };
    
    updatedProgress[step] = completed;
    await savePortalProgress(contactId, updatedProgress);
  } catch (error) {
    console.error('Error updating portal step:', error);
  }
};

/**
 * Reset portal progress for a specific contact
 */
export const resetPortalProgress = async (contactId: string): Promise<void> => {
  try {
    const key = `${PROGRESS_KEY_PREFIX}${contactId}`;
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error resetting portal progress:', error);
  }
};

/**
 * Check if all steps are completed
 */
export const isPortalComplete = (progress: PortalProgress): boolean => {
  return (
    progress.inviteAccepted &&
    progress.expectationsCompleted &&
    progress.assurancesCompleted &&
    progress.reflectCompleted
  );
};

/**
 * Get completion percentage
 */
export const getCompletionPercentage = (progress: PortalProgress): number => {
  const steps = Object.values(progress);
  const completedSteps = steps.filter(step => step).length;
  return Math.round((completedSteps / steps.length) * 100);
};