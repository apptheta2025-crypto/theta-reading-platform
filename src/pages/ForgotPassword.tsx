import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; general?: string }>({});
  
  const { resetPasswordForEmail } = useAuth();

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const { error } = await resetPasswordForEmail(email);
      if (error) {
        setErrors({ general: error.message });
      } else {
        setIsEmailSent(true);
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-surface border-surface-mid">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-brand-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Check your email</CardTitle>
            <CardDescription className="text-text-secondary">
              We've sent a password reset link to {email}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="p-4 bg-brand-primary/5 border border-brand-primary/20 rounded-md">
              <p className="text-sm text-foreground">
                If you don't see the email in your inbox, check your spam folder. The link will expire in 24 hours.
              </p>
            </div>
            
            <div className="space-y-2">
              <Button
                onClick={() => setIsEmailSent(false)}
                variant="outline"
                className="w-full border-surface-mid hover:bg-surface"
              >
                Try different email
              </Button>
              
              <Button
                onClick={handleSubmit}
                variant="ghost"
                className="w-full text-text-secondary hover:text-foreground"
                disabled={isLoading}
              >
                {isLoading ? 'Resending...' : 'Resend email'}
              </Button>
            </div>
            
            <div className="text-center pt-4">
              <Link
                to="/login"
                className="inline-flex items-center text-sm text-brand-primary hover:text-brand-secondary transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-surface border-surface-mid">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-foreground">Reset password</CardTitle>
          <CardDescription className="text-text-secondary">
            Enter your email and we'll send you a reset link
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 bg-surface border-surface-mid text-foreground placeholder:text-text-secondary focus:border-brand-primary ${errors.email ? 'border-destructive' : ''}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-sm text-destructive" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
            
            {errors.general && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive" role="alert">
                  {errors.general}
                </p>
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full bg-brand-primary hover:bg-brand-secondary text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send reset link'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-brand-primary hover:text-brand-secondary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;