// utils/database.ts
import { supabase } from './supabaseClient';

// Get user's contacts
export async function getContacts(userId: string) {
  const { data, error } = await supabase
    .from('contacts')
    .select(`
      id,
      contact_user_id,
      status,
      contact_profile:profiles!contacts_contact_user_id_fkey (
        id,
        username,
        icon_color
      )
    `)
    .eq('user_id', userId)
    .eq('status', 'friend');

  if (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }

  return data.map((contact: any) => {
    const profile = Array.isArray(contact.contact_profile) 
      ? contact.contact_profile[0] 
      : contact.contact_profile;
    
    if (!profile) return null;
    
    return {
      id: profile.id,
      name: profile.username,
      color: profile.icon_color,
    };
  }).filter((item): item is { id: string; name: string; color: string } => item !== null);
}

// Get pending invites
export async function getPendingInvites(userId: string) {
  return [];
}

// Get active portals
export async function getActivePortals(userId: string) {
  const { data, error } = await supabase
    .from('portals')
    .select(`
      id,
      user1_id,
      user2_id,
      status,
      last_active,
      user1_profile:profiles!portals_user1_id_fkey (
        id,
        username,
        icon_color
      ),
      user2_profile:profiles!portals_user2_id_fkey (
        id,
        username,
        icon_color
      )
    `)
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .eq('status', 'active')
    .order('last_active', { ascending: false });

  if (error) {
    console.error('Error fetching portals:', error);
    return [];
  }

  return data.map((portal: any) => {
    const user1 = Array.isArray(portal.user1_profile) 
      ? portal.user1_profile[0] 
      : portal.user1_profile;
    const user2 = Array.isArray(portal.user2_profile) 
      ? portal.user2_profile[0] 
      : portal.user2_profile;
    
    const otherUser = portal.user1_id === userId ? user2 : user1;
    if (!otherUser) return null;
    
    const timeDiff = new Date().getTime() - new Date(portal.last_active).getTime();
    const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
    
    let lastActive = '';
    if (hoursAgo < 1) {
      lastActive = 'Just now';
    } else if (hoursAgo < 24) {
      lastActive = `${hoursAgo}h ago`;
    } else {
      const daysAgo = Math.floor(hoursAgo / 24);
      lastActive = `${daysAgo}d ago`;
    }

    return {
      id: otherUser.id,
      name: otherUser.username,
      color: otherUser.icon_color,
      lastActive,
    };
  }).filter((item): item is { id: string; name: string; color: string; lastActive: string } => item !== null);
}

// Get portal requests
export async function getPortalRequests(userId: string) {
  const { data, error } = await supabase
    .from('portals')
    .select(`
      id,
      user1_id,
      created_at,
      user1_profile:profiles!portals_user1_id_fkey (
        id,
        username,
        icon_color
      )
    `)
    .eq('user2_id', userId)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching portal requests:', error);
    return [];
  }

  return data.map((portal: any) => {
    const user1 = Array.isArray(portal.user1_profile) 
      ? portal.user1_profile[0] 
      : portal.user1_profile;
    
    if (!user1) return null;
    
    const timeDiff = new Date().getTime() - new Date(portal.created_at).getTime();
    const minutesAgo = Math.floor(timeDiff / (1000 * 60));
    
    let requestTime = '';
    if (minutesAgo < 1) {
      requestTime = 'Just now';
    } else if (minutesAgo < 60) {
      requestTime = `${minutesAgo}m ago`;
    } else {
      const hoursAgo = Math.floor(minutesAgo / 60);
      requestTime = `${hoursAgo}h ago`;
    }

    return {
      id: user1.id,
      name: user1.username,
      color: user1.icon_color,
      requestTime,
    };
  }).filter((item): item is { id: string; name: string; color: string; requestTime: string } => item !== null);
}

