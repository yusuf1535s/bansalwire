import { create } from 'zustand'
import type { Product, Enquiry, User, PageContent, TeamMember } from '../types'
import {
  isSupabaseConfigured,
  supabase,
  fetchEnquiriesDB,
  insertEnquiryDB,
  updateEnquiryStatusDB,
  deleteEnquiryDB,
  fetchNotificationsDB,
  insertNotificationDB,
  markNotificationReadDB,
  markAllNotificationsReadDB,
  fetchProductsDB,
  insertProductDB,
  updateProductDB,
  deleteProductDB,
  fetchUsersDB,
  insertUserDB,
  updateUserDB,
  deleteUserDB,
  fetchTeamMembersDB,
  insertTeamMemberDB,
  deleteTeamMemberDB,
  fetchPageContentsDB,
  updatePageContentDB
} from '../services/supabase'

export interface AdminNotification {
  id: string
  title: string
  message: string
  timestamp: string
  isRead: boolean
  link?: string
  enquiryId?: string
}

interface AppState {
  products: Product[]
  enquiries: Enquiry[]
  users: User[]
  pageContents: PageContent[]
  teamMembers: TeamMember[]
  notifications: AdminNotification[]
  latestToast: AdminNotification | null
  isAdminLoggedIn: boolean
  isSyncingDb: boolean

  setAdminLogin: (val: boolean) => void
  addProduct: (product: Product) => Promise<void>
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>

  addEnquiry: (enquiry: Enquiry) => Promise<void>
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => Promise<void>
  deleteEnquiry: (id: string) => Promise<void>

  fetchEnquiriesFromSupabase: () => Promise<void>
  fetchNotificationsFromSupabase: () => Promise<void>
  fetchProductsFromSupabase: () => Promise<void>
  fetchUsersFromSupabase: () => Promise<void>
  fetchTeamMembersFromSupabase: () => Promise<void>
  fetchPageContentsFromSupabase: () => Promise<void>
  syncWithSupabase: () => Promise<void>

  updatePageContent: (id: string, content: Partial<PageContent>) => Promise<void>

  addUser: (user: User) => Promise<void>
  updateUser: (id: string, user: Partial<User>) => Promise<void>
  deleteUser: (id: string) => Promise<void>

  addTeamMember: (member: TeamMember) => Promise<void>
  deleteTeamMember: (id: string) => Promise<void>

  markNotificationRead: (id: string) => Promise<void>
  markAllNotificationsRead: () => Promise<void>
  clearToast: () => void

