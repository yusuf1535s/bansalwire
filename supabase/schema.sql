-- ==============================================================================
-- BANSAL WIRE INDUSTRIES - SUPABASE DATABASE SCHEMA
-- Run this script in your Supabase Project's SQL Editor (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Create Enquiries Table
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

-- Index for faster filtering and ordering
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries (status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries (created_at DESC);

-- 2. Create Notifications Table
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

-- Index for faster unread notifications retrieval
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications ("isRead");
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications (created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for Enquiries Table
-- Allow anyone (public/anon visitors) to submit contact inquiries
CREATE POLICY "Allow public submissions" 
ON public.enquiries 
FOR INSERT 
WITH CHECK (true);

-- Allow reading enquiries
CREATE POLICY "Allow read access" 
ON public.enquiries 
FOR SELECT 
USING (true);

-- Allow updating enquiry status
CREATE POLICY "Allow update access" 
ON public.enquiries 
FOR UPDATE 
USING (true);

-- Allow deleting enquiries
CREATE POLICY "Allow delete access" 
ON public.enquiries 
FOR DELETE 
USING (true);

-- 5. RLS Policies for Notifications Table
-- Allow system to insert notifications
CREATE POLICY "Allow insert notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (true);

-- Allow reading notifications
CREATE POLICY "Allow read notifications" 
ON public.notifications 
FOR SELECT 
USING (true);

-- Allow updating notifications (marking as read)
CREATE POLICY "Allow update notifications" 
ON public.notifications 
FOR UPDATE 
USING (true);

-- Allow deleting notifications
CREATE POLICY "Allow delete notifications" 
ON public.notifications 
FOR DELETE 
USING (true);

-- 6. Enable Realtime Publications for Enquiries and Notifications
-- This enables live instant notifications in the Admin dashboard
ALTER PUBLICATION supabase_realtime ADD TABLE public.enquiries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
