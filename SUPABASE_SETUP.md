# Supabase Database & Authentication Setup Guide

This guide provides step-by-step instructions to set up the Supabase database and authentication backend for the **Sri Kannika Parameswari Modern Rice Mill** web platform.

---

## 🛠️ Step 1: Create a New Supabase Project
1. Log in to your [Supabase Dashboard](https://supabase.com/).
2. Click **New Project** and select your Organization.
3. Configure the project:
   - **Name**: `sri-kanika-rice-mill`
   - **Database Password**: Select a strong password (e.g. `srikanikaricemill`).
   - **Region**: Choose the closest server region (e.g., `Mumbai / ap-south-1` for South India).
   - Check the first and third checkboxes.
4. Click **Create new project** and wait for provisioning to complete.

---

## 🗄️ Step 2: Create Database Tables

Go to the **SQL Editor** in the left sidebar, click **New Query**, paste the script below, and click **Run**:

```sql
-- 1. Create Enquiry Status Enum Type
CREATE TYPE enquiry_status AS ENUM ('pending', 'review', 'approved', 'rejected');

-- 2. Create the 'dealers' Table (B2B Distributor Registrations)
CREATE TABLE public.dealers (
    id TEXT PRIMARY KEY DEFAULT 'SKP-DLR-' || floor(random() * 900000 + 100000)::text,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    business_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    gstin TEXT,
    expected_volume TEXT NOT NULL,
    preferred_products TEXT[] NOT NULL,
    message TEXT,
    status enquiry_status DEFAULT 'pending'::enquiry_status NOT NULL
);

-- 3. Create the 'contact_messages' Table (General Support Queries)
CREATE TABLE public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' NOT NULL
);

-- 4. Create the 'dealer_messages' Table (B2B Partner Helpdesk Queries)
CREATE TABLE public.dealer_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    sender_name TEXT NOT NULL,
    reference_id TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' NOT NULL
);
```

---

## 🔒 Step 3: Enable RLS & Define Policies

To protect your data, run the following SQL script to enable Row Level Security (RLS) on all tables and create access control policies:

```sql
-- Enable Row Level Security (RLS)
ALTER TABLE public.dealers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealer_messages ENABLE ROW LEVEL SECURITY;

-- 1. Policies for 'dealers' Table
CREATE POLICY "Allow public inserts on dealers" 
ON public.dealers 
FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Allow authenticated admins read/write on dealers" 
ON public.dealers 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 2. Policies for 'contact_messages' Table
CREATE POLICY "Allow public inserts on contact_messages" 
ON public.contact_messages 
FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Allow authenticated admins read/write on contact_messages" 
ON public.contact_messages 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 3. Policies for 'dealer_messages' Table
CREATE POLICY "Allow public inserts on dealer_messages" 
ON public.dealer_messages 
FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Allow authenticated admins read/write on dealer_messages" 
ON public.dealer_messages 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
```

---

## 🔑 Step 4: Grant Table API Permissions

Because the project disables the *"Automatically expose new tables"* default privilege option for security, you must explicitly grant API read/write rights for the `anon`, `authenticated`, and `service_role` roles:

```sql
-- Grant usage on public schema
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- Grant SELECT, INSERT, UPDATE, DELETE privileges on all tables
GRANT SELECT, INSERT, UPDATE, DELETE ON public.dealers TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.dealer_messages TO anon, authenticated, service_role;
```

---

## 👤 Step 5: Configure Admin Console Authentication

To enable access to the administrator dashboard, create a login account in Supabase:

1. Go to the **Authentication** tab in your Supabase dashboard sidebar.
2. Select **Users** and click **Add user** > **Create user**.
3. Fill in the administrator's email and password:
   - **Email**: `admin@kannikaricemill.com` (or any email of your choice)
   - **Password**: Choose a secure admin password.
4. **Important**: Uncheck **Auto-confirm User** or **Send invite email** depending on your workflow. Unchecking auto-confirm requires email confirmation, so to test immediately:
   - Toggle **Auto-confirm User** to **ON** (checked) so the user is marked confirmed instantly.
5. In **Auth Settings** (Authentication > Providers > Email), make sure **Confirm email** is set according to your production requirements (you can temporarily disable it for local testing).

---

## 🌐 Step 6: Connect App Environment Variables

In the root of your React project, create/update `.env` with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-project-public-anon-key
VITE_SUPABASE_PUBLISHABLE_KEY=your-project-public-anon-key
```
You can find these keys in your Supabase dashboard under **Project Settings > API**.
