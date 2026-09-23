import { create } from 'zustand'
import type { Product, Enquiry, User, PageContent, TeamMember } from '../types'

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

  setAdminLogin: (val: boolean) => void
  addProduct: (product: Product) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void

  addEnquiry: (enquiry: Enquiry) => void
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => void
  deleteEnquiry: (id: string) => void

  updatePageContent: (id: string, content: Partial<PageContent>) => void

  addUser: (user: User) => void
  updateUser: (id: string, user: Partial<User>) => void
  deleteUser: (id: string) => void

  addTeamMember: (member: TeamMember) => void
  deleteTeamMember: (id: string) => void

  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
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
    name: 'Galvanized Wires (GI)',
    category: 'Galvanized',
    subCategory: 'Heavy & Commercial Zinc Coated',
    description: 'Hot-dip galvanized wires with heavy zinc coating (up to 300 GSM) for extreme weather resistance.',
    image: '/images/bansal/Galvanized-Wire.jpg',
    specifications: ['Diameter: 0.8mm - 5.0mm', 'Zinc Coating: 40 to 300 GSM', 'Standard: IS 280 / ASTM A641'],
    applications: ['Fencing', 'Stay Wires', 'ACSR Core', 'Vineyard Trellising']
  },
  {
    id: '7',
    name: 'Cable Armouring Wires & Strips',
    category: 'Cable Armouring',
    subCategory: 'Round & Formed Flat Strips',
    description: 'Galvanized round wires and formed strips for heavy-duty mechanical protection of power cables.',
    image: '/images/bansal/Cable-Armouring-Wires.jpg',
    specifications: ['Diameter: 1.0mm - 6.0mm', 'Standard: IS 3975 / BS 5467', 'High Tensile Strength'],
    applications: ['Power Transmission Cables', 'Subsea Cabling', 'Instrumentation']
  },
  {
    id: '8',
    name: 'High Tensile Wire Rope',
    category: 'Special Product',
    subCategory: 'Multi-Strand Steel Wire Rope',
    description: 'Galvanized and stainless steel wire ropes engineered for heavy hoisting, cranes, and marine winches.',
    image: '/images/bansal/Anchor-Bolt1.jpg',
    specifications: ['Diameter: 2mm - 50mm', 'Construction: 6x19, 6x36', 'Core: Steel / Fiber Core'],
    applications: ['Elevators', 'Mining', 'Cranes', 'Construction', 'Marine']
  },
  {
    id: '9',
    name: 'Tyre Bead Wire',
    category: 'Special Product',
    subCategory: 'Bronze / Brass Coated Bead',
    description: 'Ultra-high tensile bead wire with superior rubber adhesion for automotive and radial tyres.',
    image: '/images/bansal/Clamps.jpg',
    specifications: ['Diameter: 0.89mm - 1.83mm', 'Coating: Bronze/Brass Plated', 'Tensile: up to 2150 MPa'],
    applications: ['Radial Tyres', 'Commercial Vehicle Tyres', 'Aviation Tyres']
  },
  {
    id: '10',
    name: 'Engineered Wall Ties & Anchor Bolts',
    category: 'Special Product',
    subCategory: 'Structural Construction Fasteners',
    description: 'Stainless steel and galvanized cavity wall ties, masonry connector hooks, and structural anchor bolts.',
    image: '/images/bansal/Hooks1.jpg',
    specifications: ['Material: SS 304 / Galvanized', 'Types: Cavity Ties, Hooks, Bolts', 'ISO Certified'],
    applications: ['Civil Infrastructure', 'Masonry Fastening', 'Precast Concrete']
  }
]

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

const defaultPageContents: PageContent[] = [
  { id: '1', slug: 'home', title: 'Home Page', content: '<p>Stainless Steel Wire Suppliers & Exporters in India</p>', metaDescription: 'India leading manufacturer of precision steel wires since 1938', isActive: true, updatedAt: '2026-09-24' },
  { id: '2', slug: 'about', title: 'About Us', content: '<p>Bansal Wire Industries Ltd. corporate legacy and vision</p>', metaDescription: 'About Bansal Wire history, leadership, and plants', isActive: true, updatedAt: '2026-09-24' },
  { id: '3', slug: 'products', title: 'Products Catalog', content: '<p>Over 3,000 precision wire SKUs</p>', metaDescription: 'Complete steel wire catalog and ASTM specifications', isActive: true, updatedAt: '2026-09-24' },
  { id: '4', slug: 'contact', title: 'Contact & Support', content: '<p>Corporate Office and Plant directories</p>', metaDescription: 'Direct phone lines and RFQ submission portal', isActive: true, updatedAt: '2026-09-24' },
]