  isDarkMode: boolean
  toggleDarkMode: () => void
  setDarkMode: (val: boolean) => void
}

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Stainless Steel Wires',
    category: 'Stainless Steel',
    subCategory: 'SS Wires (0.04mm - 15.65mm)',
    description: 'Grades 200, 300, 400 series for spring, weaving, welding, and cold heading fasteners.',
    image: '/images/bansal/Wires-320x320.jpg',
    specifications: ['Diameter: 0.04mm - 15.65mm', 'Grades: AISI 304, 316, 302, 410, 430', 'Tensile: up to 2200 N/mm²'],
    applications: ['Automotive', 'Springs', 'Fasteners', 'Electro-polishing', 'Weaving Mesh']
  },
  {
    id: '2',
    name: 'Mild Steel Wires (Low Carbon)',
    category: 'Mild Steel',
    subCategory: 'Low Carbon HB & Annealed',
    description: 'Drawn from prime mild steel wire rods for general engineering, binding, hardware, and fasteners.',
    image: '/images/bansal/Low-Carbon-Steel-Wires--320x320.png',
    specifications: ['Diameter: 0.1mm - 12.0mm', 'Grade: AISI 1008 - 1018', 'Finish: Annealed & Hard Bright'],
    applications: ['Construction', 'Nails', 'Binding', 'Wire Mesh', 'Hardware']
  },
  {
    id: '3',
    name: 'High Carbon Steel Wires',
    category: 'High Carbon',
    subCategory: 'Patented Spring & Rope Wire',
    description: 'High tensile spring wires, tyre bead wires, mattress wire, and auto control cables with precise patenting.',
    image: '/images/bansal/630c9aa3-ffc1-4bd7-9c09-24d2905d93f6-1-320x320.png',
    specifications: ['Diameter: 0.1mm - 10.0mm', 'Grade: C45 to C85 High Carbon', 'Tensile: High Elasticity'],
    applications: ['Mechanical Springs', 'Mattresses', 'Wire Ropes', 'Tyre Beads', 'Auto Cables']
  },
  {
    id: '4',
    name: 'Profile / Shaped Wires',
    category: 'Profile',
    subCategory: 'Custom Shaped Cross-Sections',
    description: 'Custom profile cross-sections including Flat, Square, Half-Round, Oval, Trapezoidal, and Wedge shapes.',
    image: '/images/bansal/Profile-Shaped-Wires-Updated.jpg',
    specifications: ['Shapes: Flat, Square, Oval, Trapezoid', 'Tolerance: ±0.01 mm', 'Finish: Bright Polished'],
    applications: ['Wiper Blades', 'Textile Reeds', 'Lock Springs', 'Precision Engineering']
  },
  {
    id: '5',
    name: 'Aluminium Alloy Wires',
    category: 'Aluminium',
    subCategory: 'Alloy 5000 / 6000 Series',
    description: 'Lightweight aluminium alloy wires for electrical conductors, rivets, and precision screening meshes.',
    image: '/images/bansal/Aluminium-Alloy-Wires-Supplier-in-India-320x320.png',
    specifications: ['Alloy: 1350, 5052, 6201', 'Diameter: 0.1mm - 10.0mm', 'Conductivity: High EC'],
    applications: ['Electrical Cables', 'Rivets', 'Filtration Mesh', 'Cold Heading']
  },
  {
    id: '6',
    name: 'Galvanized Steel Wires (GI)',
    category: 'Galvanized',
    subCategory: 'Hot Dip & Electro GI',
    description: 'Heavy zinc coated wires for boundary fences, vineyards, ACSR power transmission, and mesh.',
    image: '/images/bansal/Galvanized-Wire.jpg',
    specifications: ['Zinc Coating: Class A / B / C', 'Diameter: 0.5mm - 6.0mm', 'Standards: IS 280'],
    applications: ['Power Lines', 'Fencing', 'Agriculture', 'Cable Armouring', 'Netting']
  },
  {
    id: '7',
    name: 'Cable Armouring Wires & Strips',
    category: 'Cable Armouring',
    subCategory: 'Galvanized Round & Formed Flat Strips',
    description: 'Mechanical protective armouring wires for high-voltage power cables and subsea telecom cables.',
    image: '/images/bansal/Cable-Armouring-Wires-Strips.jpg',
    specifications: ['Shapes: Round Wire / Flat Strip', 'Standard: IS 3975 / BS 1442', 'Torsion: High Ductility'],
    applications: ['Subsea Cables', 'Power Transmission', 'Industrial Underground Cables']
  },
  {
    id: '8',
    name: 'Speciality Engineered Wires',
    category: 'Speciality',
    subCategory: 'Wire Rope, Scrubber, Bead Wire',
    description: 'Engineered specialty wires for tyre beads, wire ropes, scrubbing pads, and building materials.',
    image: '/images/bansal/Wire-Rope-Updated-Last.jpg',
    specifications: ['Tensile: up to 2800 MPa', 'Bronze / Zinc / Stainless Coating', 'Custom Profiles'],
    applications: ['Civil Infrastructure', 'Masonry Fastening', 'Precast Concrete']
  }
]

const loadProducts = (): Product[] => {
  try {
    const saved = localStorage.getItem('bansal_products')
    if (saved) return JSON.parse(saved)
  } catch (e) {
    console.error('Failed to load products from localStorage', e)
  }
  return defaultProducts
}

const loadEnquiries = (): Enquiry[] => {
  try {
    const saved = localStorage.getItem('bansal_enquiries')
    if (saved) return JSON.parse(saved)
  } catch (e) {
    console.error('Failed to load enquiries from localStorage', e)
  }
  return []
}

const loadNotifications = (): AdminNotification[] => {
  try {
    const saved = localStorage.getItem('bansal_notifications')
    if (saved) return JSON.parse(saved)
  } catch (e) {
    console.error('Failed to load notifications from localStorage', e)
  }
  return []
}

const defaultUsers: User[] = [
  { id: '1', name: 'Yusuf (Super Admin)', email: 'yusuf@gmail.com', role: 'admin', isActive: true, lastLogin: '2026-09-24 00:35' },
  { id: '2', name: 'Technical Sales Lead', email: 'sales.lead@bansalwire.com', role: 'editor', isActive: true, lastLogin: '2026-09-23 16:40' },
]

