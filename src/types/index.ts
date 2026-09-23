export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  description: string;
  specifications?: string[];
  applications?: string[];
  image?: string;
}

export interface PageContent {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaDescription?: string;
  isActive: boolean;
  updatedAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  category?: string;
  productCategory?: string;
  subCategory?: string;
  productSubCategory?: string;
  country?: string;
  message: string;
  status: 'new' | 'pending' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  isActive: boolean;
  lastLogin?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  division?: string;
  image?: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export interface SliderItem {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
}
