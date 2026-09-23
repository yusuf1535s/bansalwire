import { createClient } from '@supabase/supabase-js'
import type { Enquiry } from '../types'
import type { AdminNotification } from '../store/useStore'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('http') && 
  !supabaseUrl.includes('your-supabase-url')
)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

/**
 * Enquiries DB Operations
 */
export async function fetchEnquiriesDB(): Promise<Enquiry[]> {
  if (!supabase) return []
  try {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) {
      console.warn('Error fetching enquiries from Supabase:', error.message)
      return []
    }
    return (data as Enquiry[]) || []
  } catch (err) {
    console.error('Supabase fetchEnquiries error:', err)
    return []
  }
}

export async function insertEnquiryDB(enquiry: Enquiry): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase.from('enquiries').insert([
      {
        id: enquiry.id,
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone || null,
        company: enquiry.company || null,
        category: enquiry.category || null,
        productCategory: enquiry.productCategory || enquiry.category || null,
        subCategory: enquiry.subCategory || null,
        productSubCategory: enquiry.productSubCategory || enquiry.subCategory || null,
        country: enquiry.country || null,
        message: enquiry.message,
        status: enquiry.status || 'new',
        createdAt: enquiry.createdAt || new Date().toISOString().split('T')[0]
      }
    ])

    if (error) {
      console.error('Error inserting enquiry to Supabase:', error.message)
      return false
    }
    return true
  } catch (err) {
    console.error('Supabase insertEnquiry error:', err)
    return false
  }
}

export async function updateEnquiryStatusDB(id: string, status: Enquiry['status']): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase
      .from('enquiries')
      .update({ status })
      .eq('id', id)

    if (error) {
      console.error('Error updating enquiry status in Supabase:', error.message)
      return false
    }
    return true
  } catch (err) {
    console.error('Supabase updateEnquiryStatus error:', err)
    return false
  }
}

export async function deleteEnquiryDB(id: string): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting enquiry from Supabase:', error.message)
      return false
    }
    return true
  } catch (err) {
    console.error('Supabase deleteEnquiry error:', err)
    return false
  }
}

/**
 * Notifications DB Operations
 */
export async function fetchNotificationsDB(): Promise<AdminNotification[]> {
  if (!supabase) return []
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('timestamp', { ascending: false })

    if (error) {
      console.warn('Error fetching notifications from Supabase:', error.message)
      return []
    }
    return (data as AdminNotification[]) || []
  } catch (err) {
    console.error('Supabase fetchNotifications error:', err)
    return []
  }
}

export async function insertNotificationDB(notif: AdminNotification): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase.from('notifications').insert([
      {
        id: notif.id,
        title: notif.title,
        message: notif.message,
        timestamp: notif.timestamp,
        isRead: notif.isRead,
        link: notif.link || null,
        enquiryId: notif.enquiryId || null
      }
    ])

    if (error) {
      console.error('Error inserting notification to Supabase:', error.message)
      return false
    }
    return true
  } catch (err) {
    console.error('Supabase insertNotification error:', err)
    return false
  }
}

export async function markNotificationReadDB(id: string): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ isRead: true })
      .eq('id', id)

    if (error) {
      console.error('Error updating notification read state in Supabase:', error.message)
      return false
    }
    return true
  } catch (err) {
    console.error('Supabase markNotificationRead error:', err)
    return false
  }
}

export async function markAllNotificationsReadDB(): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ isRead: true })
      .eq('isRead', false)

    if (error) {
      console.error('Error marking all notifications read in Supabase:', error.message)
      return false
    }
    return true
  } catch (err) {
    console.error('Supabase markAllNotificationsRead error:', err)
    return false
  }
}
