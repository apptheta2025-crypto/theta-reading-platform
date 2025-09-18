import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  signInWithPassword: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUpWithPassword: (email: string, password: string, displayName?: string) => Promise<{ error: AuthError | null }>;
  signInWithOAuth: (provider: 'google') => Promise<{ error: AuthError | null }>;
  signInWithOtp: (email: string) => Promise<{ error: AuthError | null }>;
  resetPasswordForEmail: (email: string) => Promise<{ error: AuthError | null }>;
  updateUser: (updates: { email?: string; password?: string }) => Promise<{ error: AuthError | null }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile
          setTimeout(async () => {
            try {
              const { data: profileData, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .maybeSingle();
              
              if (error && error.code !== 'PGRST116') {
                console.error('Error fetching profile:', error);
              } else {
                setProfile(profileData);
              }
            } catch (error) {
              console.error('Error fetching profile:', error);
            }
          }, 0);
        } else {
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithPassword = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Sign in failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You've been signed in successfully.",
        });
      }
      
      return { error };
    } catch (error) {
      const authError = error as AuthError;
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: "An unexpected error occurred. Please try again.",
      });
      return { error: authError };
    }
  };

  const signUpWithPassword = async (email: string, password: string, displayName?: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            display_name: displayName,
          },
        },
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Sign up failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Check your email",
          description: "We've sent you a confirmation link to complete your registration.",
        });
      }
      
      return { error };
    } catch (error) {
      const authError = error as AuthError;
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: "An unexpected error occurred. Please try again.",
      });
      return { error: authError };
    }
  };

  const signInWithOAuth = async (provider: 'google') => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl,
        },
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "OAuth sign in failed",
          description: error.message,
        });
      }
      
      return { error };
    } catch (error) {
      const authError = error as AuthError;
      toast({
        variant: "destructive",
        title: "OAuth sign in failed",
        description: "An unexpected error occurred. Please try again.",
      });
      return { error: authError };
    }
  };

  const signInWithOtp = async (email: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Magic link failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Check your email",
          description: "We've sent you a magic link to sign in.",
        });
      }
      
      return { error };
    } catch (error) {
      const authError = error as AuthError;
      toast({
        variant: "destructive",
        title: "Magic link failed",
        description: "An unexpected error occurred. Please try again.",
      });
      return { error: authError };
    }
  };

  const resetPasswordForEmail = async (email: string) => {
    try {
      const redirectUrl = `${window.location.origin}/reset-password`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Password reset failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Password reset sent",
          description: "Check your email for the password reset link.",
        });
      }
      
      return { error };
    } catch (error) {
      const authError = error as AuthError;
      toast({
        variant: "destructive",
        title: "Password reset failed",
        description: "An unexpected error occurred. Please try again.",
      });
      return { error: authError };
    }
  };

  const updateUser = async (updates: { email?: string; password?: string }) => {
    try {
      const { error } = await supabase.auth.updateUser(updates);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Profile updated",
          description: "Your account has been updated successfully.",
        });
      }
      
      return { error };
    } catch (error) {
      const authError = error as AuthError;
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "An unexpected error occurred. Please try again.",
      });
      return { error: authError };
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      return { error: new Error('No user logged in') };
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Profile update failed",
          description: error.message,
        });
        return { error };
      } else {
        // Update local profile state
        setProfile(prev => prev ? { ...prev, ...updates } : null);
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
        return { error: null };
      }
    } catch (error) {
      const err = error as Error;
      toast({
        variant: "destructive",
        title: "Profile update failed",
        description: "An unexpected error occurred. Please try again.",
      });
      return { error: err };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Sign out failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Signed out",
          description: "You've been signed out successfully.",
        });
      }
      
      return { error };
    } catch (error) {
      const authError = error as AuthError;
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: "An unexpected error occurred. Please try again.",
      });
      return { error: authError };
    }
  };

  const value = {
    user,
    profile,
    session,
    isLoading,
    signInWithPassword,
    signUpWithPassword,
    signInWithOAuth,
    signInWithOtp,
    resetPasswordForEmail,
    updateUser,
    updateProfile,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};