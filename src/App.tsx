import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import SpecialProductsPage from './pages/SpecialProductsPage'
import InvestorRelationsPage from './pages/InvestorRelationsPage'
import QualityPage from './pages/QualityPage'
import CareerPage from './pages/CareerPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

import AdminLoginPage from './admin/pages/AdminLoginPage'
import DashboardPage from './admin/pages/DashboardPage'
import ProductsAdminPage from './admin/pages/ProductsAdminPage'
import EnquiriesAdminPage from './admin/pages/EnquiriesAdminPage'
import PagesAdminPage from './admin/pages/PagesAdminPage'
import TeamAdminPage from './admin/pages/TeamAdminPage'
import UsersAdminPage from './admin/pages/UsersAdminPage'
import SettingsAdminPage from './admin/pages/SettingsAdminPage'
import AdminNotFoundPage from './admin/pages/AdminNotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/about/:slug" element={<AboutPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/special-products" element={<SpecialProductsPage />} />
      <Route path="/special-products/:slug" element={<SpecialProductsPage />} />
      <Route path="/investor-relations" element={<InvestorRelationsPage />} />
      <Route path="/quality" element={<QualityPage />} />
      <Route path="/career" element={<CareerPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<DashboardPage />} />
      <Route path="/admin/products" element={<ProductsAdminPage />} />
      <Route path="/admin/enquiries" element={<EnquiriesAdminPage />} />
      <Route path="/admin/pages" element={<PagesAdminPage />} />
      <Route path="/admin/team" element={<TeamAdminPage />} />
      <Route path="/admin/users" element={<UsersAdminPage />} />
      <Route path="/admin/settings" element={<SettingsAdminPage />} />
      <Route path="/admin/*" element={<AdminNotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
