import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  
  const { signInWithPassword, signInWithOAuth, signInWithOtp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const returnTo = (location.state as any)?.returnTo || '/';

  useEffect(() => {
    if (user) {
      navigate(returnTo, { replace: true });
    }
  }, [user, navigate, returnTo]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const { error } = await signInWithPassword(email, password);
      if (error) {
        setErrors({ general: error.message });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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

  const handleMagicLink = async () => {
    if (!email) {
      setErrors({ email: 'Email is required for magic link' });
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const { error } = await signInWithOtp(email);
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
          <CardTitle className="text-2xl font-bold text-foreground">Welcome back</CardTitle>
          <CardDescription className="text-text-secondary">
            Sign in to your Theta account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="email" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-surface-mid">
              <TabsTrigger value="email" className="text-sm">Email</TabsTrigger>
              <TabsTrigger value="google" className="text-sm">Google</TabsTrigger>
              <TabsTrigger value="magic" className="text-sm">Magic Link</TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="space-y-4">
              <form onSubmit={handleEmailLogin} className="space-y-4">
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
                      placeholder="Enter your password"
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
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm text-text-secondary">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-brand-primary hover:text-brand-secondary transition-colors"
                  >
                    Forgot password?
                  </Link>
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
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="google" className="space-y-4">
              <div className="text-center space-y-4">
                <p className="text-sm text-text-secondary">
                  Continue with your Google account
                </p>
                
                {errors.general && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                    <p className="text-sm text-destructive" role="alert">
                      {errors.general}
                    </p>
                  </div>
                )}
                
                <Button
                  onClick={handleGoogleLogin}
                  variant="outline"
                  className="w-full border-surface-mid hover:bg-surface"
                  disabled={isLoading}
                >
                  <Chrome className="h-4 w-4 mr-2" />
                  {isLoading ? 'Connecting...' : 'Continue with Google'}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="magic" className="space-y-4">
              <div className="space-y-4">
                <p className="text-sm text-text-secondary text-center">
                  We'll send you a secure link to sign in
                </p>
                
                <div className="space-y-2">
                  <Label htmlFor="magic-email" className="text-foreground">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
                    <Input
                      id="magic-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 bg-surface border-surface-mid text-foreground placeholder:text-text-secondary focus:border-brand-primary ${errors.email ? 'border-destructive' : ''}`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'magic-email-error' : undefined}
                    />
                  </div>
                  {errors.email && (
                    <p id="magic-email-error" className="text-sm text-destructive" role="alert">
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
                  onClick={handleMagicLink}
                  className="w-full bg-brand-primary hover:bg-brand-secondary text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Email me a magic link'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-brand-primary hover:text-brand-secondary transition-colors font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;