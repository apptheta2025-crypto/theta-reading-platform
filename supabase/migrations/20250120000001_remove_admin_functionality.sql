-- Remove admin functionality from profiles table
-- This migration removes the is_admin column and related functions/policies

-- Drop admin-related policies first
DROP POLICY IF EXISTS "Admins can update admin status" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile (non-admin fields)" ON public.profiles;

-- Drop admin-related function
DROP FUNCTION IF EXISTS public.can_update_admin_status(uuid);

-- Drop admin-related index
DROP INDEX IF EXISTS idx_profiles_admin;

-- Remove is_admin column from profiles table
ALTER TABLE public.profiles DROP COLUMN IF EXISTS is_admin;

-- Recreate the basic profile update policy without admin restrictions
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
