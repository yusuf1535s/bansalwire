export interface NavItem {
  label: string
  path: string
  isHeader?: boolean
  children?: NavItem[]
}

export const mainNavItems: NavItem[] = [
  { label: 'Home', path: '/' },
  {
    label: 'About Us',
    path: '/about',
    children: [
      { label: 'Vision & Mission', path: '/about/vision-mission' },
      { label: 'Our Journey', path: '/about/our-journey' },
      { label: 'Our Presence', path: '/about/our-presence' },
      { label: 'Group Companies', path: '/about/group-companies' },
      { label: 'Subsidiary Companies', path: '/about/subsidiary-companies' },
      { label: 'Our Management', path: '/about/our-management' },
      { label: 'Leadership', path: '/about/leadership' },
      { label: 'CSR', path: '/about/csr' },
    ],
  },
  {
    label: 'Products',
    path: '/products',
    children: [
      { label: 'Search By Industry', path: '/products/search-by-industry' },
  {
    label: 'Search by Product',
    path: '/products/search-by-product',
    isHeader: true,
    children: [
          { label: 'Stainless Steel Wires', path: '/products/stainless-steel-wires' },
          { label: 'Mild Steel Wires', path: '/products/mild-steel-wires' },
          { label: 'High Carbon Steel Wires', path: '/products/high-carbon-wires' },
          { label: 'Profile / Shaped Wires', path: '/products/profile-shaped-wires' },
          { label: 'Aluminium Alloy', path: '/products/aluminium-alloy' },
          { label: 'Galvanized Wires', path: '/products/galvanized-wires' },
          { label: 'Cable Armouring Wires', path: '/products/cable-armouring' },
        ],
      },
    ],
  },
  {
    label: 'Special Products',
    path: '/special-products',
    children: [
      { label: 'Wire Rope', path: '/special-products/wire-rope' },
      { label: 'Tyre Bead', path: '/special-products/tyre-bead' },
      { label: 'Aluminium Alloy Wire Mesh', path: '/special-products/aluminium-wire-mesh' },
      { label: 'Stainless Steel Scrubbers', path: '/special-products/ss-scrubbers' },
      { label: 'Building Material', path: '/special-products/building-material' },
      { label: 'Barbed Wire', path: '/special-products/barbed-wire' },
    ],
  },
  {
    label: 'Investor Relations',
    path: '/investor-relations',
    children: [
      { label: 'Financials', path: '/investor-relations/financials' },
      { label: 'Annual Report', path: '/investor-relations/annual-report' },
      { label: 'Share Holding', path: '/investor-relations/share-holding' },
      { label: 'Press Release', path: '/investor-relations/press-release' },
    ],
  },
  { label: 'Quality', path: '/quality' },
  {
    label: 'Career',
    path: '/career',
    children: [
      { label: 'Life at BWI', path: '/career/life-at-bwi' },
      { label: 'Core Values', path: '/career/core-values' },
      { label: 'Current Openings', path: '/career/openings' },
    ],
  },
  { label: 'Contact Us', path: '/contact' },
]
