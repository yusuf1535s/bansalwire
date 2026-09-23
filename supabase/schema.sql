-- ==============================================================================
-- BANSAL WIRE INDUSTRIES - COMPLETE SUPABASE DATABASE SCHEMA
-- Run this script in your Supabase Project's SQL Editor (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    category TEXT,
    "productCategory" TEXT,
    "subCategory" TEXT,
    "productSubCategory" TEXT,
    country TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'pending', 'contacted', 'resolved')),
    "createdAt" TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries (status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries (created_at DESC);

-- 2. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT FALSE,
    link TEXT,
    "enquiryId" TEXT REFERENCES public.enquiries(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications ("isRead");
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications (created_at DESC);

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    "subCategory" TEXT,
    description TEXT NOT NULL,
    specifications JSONB DEFAULT '[]'::jsonb,
    applications JSONB DEFAULT '[]'::jsonb,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_products_category ON public.products (category);

-- 4. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
    "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "lastLogin" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.team_members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    division TEXT,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. PAGE CONTENTS TABLE
CREATE TABLE IF NOT EXISTS public.page_contents (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    "metaDescription" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "updatedAt" TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_contents ENABLE ROW LEVEL SECURITY;

-- Enquiries Policies
DROP POLICY IF EXISTS "Allow public submissions" ON public.enquiries;
CREATE POLICY "Allow public submissions" ON public.enquiries FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow read enquiries" ON public.enquiries;
CREATE POLICY "Allow read enquiries" ON public.enquiries FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow update enquiries" ON public.enquiries;
CREATE POLICY "Allow update enquiries" ON public.enquiries FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow delete enquiries" ON public.enquiries;
CREATE POLICY "Allow delete enquiries" ON public.enquiries FOR DELETE USING (true);

-- Notifications Policies
DROP POLICY IF EXISTS "Allow insert notifications" ON public.notifications;
CREATE POLICY "Allow insert notifications" ON public.notifications FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow read notifications" ON public.notifications;
CREATE POLICY "Allow read notifications" ON public.notifications FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow update notifications" ON public.notifications;
CREATE POLICY "Allow update notifications" ON public.notifications FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow delete notifications" ON public.notifications;
CREATE POLICY "Allow delete notifications" ON public.notifications FOR DELETE USING (true);

-- Products Policies
DROP POLICY IF EXISTS "Allow all products operations" ON public.products;
CREATE POLICY "Allow all products operations" ON public.products FOR ALL USING (true) WITH CHECK (true);

-- Users Policies
DROP POLICY IF EXISTS "Allow all users operations" ON public.users;
CREATE POLICY "Allow all users operations" ON public.users FOR ALL USING (true) WITH CHECK (true);

-- Team Members Policies
DROP POLICY IF EXISTS "Allow all team operations" ON public.team_members;
CREATE POLICY "Allow all team operations" ON public.team_members FOR ALL USING (true) WITH CHECK (true);

-- Page Contents Policies
DROP POLICY IF EXISTS "Allow all page contents operations" ON public.page_contents;
CREATE POLICY "Allow all page contents operations" ON public.page_contents FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- SAFE REALTIME PUBLICATIONS (Checks before adding to avoid duplicate error)
-- ==============================================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'enquiries'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.enquiries;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'notifications'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'products'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'users'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.users;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'team_members'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.team_members;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'page_contents'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.page_contents;
  END IF;
END $$;