const defaultTeamMembers: TeamMember[] = [
  { id: '1', name: 'Sh. Arun Gupta', designation: 'Managing Director', division: 'Executive Leadership', image: '/images/bansal/1-1.png' },
  { id: '2', name: 'Sh. Ramnivas Yadav', designation: 'Director', division: 'Galvanised Wire Division', image: '/images/bansal/2-1.png' },
  { id: '3', name: 'Sh. S.K. Agarwal', designation: 'Director', division: 'Profile / Shaped Wire Division', image: '/images/bansal/3-1.png' },
  { id: '4', name: 'Sh. Pranav Bansal', designation: 'Director & Operations', division: 'Mega Dadri Complex', image: '/images/bansal/4-1.png' },
  { id: '5', name: 'Sh. Yogesh Oberoi', designation: 'Director', division: 'Aluminium Alloy Division', image: '/images/bansal/5.png' },
  { id: '6', name: 'Sh. Manoj Dave', designation: 'Head of Technical Quality & Metallurgy', division: 'Quality Labs', image: '/images/bansal/6.png' },
]

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

// Ensure dark class is applied on initial module evaluation if saved
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

export const useStore = create<AppState>((set) => ({
  products: defaultProducts,
  enquiries: loadEnquiries(),
  users: defaultUsers,
  pageContents: defaultPageContents,
  teamMembers: defaultTeamMembers,
  notifications: loadNotifications(),
  latestToast: null,
  isAdminLoggedIn: false,
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

  setAdminLogin: (val) => set({ isAdminLoggedIn: val }),

  addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  deleteProduct: (id) =>
    set((state) => ({ products: state.products.filter((p) => p.id !== id) })),

  // When a user submits an enquiry from Contact page / Assistant / RFQ, persist and trigger notification
  addEnquiry: (enquiry) =>
    set((state) => {
      const nextEnquiries = [enquiry, ...state.enquiries]
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
      const nextNotifs = [newNotif, ...state.notifications]
      try {
        localStorage.setItem('bansal_notifications', JSON.stringify(nextNotifs))
      } catch (e) {
        console.error('Failed saving notification to localStorage', e)
      }

      return {
        enquiries: nextEnquiries,
        notifications: nextNotifs,
        latestToast: newNotif
      }
    }),

  updateEnquiryStatus: (id, status) =>
    set((state) => {
      const next = state.enquiries.map((e) => (e.id === id ? { ...e, status } : e))
      try {
        localStorage.setItem('bansal_enquiries', JSON.stringify(next))
      } catch (e) {
        console.error('Failed updating enquiry in localStorage', e)
      }
      return { enquiries: next }
    }),

  deleteEnquiry: (id) =>
    set((state) => {
      const next = state.enquiries.filter((e) => e.id !== id)
      try {
        localStorage.setItem('bansal_enquiries', JSON.stringify(next))
      } catch (e) {
        console.error('Failed deleting enquiry from localStorage', e)
      }
      return { enquiries: next }
    }),

  updatePageContent: (id, content) =>
    set((state) => ({
      pageContents: state.pageContents.map((c) =>
        c.id === id ? { ...c, ...content, updatedAt: new Date().toISOString().split('T')[0] } : c
      ),
    })),

  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, updates) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
    })),
  deleteUser: (id) =>
    set((state) => ({ users: state.users.filter((u) => u.id !== id) })),

  addTeamMember: (member) => set((state) => ({ teamMembers: [...state.teamMembers, member] })),
  deleteTeamMember: (id) =>
    set((state) => ({ teamMembers: state.teamMembers.filter((m) => m.id !== id) })),

  markNotificationRead: (id) =>
    set((state) => {
      const next = state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      try {
        localStorage.setItem('bansal_notifications', JSON.stringify(next))
      } catch (e) {
        console.error('Failed updating notifications in localStorage', e)
      }
      return { notifications: next }
    }),

  markAllNotificationsRead: () =>
    set((state) => {
      const next = state.notifications.map((n) => ({ ...n, isRead: true }))
      try {
        localStorage.setItem('bansal_notifications', JSON.stringify(next))
      } catch (e) {
        console.error('Failed updating notifications in localStorage', e)
      }
      return { notifications: next }
    }),

  clearToast: () => set({ latestToast: null })
}))
