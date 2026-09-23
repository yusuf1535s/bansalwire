import { createClient } from '@supabase/supabase-js'
import type { Product, Enquiry, User, PageContent, TeamMember } from '../types'
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
 * ENQUIRIES DB OPERATIONS
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
    const { error } = await supabase.from('enquiries').upsert([
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
    if (error) throw error
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
    if (error) throw error
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
    if (error) throw error
    return true
  } catch (err) {
    console.error('Supabase deleteEnquiry error:', err)
    return false
  }
}

/**
 * NOTIFICATIONS DB OPERATIONS
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
    const { error } = await supabase.from('notifications').upsert([
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
    if (error) throw error
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
    if (error) throw error
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
    if (error) throw error
    return true
  } catch (err) {
    console.error('Supabase markAllNotificationsRead error:', err)
    return false
  }
}

/**
 * PRODUCTS DB OPERATIONS
 */
export async function fetchProductsDB(): Promise<Product[]> {
  if (!supabase) return []
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.warn('Error fetching products from Supabase:', error.message)
      return []
    }
    return (data as Product[]) || []
  } catch (err) {
    console.error('Supabase fetchProducts error:', err)
    return []
  }
}

export async function insertProductDB(product: Product): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase.from('products').upsert([
      {
        id: product.id,
        name: product.name,
        category: product.category,
        subCategory: product.subCategory || null,
        description: product.description,
        specifications: product.specifications || [],
        applications: product.applications || [],
        image: product.image || null
      }
    ])
    if (error) throw error
    return true
  } catch (err) {
    console.error('Supabase insertProduct error:', err)
    return false
  }
}

export async function updateProductDB(id: string, updates: Partial<Product>): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
    if (error) throw error
    return true
  } catch (err) {
    console.error('Supabase updateProduct error:', err)
    return false
  }
}

export async function deleteProductDB(id: string): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    if (error) throw error
    return true
  } catch (err) {
    console.error('Supabase deleteProduct error:', err)
    return false
  }
}

/**
 * USERS DB OPERATIONS
 */
export async function fetchUsersDB(): Promise<User[]> {
  if (!supabase) return []
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.warn('Error fetching users from Supabase:', error.message)
      return []
    }
    return (data as User[]) || []
  } catch (err) {
    console.error('Supabase fetchUsers error:', err)
    return []
  }
}

export async function insertUserDB(user: User): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase.from('users').upsert([
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        lastLogin: user.lastLogin || null
      }
    ])
    if (error) throw error
    return true
  } catch (err) {
    console.error('Supabase insertUser error:', err)
    return false
  }
}

export async function updateUserDB(id: string, updates: Partial<User>): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
    if (error) throw error
    return true
  } catch (err) {
    console.error('Supabase updateUser error:', err)
    return false
  }
}

export async function deleteUserDB(id: string): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
    if (error) throw error
    return true
  } catch (err) {
    console.error('Supabase deleteUser error:', err)
    return false
  }
}

/**
 * TEAM MEMBERS DB OPERATIONS
 */
export async function fetchTeamMembersDB(): Promise<TeamMember[]> {
  if (!supabase) return []
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.warn('Error fetching team members from Supabase:', error.message)
      return []
    }
    return (data as TeamMember[]) || []
  } catch (err) {
    console.error('Supabase fetchTeamMembers error:', err)
    return []
  }
}

export async function insertTeamMemberDB(member: TeamMember): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase.from('team_members').upsert([
      {
        id: member.id,
        name: member.name,
        designation: member.designation,
        division: member.division || null,
        image: member.image || null
      }
    ])
    if (error) throw error
    return true
  } catch (err) {
    console.error('Supabase insertTeamMember error:', err)
    return false
  }
}

export async function updateTeamMemberDB(id: string, updates: Partial<TeamMember>): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase
      .from('team_members')
      .update(updates)
      .eq('id', id)
    if (error) throw error
    return true
  } catch (err) {
    console.error('Supabase updateTeamMember error:', err)
    return false
  }
}

export async function deleteTeamMemberDB(id: string): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id)
    if (error) throw error
    return true
  } catch (err) {
    console.error('Supabase deleteTeamMember error:', err)
    return false
  }
}

/**
 * PAGE CONTENTS DB OPERATIONS
 */
export async function fetchPageContentsDB(): Promise<PageContent[]> {
  if (!supabase) return []
  try {
    const { data, error } = await supabase
      .from('page_contents')
      .select('*')
      .order('slug', { ascending: true })

    if (error) {
      console.warn('Error fetching page contents from Supabase:', error.message)
      return []
    }
    return (data as PageContent[]) || []
  } catch (err) {
    console.error('Supabase fetchPageContents error:', err)
    return []
  }
}

export async function updatePageContentDB(id: string, updates: Partial<PageContent>): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase
      .from('page_contents')
      .update(updates)
      .eq('id', id)
    if (error) throw error
    return true
  } catch (err) {
    console.error('Supabase updatePageContent error:', err)
    return false
  }
}

export async function insertPageContentDB(page: PageContent): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase.from('page_contents').upsert([
      {
        id: page.id,
        slug: page.slug,
        title: page.title,
        content: page.content,
        metaDescription: page.metaDescription || null,
        isActive: page.isActive,
        updatedAt: page.updatedAt
      }
    ])
    if (error) throw error
    return true
  } catch (err) {
    console.error('Supabase insertPageContent error:', err)
    return false
  }
}
