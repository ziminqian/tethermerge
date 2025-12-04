import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Contact {
  id: string;
  name: string;
  color: any;
}

interface ActivePortal extends Contact {
  lastActive: string;
  startedAt: string;
}

interface PortalContextType {
  activePortals: ActivePortal[];
  addActivePortal: (contact: Contact) => void;
  removeActivePortal: (contactId: string) => void;
  updatePortalActivity: (contactId: string) => void;
  isPortalActive: (contactId: string) => boolean;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

const ACTIVE_PORTALS_KEY = '@active_portals';

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePortals, setActivePortals] = useState<ActivePortal[]>([]);

  // Load active portals from AsyncStorage on mount
  useEffect(() => {
    loadActivePortals();
  }, []);

  // Save active portals to AsyncStorage whenever they change
  useEffect(() => {
    saveActivePortals();
  }, [activePortals]);

  const loadActivePortals = async () => {
    try {
      const stored = await AsyncStorage.getItem(ACTIVE_PORTALS_KEY);
      if (stored) {
        setActivePortals(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading active portals:', error);
    }
  };

  const saveActivePortals = async () => {
    try {
      await AsyncStorage.setItem(ACTIVE_PORTALS_KEY, JSON.stringify(activePortals));
    } catch (error) {
      console.error('Error saving active portals:', error);
    }
  };

  const getTimeAgo = (timestamp: string): string => {
    const now = new Date().getTime();
    const then = new Date(timestamp).getTime();
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const addActivePortal = (contact: Contact) => {
    const now = new Date().toISOString();
    const existingIndex = activePortals.findIndex(p => p.id === contact.id);
    
    if (existingIndex >= 0) {
      // Update existing portal
      const updated = [...activePortals];
      updated[existingIndex] = {
        ...contact,
        lastActive: getTimeAgo(now),
        startedAt: activePortals[existingIndex].startedAt, // Keep original start time
      };
      setActivePortals(updated);
    } else {
      // Add new portal
      setActivePortals([
        ...activePortals,
        {
          ...contact,
          lastActive: 'Just now',
          startedAt: now,
        }
      ]);
    }
  };

  const removeActivePortal = (contactId: string) => {
    setActivePortals(activePortals.filter(p => p.id !== contactId));
  };

  const updatePortalActivity = (contactId: string) => {
    const now = new Date().toISOString();
    setActivePortals(
      activePortals.map(portal =>
        portal.id === contactId
          ? { ...portal, lastActive: getTimeAgo(now) }
          : portal
      )
    );
  };

  const isPortalActive = (contactId: string): boolean => {
    return activePortals.some(p => p.id === contactId);
  };

  return (
    <PortalContext.Provider
      value={{
        activePortals,
        addActivePortal,
        removeActivePortal,
        updatePortalActivity,
        isPortalActive,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};