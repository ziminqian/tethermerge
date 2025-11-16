export interface Contact {
  id: string;
  name: string;
  phoneNumber?: string;
  email?: string;
  imageUri?: string;
}

export interface Conversation {
  id: string;
  contactId: string;
  contactName: string;
  createdAt: Date;
  status: 'preparing' | 'ongoing' | 'completed';
}

export interface Message {
  id: string;
  conversationId: string;
  content: string;
  type: 'generated' | 'user';
  timestamp: Date;
}

export interface Intention {
  id: string;
  conversationId: string;
  text: string;
  category: 'expectation' | 'gratitude' | 'goal';
}

export interface Reflection {
  id: string;
  conversationId: string;
  text: string;
  mood: 'positive' | 'neutral' | 'challenging';
  timestamp: Date;
}

export type ScreenName = 'title' | 'contacts' | 'message' | 'home';
export type TabName = 'friends' | 'home' | 'profile';