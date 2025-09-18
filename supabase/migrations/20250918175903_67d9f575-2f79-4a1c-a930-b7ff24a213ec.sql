-- Create security definer function to check if user can update admin status
CREATE OR REPLACE FUNCTION public.can_update_admin_status(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  -- Only allow admins to update admin status
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = _user_id
      AND is_admin = true
  )
$$;

-- Drop existing policies for profiles table
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create new restrictive policies
CREATE POLICY "Users can update their own profile (non-admin fields)"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id 
  AND (
    -- Only allow updating non-admin fields for regular users
    is_admin = OLD.is_admin
    OR public.can_update_admin_status(auth.uid())
  )
);

-- Create separate policy for admin status updates (admin-only)
CREATE POLICY "Admins can update admin status"
ON public.profiles
FOR UPDATE
USING (public.can_update_admin_status(auth.uid()))
WITH CHECK (public.can_update_admin_status(auth.uid()));

-- Add index for better performance on admin checks
CREATE INDEX IF NOT EXISTS idx_profiles_admin ON public.profiles(id) WHERE is_admin = true;