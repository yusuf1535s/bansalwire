# Bansal Wire Industries Ltd. — React Website

A modern, responsive React website for Bansal Wire Industries Ltd. with an integrated admin panel.

## Features

- **Public Website**: Home, About, Products, Special Products, Investor Relations, Quality, Career, Contact pages
- **Admin Panel**: Dashboard, Products CRUD, Enquiry management, Page content editing, Team management, User management, Site settings
- **Dynamic State**: Zustand store for global state management
- **Charts**: Recharts for admin dashboard analytics
- **Responsive Design**: Tailwind CSS with mobile-first approach
- **Routing**: React Router with protected admin routes

## Tech Stack

- React 19 + TypeScript
- Vite (build tool)
- React Router 7
- Tailwind CSS 4
- Zustand (state management)
- Recharts (data visualization)
- Lucide React (icons)
- React Helmet Async (SEO)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the website.
Access admin panel at [http://localhost:5173/admin/login](http://localhost:5173/admin/login)

## Project Structure

```
src/
├── components/
│   ├── layout/        # Navbar, Footer, Layout, AdminLayout, Sidebar, Header
│   ├── home/          # Hero, Products, About, Career, Contact components
│   ├── common/        # Section, PageMeta, Toast
│   └── admin/         # Dashboard, Tables, Charts, Forms
├── pages/             # Main website pages
├── admin/pages/       # Admin panel pages
├── store/             # Zustand store
├── data/              # Static data and navigation
├── types/             # TypeScript types
├── admin/             # Guards and route config
└── lib/               # Utilities
```

## Admin Panel Access

Click "Admin" in the navbar or go to `/admin/login`. Demo mode — just click Sign In.

Admin features:
- Dashboard with stats and charts
- Add/edit/delete products
- Manage customer enquiries with status tracking
- Edit page content (HTML)
- Manage team members
- Manage admin users
- Site settings

## Pages

| Page | Route |
|------|-------|
| Home | `/` |
| About | `/about` |
| Products | `/products` |
| Product Detail | `/products/:id` |
| Special Products | `/special-products` |
| Investor Relations | `/investor-relations` |
| Quality | `/quality` |
| Career | `/career` |
| Contact | `/contact` |
| Admin Login | `/admin/login` |
| Admin Dashboard | `/admin/dashboard` |
| Admin Products | `/admin/products` |
| Admin Enquiries | `/admin/enquiries` |
| Admin Pages | `/admin/pages` |
| Admin Team | `/admin/team` |
| Admin Users | `/admin/users` |
| Admin Settings | `/admin/settings` |
