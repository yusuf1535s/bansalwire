import { create } from 'zustand'
import type { Product, Enquiry, User, PageContent, TeamMember } from '../types'

interface AppState {
  products: Product[]
  enquiries: Enquiry[]
  users: User[]
  pageContents: PageContent[]
  teamMembers: TeamMember[]
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
}

const defaultProducts: Product[] = [
  { id: '1', name: 'Stainless Steel Wires', category: 'Stainless Steel', subCategory: 'SS Wires', description: 'High-quality stainless steel wires for various industrial applications.', specifications: ['Gauge: 0.04mm - 15.65mm', 'Grade: 304, 316, 430'], applications: ['Automotive', 'Food Processing', 'Medical'] },
  { id: '2', name: 'Mild Steel Wires', category: 'Mild Steel', subCategory: 'Low Carbon', description: 'Low carbon steel wires with excellent tensile strength.', specifications: ['Gauge: 0.1mm - 12mm', 'Grade: AISI 1008-1010'], applications: ['Construction', 'Mesh', 'Fencing'] },
  { id: '3', name: 'High Carbon Steel Wires', category: 'High Carbon', subCategory: 'High Carbon', description: 'High carbon steel wires for spring and wire products.', specifications: ['Gauge: 0.1mm - 10mm', 'Grade: AISI 1070-1095'], applications: ['Springs', 'Fasteners', 'Clips'] },
  { id: '4', name: 'Profile / Shaped Wires', category: 'Profile', subCategory: 'Shaped', description: 'Custom shaped wires for specialized applications.', specifications: ['Various profiles', 'Custom dimensions'], applications: ['Industrial', 'Automotive', 'Engineering'] },
  { id: '5', name: 'Aluminium Alloy Wires', category: 'Aluminium', subCategory: 'Alloy', description: 'Lightweight aluminium alloy wires for diverse applications.', specifications: ['Alloy: 1350, 6201', 'Gauge: 0.1mm - 10mm'], applications: ['Electrical', 'Aerospace', 'Conduction'] },
  { id: '6', name: 'Galvanized Wires', category: 'Galvanized', subCategory: 'GI Wire', description: 'Hot-dip galvanized wires for maximum corrosion resistance.', specifications: ['Gauge: 0.1mm - 8mm', 'Coating: Zinc'], applications: ['Fencing', 'Binding', 'Construction'] },
  { id: '7', name: 'Cable Armouring Wires', category: 'Cable', subCategory: 'Armouring', description: 'Steel wires for cable armouring applications.', specifications: ['Gauge: 1.0mm - 6.0mm', 'Grade: Supreme'], applications: ['Cable Manufacturing', 'Power Transmission'] },
  { id: '8', name: 'Wire Rope', category: 'Special Product', subCategory: 'Wire Rope', description: 'Galvanized and stainless steel wire ropes.', specifications: ['Diameter: 2mm - 50mm', 'Construction: 6x19, 6x36'], applications: ['Mining', 'Construction', 'Marine'] },
  { id: '9', name: 'Tyre Bead', category: 'Special Product', subCategory: 'Tyre Bead', description: 'High-precision tyre bead wires.', specifications: ['Gauge: 0.8mm - 2.5mm', 'Tensile: High'], applications: ['Tire Manufacturing'] },
  { id: '10', name: 'Barbed Wire', category: 'Special Product', subCategory: 'Barbed', description: 'Security barbed wire with sharp barbs.', specifications: ['Gauge: 12.5mm, 14mm', 'Type: Concertina, Coiled'], applications: ['Security', 'Perimeter Protection'] },
  { id: '11', name: 'Stainless Steel Scrubbers', category: 'Special Product', subCategory: 'Scrubbers', description: 'Stainless steel scrubber brushes for industrial cleaning.', specifications: ['Various sizes', 'Material: SS 304/316'], applications: ['Industrial Cleaning', 'Marine'] },
  { id: '12', name: 'Building Material', category: 'Special Product', subCategory: 'Building', description: 'Steel wires and strips for building applications.', specifications: ['Various gauges', 'Galvanized/Black'], applications: ['Construction', 'Hardware'] },
  { id: '13', name: 'Aluminium Alloy Wire Mesh', category: 'Special Product', subCategory: 'Mesh', description: 'Aluminium wire mesh for screening and filtering.', specifications: ['Mesh: 1mm - 50mm', 'Material: Aluminium'], applications: ['Filtering', 'Screening', 'Decoration'] },
]

