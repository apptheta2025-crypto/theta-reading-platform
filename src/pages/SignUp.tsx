import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    displayName?: string;
    terms?: string;
    general?: string;
  }>({});
  
  const { signUpWithPassword, signInWithOAuth, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!displayName) {
      newErrors.displayName = 'Display name is required';
    } else if (displayName.length < 2) {
      newErrors.displayName = 'Display name must be at least 2 characters';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const { error } = await signUpWithPassword(email, password, displayName);
      if (error) {
        setErrors({ general: error.message });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setErrors({});
    
    try {
      const { error } = await signInWithOAuth('google');
      if (error) {
        setErrors({ general: error.message });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-surface border-surface-mid">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-foreground">Create account</CardTitle>
          <CardDescription className="text-text-secondary">
            Join Theta to access thousands of books and podcasts
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="email" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-surface-mid">
              <TabsTrigger value="email" className="text-sm">Email</TabsTrigger>
              <TabsTrigger value="google" className="text-sm">Google</TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="space-y-4">
              <form onSubmit={handleEmailSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-foreground">Display Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
                    <Input
                      id="displayName"
                      type="text"
                      placeholder="Enter your display name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className={`pl-10 bg-surface border-surface-mid text-foreground placeholder:text-text-secondary focus:border-brand-primary ${errors.displayName ? 'border-destructive' : ''}`}
                      aria-invalid={!!errors.displayName}
                      aria-describedby={errors.displayName ? 'displayName-error' : undefined}
                    />
                  </div>
                  {errors.displayName && (
                    <p id="displayName-error" className="text-sm text-destructive" role="alert">
                      {errors.displayName}
                    </p>
                  )}
                </div>
                
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
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 pr-10 bg-surface border-surface-mid text-foreground placeholder:text-text-secondary focus:border-brand-primary ${errors.password ? 'border-destructive' : ''}`}
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-text-secondary" />
                      ) : (
                        <Eye className="h-4 w-4 text-text-secondary" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p id="password-error" className="text-sm text-destructive" role="alert">
                      {errors.password}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`pl-10 pr-10 bg-surface border-surface-mid text-foreground placeholder:text-text-secondary focus:border-brand-primary ${errors.confirmPassword ? 'border-destructive' : ''}`}
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-text-secondary" />
                      ) : (
                        <Eye className="h-4 w-4 text-text-secondary" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p id="confirmPassword-error" className="text-sm text-destructive" role="alert">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm text-text-secondary leading-relaxed">
                      I agree to the{' '}
                      <Link to="/terms" className="text-brand-primary hover:text-brand-secondary">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-brand-primary hover:text-brand-secondary">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  {errors.terms && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.terms}
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
                  {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="google" className="space-y-4">
              <div className="text-center space-y-4">
                <p className="text-sm text-text-secondary">
                  Sign up with your Google account
                </p>
                
                {errors.general && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                    <p className="text-sm text-destructive" role="alert">
                      {errors.general}
                    </p>
                  </div>
                )}
                
                <Button
                  onClick={handleGoogleSignUp}
                  variant="outline"
                  className="w-full border-surface-mid hover:bg-surface"
                  disabled={isLoading}
                >
                  <Chrome className="h-4 w-4 mr-2" />
                  {isLoading ? 'Connecting...' : 'Continue with Google'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-brand-primary hover:text-brand-secondary transition-colors font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;