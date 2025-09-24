import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Chrome, Sparkles, BookOpen, Headphones, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import thetaLogo from '@/assets/theta-logo.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('email');
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
    <div className="min-h-screen overflow-hidden relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/123.png)',
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>


      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding & Visual Appeal */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-center items-center p-12 relative">
          <div className="max-w-lg text-center space-y-8">
            {/* Logo */}
            <div className="relative">
              <img 
                src={thetaLogo}
                alt="Theta Logo" 
                className="relative w-24 h-24 mx-auto drop-shadow-2xl"
              />
            </div>
            
            {/* Brand Text */}
            <div className="space-y-4">
              <h1 className="text-5xl xl:text-6xl font-gilroy font-black text-white leading-tight">
                Welcome to
                <span className="block bg-gradient-to-r from-[#bc46ea] to-[#3b82f6] bg-clip-text text-transparent">
                  Theta
                </span>
              </h1>
              <p className="text-xl text-gray-300 font-inter font-medium leading-relaxed">
                Discover, read, and listen to your favorite books and podcasts in one beautiful platform
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="flex flex-col items-center space-y-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#bc46ea]/20 rounded-full flex items-center justify-center group-hover:bg-[#bc46ea]/30 transition-colors">
                  <BookOpen className="w-6 h-6 text-[#bc46ea]" />
                </div>
                <h3 className="text-white font-inter font-semibold">Read</h3>
                <p className="text-gray-400 text-sm text-center">Thousands of books</p>
              </div>
              
              <div className="flex flex-col items-center space-y-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#3b82f6]/20 rounded-full flex items-center justify-center group-hover:bg-[#3b82f6]/30 transition-colors">
                  <Headphones className="w-6 h-6 text-[#3b82f6]" />
                </div>
                <h3 className="text-white font-inter font-semibold">Listen</h3>
                <p className="text-gray-400 text-sm text-center">Premium podcasts</p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center space-x-2 pt-8">
              <Sparkles className="w-5 h-5 text-[#bc46ea] animate-pulse" />
              <Sparkles className="w-4 h-4 text-[#3b82f6] animate-pulse" style={{ animationDelay: '0.5s' }} />
              <Sparkles className="w-6 h-6 text-[#ec4899] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col justify-center p-8 lg:p-12">
          <div className="max-w-md mx-auto w-full">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <img 
                src={thetaLogo}
                alt="Theta Logo" 
                className="w-16 h-16 mx-auto drop-shadow-lg"
              />
            </div>

            <Card className="bg-white/5 backdrop-blur-xl border-transparent shadow-2xl hover:bg-white/5" style={{ borderRadius: '25px' }}>
              <CardHeader className="space-y-2 text-center pb-6">
                <CardTitle className="text-3xl font-gilroy font-bold text-white">
                  Welcome back
                </CardTitle>
                <CardDescription className="text-gray-300 text-base">
                  Sign in to continue your journey
                </CardDescription>
              </CardHeader>
              
              <CardContent className="h-[450px]">
                <div role="status" aria-live="polite" className="sr-only">
                  {isLoading ? "Processing authentication..." : "Ready for sign in"}
                </div>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <div className="relative bg-white/5 border border-white/10 rounded-full p-1 grid grid-cols-3">
                    {/* Sliding background */}
                    <div 
                      className={cn(
                        "absolute top-1 bottom-1 bg-white rounded-full transition-all duration-300 ease-in-out z-0",
                        activeTab === 'email' ? "left-1 w-[calc(33.333%-8px)]" : 
                        activeTab === 'google' ? "left-[calc(33.333%-1px)] w-[calc(33.333%-8px)]" : 
                        "left-[calc(66.666%-5px)] w-[calc(33.333%-8px)]"
                      )}
                    />
                    
                    <button
                      onClick={() => setActiveTab('email')}
                      className={cn(
                        "relative z-10 py-2 px-2 text-sm font-inter font-medium rounded-full transition-all duration-300 flex items-center justify-center w-full",
                        activeTab === 'email' ? "text-black" : "text-gray-400 hover:text-white"
                      )}
                    >
                      Email
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('google')}
                      className={cn(
                        "relative z-10 py-2 px-2 text-sm font-inter font-medium rounded-full transition-all duration-300 flex items-center justify-center w-full",
                        activeTab === 'google' ? "text-black" : "text-gray-400 hover:text-white"
                      )}
                    >
                      Google
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('magic')}
                      className={cn(
                        "relative z-10 py-2 px-2 text-sm font-inter font-medium rounded-full transition-all duration-300 flex items-center justify-center w-full",
                        activeTab === 'magic' ? "text-black" : "text-gray-400 hover:text-white"
                      )}
                    >
                      Magic Link
                    </button>
                  </div>
                  
                  <TabsContent value="email" className="space-y-6">
                    <form onSubmit={handleEmailLogin} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white font-inter font-semibold text-base">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-[#bc46ea] focus:ring-[#bc46ea]/20 rounded-full ${errors.email ? 'border-red-500' : ''}`}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                          />
                        </div>
                        {errors.email && (
                          <p id="email-error" className="text-sm text-red-400" role="alert">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-white font-inter font-semibold text-base">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-[#bc46ea] focus:ring-[#bc46ea]/20 rounded-full ${errors.password ? 'border-red-500' : ''}`}
                            aria-invalid={!!errors.password}
                            aria-describedby={errors.password ? 'password-error' : undefined}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                        {errors.password && (
                          <p id="password-error" className="text-sm text-red-400" role="alert">
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
                            className="data-[state=checked]:bg-[#bc46ea] data-[state=checked]:border-[#bc46ea]"
                          />
                          <Label htmlFor="remember" className="text-sm text-gray-300 font-inter">
                            Remember me
                          </Label>
                        </div>
                        <Link
                          to="/forgot-password"
                          className="text-sm text-[#bc46ea] hover:text-[#bc46ea]/80 transition-colors font-inter font-medium"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      
                      {errors.general && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <p className="text-sm text-red-400" role="alert">
                            {errors.general}
                          </p>
                        </div>
                      )}
                      
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#bc46ea] to-[#3b82f6] hover:from-[#8b2fb8] hover:to-[#2563eb] text-white font-inter font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed !transition-none hover:!translate-y-0"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Signing in...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>Sign in</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="google" className="space-y-6">
                    <div className="text-center space-y-6">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                          <Chrome className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-gray-300 font-inter font-medium">
                          Continue with your Google account
                        </p>
                      </div>
                      
                      {errors.general && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <p className="text-sm text-red-400" role="alert">
                            {errors.general}
                          </p>
                        </div>
                      )}
                      
                      <Button
                        onClick={handleGoogleLogin}
                        className="w-full bg-white/10 text-white border border-white/20 font-inter font-medium py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Connecting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Chrome className="h-5 w-5" />
                            <span>Continue with Google</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="magic" className="space-y-6">
                    <div className="space-y-6">
                      <div className="text-center space-y-3">
                        <div className="w-16 h-16 bg-[#bc46ea]/20 rounded-full flex items-center justify-center mx-auto">
                          <Zap className="w-8 h-8 text-[#bc46ea]" />
                        </div>
                        <p className="text-gray-300 font-inter font-medium">
                          We'll send you a secure link to sign in
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="magic-email" className="text-white font-inter font-semibold text-base">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="magic-email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-[#bc46ea] focus:ring-[#bc46ea]/20 rounded-full ${errors.email ? 'border-red-500' : ''}`}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'magic-email-error' : undefined}
                          />
                        </div>
                        {errors.email && (
                          <p id="magic-email-error" className="text-sm text-red-400" role="alert">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      
                      {errors.general && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <p className="text-sm text-red-400" role="alert">
                            {errors.general}
                          </p>
                        </div>
                      )}
                      
                      <Button
                        onClick={handleMagicLink}
                        className="w-full bg-gradient-to-r from-[#bc46ea] to-[#3b82f6] text-white font-inter font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4" />
                            <span>Email me a magic link</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-300 font-inter">
                    Don't have an account?{' '}
                    <Link
                      to="/signup"
                      className="text-[#bc46ea] hover:text-[#bc46ea]/80 transition-colors font-inter font-semibold"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;