const defaultEnquiries: Enquiry[] = [
  { id: '1', name: 'John Smith', email: 'john@example.com', phone: '+1-555-0101', category: 'Product', subCategory: 'Stainless Steel', country: 'USA', message: 'Interested in bulk order of SS wires.', status: 'new', createdAt: '2026-09-20' },
  { id: '2', name: 'Priya Patel', email: 'priya@example.com', phone: '+91-98765-43210', category: 'Career', message: 'Looking for engineering positions.', status: 'contacted', createdAt: '2026-09-18' },
  { id: '3', name: 'Ahmed Khan', email: 'ahmed@example.com', phone: '+971-50123-4567', category: 'Product', subCategory: 'Wire Rope', country: 'UAE', message: 'Need wire rope for construction project.', status: 'new', createdAt: '2026-09-22' },
  { id: '4', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '', category: 'Product', subCategory: 'Galvanized', country: 'UK', message: 'Inquiry about galvanized wire specifications.', status: 'resolved', createdAt: '2026-09-15' },
]

const defaultUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@bansalwire.com', role: 'admin', isActive: true, lastLogin: '2026-09-23' },
  { id: '2', name: 'Editor User', email: 'editor@bansalwire.com', role: 'editor', isActive: true },
]

const defaultPageContents: PageContent[] = [
  { id: '1', slug: 'home', title: 'Home', content: '<p>Welcome to Bansal Wire Industries Ltd.</p>', metaDescription: 'Stainless Steel Wire Suppliers and Exporters in India', isActive: true, updatedAt: '2026-09-23' },
  { id: '2', slug: 'about', title: 'About Us', content: '<p>We are the largest stainless steel wire manufacturing company...</p>', metaDescription: 'About Bansal Wire Industries', isActive: true, updatedAt: '2026-09-23' },
  { id: '3', slug: 'products', title: 'Products', content: '<p>Our product range includes...</p>', metaDescription: 'Product Catalog', isActive: true, updatedAt: '2026-09-23' },
  { id: '4', slug: 'contact', title: 'Contact Us', content: '<p>Address: F-3, Main Road, Shastri Nagar New Delhi - 110052</p>', metaDescription: 'Contact Bansal Wire', isActive: true, updatedAt: '2026-09-23' },
]

const defaultTeamMembers: TeamMember[] = [
  { id: '1', name: 'Sh. Arun Gupta', designation: 'Managing Director', division: 'Overall' },
  { id: '2', name: 'Sh. Ramnivas Yadav', designation: 'Director', division: 'Galvanised Wire Division' },
  { id: '3', name: 'Sh. S.K. Agarwal', designation: 'Director', division: 'Profile / Shaped Wire Division' },
  { id: '4', name: 'Shri. Umesh Kumar Gupta', designation: 'Director', division: '' },
  { id: '5', name: 'Shri. Pranav Bansal', designation: 'Director', division: '' },
  { id: '6', name: 'Shri. Gaurav Gupta', designation: 'Director', division: '' },
  { id: '7', name: 'Sh. Yogesh Oberoi', designation: 'Director', division: 'Aluminium Alloy Wire Division' },
  { id: '8', name: 'Sh. Manoj Dave', designation: 'Technical Head', division: '' },
]

export const useStore = create<AppState>((set) => ({
  products: defaultProducts,
  enquiries: defaultEnquiries,
  users: defaultUsers,
  pageContents: defaultPageContents,
  teamMembers: defaultTeamMembers,
  isAdminLoggedIn: false,

  setAdminLogin: (val) => set({ isAdminLoggedIn: val }),

  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  deleteProduct: (id) =>
    set((state) => ({ products: state.products.filter((p) => p.id !== id) })),

  addEnquiry: (enquiry) => set((state) => ({ enquiries: [...state.enquiries, enquiry] })),
  updateEnquiryStatus: (id, status) =>
    set((state) => ({
      enquiries: state.enquiries.map((e) => (e.id === id ? { ...e, status } : e)),
    })),
  deleteEnquiry: (id) =>
    set((state) => ({ enquiries: state.enquiries.filter((e) => e.id !== id) })),

  updatePageContent: (id, content) =>
    set((state) => ({
      pageContents: state.pageContents.map((c) => (c.id === id ? { ...c, ...content, updatedAt: new Date().toISOString().split('T')[0] } : c)),
    })),

  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, updates) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
    })),
  deleteUser: (id) =>
    set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
}))