// Create a new portal
export async function createPortal(user1Id: string, user2Id: string) {
  const { data, error } = await supabase
    .from('portals')
    .insert([
      {
        user1_id: user1Id,
        user2_id: user2Id,
        status: 'pending',
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating portal:', error);
    throw error;
  }

  return data;
}

// Accept a portal request
export async function acceptPortalRequest(portalId: string) {
  const { error } = await supabase
    .from('portals')
    .update({ status: 'active' })
    .eq('id', portalId);

  if (error) {
    console.error('Error accepting portal:', error);
    throw error;
  }
}

// Add a contact
export async function addContact(userId: string, contactUserId: string) {
  const { data, error } = await supabase
    .from('contacts')
    .insert([
      {
        user_id: userId,
        contact_user_id: contactUserId,
        status: 'friend',
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error adding contact:', error);
    throw error;
  }

  return data;
}

// Search for users by username
export async function searchUsers(query: string, currentUserId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, icon_color')
    .ilike('username', `%${query}%`)
    .neq('id', currentUserId)
    .limit(10);

  if (error) {
    console.error('Error searching users:', error);
    return [];
  }

  return data.map(user => ({
    id: user.id,
    name: user.username,
    color: user.icon_color,
  }));
}

// Get or create a portal between two users
export async function getOrCreatePortal(user1Id: string, user2Id: string) {
  try {
    // First try to find existing portal
    const { data: existingPortal } = await supabase
      .from('portals')
      .select('id, status')
      .or(`and(user1_id.eq.${user1Id},user2_id.eq.${user2Id}),and(user1_id.eq.${user2Id},user2_id.eq.${user1Id})`)
      .maybeSingle();

    if (existingPortal) {
      return existingPortal.id;
    }

    // Create new portal if none exists
    const { data: newPortal, error: createError } = await supabase
      .from('portals')
      .insert([
        {
          user1_id: user1Id,
          user2_id: user2Id,
          status: 'active',
        }
      ])
      .select('id')
      .single();

    if (createError) {
      console.error('Error creating portal:', createError);
      throw createError;
    }

    return newPortal.id;
  } catch (error) {
    console.error('Error in getOrCreatePortal:', error);
    throw error;
  }
}

// Expectations functions
export async function saveExpectation(
  portalId: string,
  userId: string,
  section: 'section1' | 'section2' | 'section3',
  text: string
) {
  const { data, error } = await supabase
    .from('expectations')
    .insert([
      {
        portal_id: portalId,
        user_id: userId,
        section,
        text: text.trim(),
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error saving expectation:', error);
    throw error;
  }

  return data;
}

export async function getLatestExpectation(
  portalId: string,
  userId: string,
  section: 'section1' | 'section2' | 'section3'
) {
  const { data, error } = await supabase
    .from('expectations')
    .select('text, created_at')
    .eq('portal_id', portalId)
    .eq('user_id', userId)
    .eq('section', section)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching expectation:', error);
    return null;
  }

  return data;
}

export async function getAllExpectations(portalId: string, userId: string) {
  const { data, error } = await supabase
    .from('expectations')
    .select('section, text, created_at')
    .eq('portal_id', portalId)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching expectations:', error);
    return [];
  }

  const grouped: Record<string, any> = {};
  data.forEach(item => {
    if (!grouped[item.section]) {
      grouped[item.section] = item;
    }
  });

  return grouped;
}

// Portal Progress functions
export async function getPortalProgress(portalId: string, userId: string) {
  const { data, error } = await supabase
    .from('portal_progress')
    .select('*')
    .eq('portal_id', portalId)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching portal progress:', error);
    return {
      inviteAccepted: false,
      expectationsCompleted: false,
      assurancesCompleted: false,
      reflectCompleted: false,
    };
  }

  if (!data) {
    return {
      inviteAccepted: false,
      expectationsCompleted: false,
      assurancesCompleted: false,
      reflectCompleted: false,
    };
  }

  return {
    inviteAccepted: data.invite_accepted || false,
    expectationsCompleted: data.expectations_completed || false,
    assurancesCompleted: data.assurances_completed || false,
    reflectCompleted: data.reflect_completed || false,
  };
}

export async function updatePortalProgress(
  portalId: string,
  userId: string,
  progress: {
    inviteAccepted?: boolean;
    expectationsCompleted?: boolean;
    assurancesCompleted?: boolean;
    reflectCompleted?: boolean;
  }
) {
  const { data, error } = await supabase
    .from('portal_progress')
    .upsert({
      portal_id: portalId,
      user_id: userId,
      invite_accepted: progress.inviteAccepted,
      expectations_completed: progress.expectationsCompleted,
      assurances_completed: progress.assurancesCompleted,
      reflect_completed: progress.reflectCompleted,
    }, {
      onConflict: 'portal_id,user_id'
    })
    .select()
    .single();

  if (error) {
    console.error('Error updating portal progress:', error);
    throw error;
  }

  return data;
}

export async function resetPortalProgress(portalId: string, userId: string) {
  const { error } = await supabase
    .from('portal_progress')
    .delete()
    .eq('portal_id', portalId)
    .eq('user_id', userId);

  if (error) {
    console.error('Error resetting portal progress:', error);
    throw error;
  }
}