const loadUsers = (): User[] => {
  try {
    const saved = localStorage.getItem('bansal_users')
    if (saved) return JSON.parse(saved)
  } catch (e) {
    console.error('Failed to load users from localStorage', e)
  }
  return defaultUsers
}

const defaultPageContents: PageContent[] = [
  { id: '1', slug: 'home', title: 'Home Page', content: '<p>Stainless Steel Wire Suppliers & Exporters in India</p>', metaDescription: 'India leading manufacturer of precision steel wires since 1938', isActive: true, updatedAt: '2026-09-24' },
  { id: '2', slug: 'about', title: 'About Us', content: '<p>Bansal Wire Industries Ltd. corporate legacy and vision</p>', metaDescription: 'About Bansal Wire history, leadership, and plants', isActive: true, updatedAt: '2026-09-24' },
  { id: '3', slug: 'products', title: 'Products Catalog', content: '<p>Over 3,000 precision wire SKUs</p>', metaDescription: 'Complete steel wire catalog and ASTM specifications', isActive: true, updatedAt: '2026-09-24' },
  { id: '4', slug: 'contact', title: 'Contact & Support', content: '<p>Corporate Office and Plant directories</p>', metaDescription: 'Direct phone lines and RFQ submission portal', isActive: true, updatedAt: '2026-09-24' },
]

const loadPageContents = (): PageContent[] => {
  try {
    const saved = localStorage.getItem('bansal_page_contents')
    if (saved) return JSON.parse(saved)
  } catch (e) {
    console.error('Failed to load page contents from localStorage', e)
  }
  return defaultPageContents
}

const defaultTeamMembers: TeamMember[] = [
  { id: '1', name: 'Sh. Arun Gupta', designation: 'Managing Director', division: 'Executive Leadership', image: '/images/bansal/1-1.png' },
  { id: '2', name: 'Sh. Ramnivas Yadav', designation: 'Director', division: 'Galvanised Wire Division', image: '/images/bansal/2-1.png' },
  { id: '3', name: 'Sh. S.K. Agarwal', designation: 'Director', division: 'Profile / Shaped Wire Division', image: '/images/bansal/3-1.png' },
  { id: '4', name: 'Sh. Pranav Bansal', designation: 'Director & Operations', division: 'Mega Dadri Complex', image: '/images/bansal/4-1.png' },
  { id: '5', name: 'Sh. Yogesh Oberoi', designation: 'Director', division: 'Aluminium Alloy Division', image: '/images/bansal/5.png' },
  { id: '6', name: 'Sh. Manoj Dave', designation: 'Head of Technical Quality & Metallurgy', division: 'Quality Labs', image: '/images/bansal/6.png' },
]

const loadTeamMembers = (): TeamMember[] => {
  try {
    const saved = localStorage.getItem('bansal_team_members')
    if (saved) return JSON.parse(saved)
  } catch (e) {
    console.error('Failed to load team members from localStorage', e)
  }
  return defaultTeamMembers
}

const loadTheme = (): boolean => {
  try {
    const saved = localStorage.getItem('bansal_theme')
    if (saved) {
      const isDark = saved === 'dark'
      if (isDark && typeof document !== 'undefined') {
        document.documentElement.classList.add('dark')
      }
      return isDark
    }
  } catch (e) {
    console.error('Failed loading theme from localStorage', e)
  }
  return false
}

// Apply dark class on initial evaluation
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('bansal_theme')
    if (saved === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  } catch (e) {
    // Ignore error
  }
}

