import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Contact, Conversation } from '../types/types';

interface TetherContextType {
  contacts: Contact[];
  conversations: Conversation[];
  currentConversation: Conversation | null;
  addContact: (contact: Contact) => void;
  createConversation: (contact: Contact) => string;
  updateConversationStatus: (id: string, status: Conversation['status']) => void;
  setCurrentConversation: (conversation: Conversation | null) => void;
}

const TetherContext = createContext<TetherContextType | undefined>(undefined);

export const TetherProvider = ({ children }: { children: ReactNode }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);

  const addContact = (contact: Contact) => {
    setContacts((prev) => [...prev, contact]);
  };

  const createConversation = (contact: Contact): string => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      contactId: contact.id,
      contactName: contact.name,
      createdAt: new Date(),
      status: 'preparing',
    };
    setConversations((prev) => [...prev, newConversation]);
    setCurrentConversation(newConversation);
    return newConversation.id;
  };

  const updateConversationStatus = (id: string, status: Conversation['status']) => {
    setConversations((prev) =>
      prev.map((conv) => (conv.id === id ? { ...conv, status } : conv))
    );
  };

  return (
    <TetherContext.Provider
      value={{
        contacts,
        conversations,
        currentConversation,
        addContact,
        createConversation,
        updateConversationStatus,
        setCurrentConversation,
      }}
    >
      {children}
    </TetherContext.Provider>
  );
};

export const useTether = () => {
  const context = useContext(TetherContext);
  if (context === undefined) {
    throw new Error('useTether must be used within a TetherProvider');
  }
  return context;
};