export const useStore = create<AppState>((set, get) => ({
  products: loadProducts(),
  enquiries: loadEnquiries(),
  users: loadUsers(),
  pageContents: loadPageContents(),
  teamMembers: loadTeamMembers(),
  notifications: loadNotifications(),
  latestToast: null,
  isAdminLoggedIn: false,
  isSyncingDb: false,
  isDarkMode: loadTheme(),

  toggleDarkMode: () =>
    set((state) => {
      const next = !state.isDarkMode
      try {
        localStorage.setItem('bansal_theme', next ? 'dark' : 'light')
        if (next) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      } catch (e) {
        console.error('Failed toggling dark mode', e)
      }
      return { isDarkMode: next }
    }),

  setDarkMode: (val) =>
    set(() => {
      try {
        localStorage.setItem('bansal_theme', val ? 'dark' : 'light')
        if (val) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      } catch (e) {
        console.error('Failed setting dark mode', e)
      }
      return { isDarkMode: val }
    }),

  setAdminLogin: (val) => {
    set({ isAdminLoggedIn: val })
    if (val) {
      get().syncWithSupabase()
    }
  },

  // PRODUCTS ACTIONS
  addProduct: async (product) => {
    const next = [product, ...get().products.filter((p) => p.id !== product.id)]
    try {
      localStorage.setItem('bansal_products', JSON.stringify(next))
    } catch (e) {
      console.error('Failed saving product to localStorage', e)
    }
    set({ products: next })

    if (isSupabaseConfigured) {
      insertProductDB(product).catch((err) => console.error('Failed Supabase product insert:', err))
    }
  },

  updateProduct: async (id, updates) => {
    const next = get().products.map((p) => (p.id === id ? { ...p, ...updates } : p))
    try {
      localStorage.setItem('bansal_products', JSON.stringify(next))
    } catch (e) {
      console.error('Failed updating product in localStorage', e)
    }
    set({ products: next })

    if (isSupabaseConfigured) {
      updateProductDB(id, updates).catch((err) => console.error('Failed Supabase product update:', err))
    }
  },

  deleteProduct: async (id) => {
    const next = get().products.filter((p) => p.id !== id)
    try {
      localStorage.setItem('bansal_products', JSON.stringify(next))
    } catch (e) {
      console.error('Failed deleting product from localStorage', e)
    }
    set({ products: next })

    if (isSupabaseConfigured) {
      deleteProductDB(id).catch((err) => console.error('Failed Supabase product delete:', err))
    }
  },

  // USERS ACTIONS
  addUser: async (user) => {
    const next = [user, ...get().users.filter((u) => u.id !== user.id)]
    try {
      localStorage.setItem('bansal_users', JSON.stringify(next))
    } catch (e) {
      console.error('Failed saving user to localStorage', e)
    }
    set({ users: next })

    if (isSupabaseConfigured) {
      insertUserDB(user).catch((err) => console.error('Failed Supabase user insert:', err))
    }
  },

  updateUser: async (id, updates) => {
    const next = get().users.map((u) => (u.id === id ? { ...u, ...updates } : u))
    try {
      localStorage.setItem('bansal_users', JSON.stringify(next))
    } catch (e) {
      console.error('Failed updating user in localStorage', e)
    }
    set({ users: next })

    if (isSupabaseConfigured) {
      updateUserDB(id, updates).catch((err) => console.error('Failed Supabase user update:', err))
    }
  },

  deleteUser: async (id) => {
    const next = get().users.filter((u) => u.id !== id)
    try {
      localStorage.setItem('bansal_users', JSON.stringify(next))
    } catch (e) {
      console.error('Failed deleting user from localStorage', e)
    }
    set({ users: next })

    if (isSupabaseConfigured) {
      deleteUserDB(id).catch((err) => console.error('Failed Supabase user delete:', err))
    }
  },

  // TEAM MEMBERS ACTIONS
  addTeamMember: async (member) => {
    const next = [member, ...get().teamMembers.filter((m) => m.id !== member.id)]
    try {
      localStorage.setItem('bansal_team_members', JSON.stringify(next))
    } catch (e) {
      console.error('Failed saving team member to localStorage', e)
    }
    set({ teamMembers: next })

    if (isSupabaseConfigured) {
      insertTeamMemberDB(member).catch((err) => console.error('Failed Supabase team member insert:', err))
    }
  },

  deleteTeamMember: async (id) => {
    const next = get().teamMembers.filter((m) => m.id !== id)
    try {
      localStorage.setItem('bansal_team_members', JSON.stringify(next))
    } catch (e) {
      console.error('Failed deleting team member from localStorage', e)
    }
    set({ teamMembers: next })

    if (isSupabaseConfigured) {
      deleteTeamMemberDB(id).catch((err) => console.error('Failed Supabase team member delete:', err))
    }
  },

  // PAGE CONTENTS ACTIONS
  updatePageContent: async (id, content) => {
    const next = get().pageContents.map((c) =>
      c.id === id ? { ...c, ...content, updatedAt: new Date().toISOString().split('T')[0] } : c
    )
    try {
      localStorage.setItem('bansal_page_contents', JSON.stringify(next))
    } catch (e) {
      console.error('Failed updating page content in localStorage', e)
    }
    set({ pageContents: next })

    if (isSupabaseConfigured) {
      updatePageContentDB(id, { ...content, updatedAt: new Date().toISOString().split('T')[0] }).catch((err) =>
        console.error('Failed Supabase page content update:', err)
      )
    }
  },

  // ENQUIRIES ACTIONS
  addEnquiry: async (enquiry) => {
    const nextEnquiries = [enquiry, ...get().enquiries.filter((e) => e.id !== enquiry.id)]
    try {
      localStorage.setItem('bansal_enquiries', JSON.stringify(nextEnquiries))
    } catch (e) {
      console.error('Failed saving enquiry to localStorage', e)
    }

    const newNotif: AdminNotification = {
      id: `notif-${Date.now()}`,
      title: `New Lead: ${enquiry.name}`,
      message: `${enquiry.productCategory || enquiry.category || 'Wire Inquiry'} - ${enquiry.company || enquiry.email}`,
      timestamp: 'Just now',
      isRead: false,
      link: '/admin/enquiries',
      enquiryId: enquiry.id
    }
    const nextNotifs = [newNotif, ...get().notifications.filter((n) => n.id !== newNotif.id)]
    try {
      localStorage.setItem('bansal_notifications', JSON.stringify(nextNotifs))
    } catch (e) {
      console.error('Failed saving notification to localStorage', e)
    }

    set({
      enquiries: nextEnquiries,
      notifications: nextNotifs,
      latestToast: newNotif
    })

    if (isSupabaseConfigured) {
      insertEnquiryDB(enquiry).catch((err) => console.error('Failed Supabase enquiry insert:', err))
      insertNotificationDB(newNotif).catch((err) => console.error('Failed Supabase notification insert:', err))
    }
  },

  updateEnquiryStatus: async (id, status) => {
    const next = get().enquiries.map((e) => (e.id === id ? { ...e, status } : e))
    try {
      localStorage.setItem('bansal_enquiries', JSON.stringify(next))
    } catch (e) {
      console.error('Failed updating enquiry in localStorage', e)
    }
    set({ enquiries: next })

    if (isSupabaseConfigured) {
      updateEnquiryStatusDB(id, status).catch((err) => console.error('Failed Supabase status update:', err))
    }
  },

  deleteEnquiry: async (id) => {
    const next = get().enquiries.filter((e) => e.id !== id)
    try {
      localStorage.setItem('bansal_enquiries', JSON.stringify(next))
    } catch (e) {
      console.error('Failed deleting enquiry from localStorage', e)
    }
    set({ enquiries: next })

    if (isSupabaseConfigured) {
      deleteEnquiryDB(id).catch((err) => console.error('Failed Supabase enquiry delete:', err))
    }
  },

  // NOTIFICATIONS ACTIONS
  markNotificationRead: async (id) => {
    const next = get().notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    try {
      localStorage.setItem('bansal_notifications', JSON.stringify(next))
    } catch (e) {
      console.error('Failed updating notifications in localStorage', e)
    }
    set({ notifications: next })

    if (isSupabaseConfigured) {
      markNotificationReadDB(id).catch((err) => console.error('Failed Supabase notification read update:', err))
    }
  },

  markAllNotificationsRead: async () => {
    const next = get().notifications.map((n) => ({ ...n, isRead: true }))
    try {
      localStorage.setItem('bansal_notifications', JSON.stringify(next))
    } catch (e) {
      console.error('Failed updating notifications in localStorage', e)
    }
    set({ notifications: next })

    if (isSupabaseConfigured) {
      markAllNotificationsReadDB().catch((err) => console.error('Failed Supabase mark all read:', err))
    }
  },

  clearToast: () => set({ latestToast: null }),

  // SUPABASE FETCH INDIVIDUAL TABLES
  fetchEnquiriesFromSupabase: async () => {
    if (!isSupabaseConfigured) return
    try {
      const dbEnquiries = await fetchEnquiriesDB()
      if (dbEnquiries && dbEnquiries.length > 0) {
        set({ enquiries: dbEnquiries })
        localStorage.setItem('bansal_enquiries', JSON.stringify(dbEnquiries))
      }
    } catch (e) {
      console.error('Error in fetchEnquiriesFromSupabase:', e)
    }
  },

  fetchNotificationsFromSupabase: async () => {
    if (!isSupabaseConfigured) return
    try {
      const dbNotifs = await fetchNotificationsDB()
      if (dbNotifs && dbNotifs.length > 0) {
        set({ notifications: dbNotifs })
        localStorage.setItem('bansal_notifications', JSON.stringify(dbNotifs))
      }
    } catch (e) {
      console.error('Error in fetchNotificationsFromSupabase:', e)
    }
  },

  fetchProductsFromSupabase: async () => {
    if (!isSupabaseConfigured) return
    try {
      const dbProducts = await fetchProductsDB()
      if (dbProducts && dbProducts.length > 0) {
        set({ products: dbProducts })
        localStorage.setItem('bansal_products', JSON.stringify(dbProducts))
      } else {
        // Seed initial default products to Supabase if table is empty
        for (const p of defaultProducts) {
          insertProductDB(p).catch(() => {})
        }
      }
    } catch (e) {
      console.error('Error in fetchProductsFromSupabase:', e)
    }
  },

  fetchUsersFromSupabase: async () => {
    if (!isSupabaseConfigured) return
    try {
      const dbUsers = await fetchUsersDB()
      if (dbUsers && dbUsers.length > 0) {
        set({ users: dbUsers })
        localStorage.setItem('bansal_users', JSON.stringify(dbUsers))
      } else {
        // Seed initial default users to Supabase if table is empty
        for (const u of defaultUsers) {
          insertUserDB(u).catch(() => {})
        }
      }
    } catch (e) {
      console.error('Error in fetchUsersFromSupabase:', e)
    }
  },

  fetchTeamMembersFromSupabase: async () => {
    if (!isSupabaseConfigured) return
    try {
      const dbTeam = await fetchTeamMembersDB()
      if (dbTeam && dbTeam.length > 0) {
        set({ teamMembers: dbTeam })
        localStorage.setItem('bansal_team_members', JSON.stringify(dbTeam))
      } else {
        // Seed initial default team members to Supabase if table is empty
        for (const m of defaultTeamMembers) {
          insertTeamMemberDB(m).catch(() => {})
        }
      }
    } catch (e) {
      console.error('Error in fetchTeamMembersFromSupabase:', e)
    }
  },

  fetchPageContentsFromSupabase: async () => {
    if (!isSupabaseConfigured) return
    try {
      const dbPages = await fetchPageContentsDB()
      if (dbPages && dbPages.length > 0) {
        set({ pageContents: dbPages })
        localStorage.setItem('bansal_page_contents', JSON.stringify(dbPages))
      }
    } catch (e) {
      console.error('Error in fetchPageContentsFromSupabase:', e)
    }
  },

  // FULL SYNC WITH SUPABASE
  syncWithSupabase: async () => {
    if (!isSupabaseConfigured) return
    set({ isSyncingDb: true })
    try {
      await Promise.all([
        get().fetchEnquiriesFromSupabase(),
        get().fetchNotificationsFromSupabase(),
        get().fetchProductsFromSupabase(),
        get().fetchUsersFromSupabase(),
        get().fetchTeamMembersFromSupabase(),
        get().fetchPageContentsFromSupabase()
      ])
    } finally {
      set({ isSyncingDb: false })
    }
  }
}))

// Auto-sync with Supabase and setup Realtime subscription on startup
if (typeof window !== 'undefined' && isSupabaseConfigured && supabase) {
  // Initial background sync
  useStore.getState().syncWithSupabase()

  // Realtime listeners for all tables
  try {
    supabase
      .channel('bansal-full-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'enquiries' },
        () => useStore.getState().fetchEnquiriesFromSupabase()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications' },
        () => useStore.getState().fetchNotificationsFromSupabase()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => useStore.getState().fetchProductsFromSupabase()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'users' },
        () => useStore.getState().fetchUsersFromSupabase()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'team_members' },
        () => useStore.getState().fetchTeamMembersFromSupabase()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'page_contents' },
        () => useStore.getState().fetchPageContentsFromSupabase()
      )
      .subscribe()
  } catch (err) {
    console.error('Failed setting up Supabase Realtime full sync:', err)
  }
}
