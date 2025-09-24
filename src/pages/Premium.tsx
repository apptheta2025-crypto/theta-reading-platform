import React, { useState } from 'react';
import { Check, Star, Crown, Zap, Download, Headphones, Book, ArrowLeft, Sparkles, Infinity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Premium: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: '₹129',
      period: 'per month',
      originalPrice: null,
      popular: false,
      features: [
        'Unlimited downloads',
        'Ad-free experience',
        'Exclusive content',
        'Priority support',
        'Offline access'
      ]
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: '₹1,199',
      period: 'per year',
      originalPrice: null,
      popular: true,
      features: [
        'Everything in Monthly',
        'Early access to new features',
        'Premium badges',
        'Advanced analytics'
      ]
    }
  ];

  const features = [
    {
      icon: Infinity,
      title: 'Unlimited Access to Content',
      description: 'Access to premium audiobooks and podcasts not available to free users',
      free: false,
      priority: 'high'
    },
    {
      icon: Download,
      title: 'Unlimited Downloads',
      description: 'Download as much content as you want for offline listening',
      free: false,
      priority: 'high'
    },
    {
      icon: Headphones,
      title: 'Ad-Free Experience',
      description: 'Enjoy uninterrupted listening without any advertisements',
      free: false,
      priority: 'medium'
    },
    {
      icon: Star,
      title: 'Premium Features',
      description: 'Advanced playback controls, custom playlists, and more',
      free: false,
      priority: 'medium'
    },
    {
      icon: Zap,
      title: 'Priority Support',
      description: 'Get faster response times and dedicated support channels',
      free: false,
      priority: 'low'
    },
    {
      icon: Crown,
      title: 'Early Access',
      description: 'Be the first to try new features and content releases',
      free: false,
      priority: 'low'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Book Lover',
      content: 'Premium has completely transformed my reading experience. The unlimited downloads are a game-changer!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Commuter',
      content: 'Ad-free listening during my daily commute is worth every penny. Highly recommended!',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Student',
      content: 'The exclusive content and early access features make this subscription incredibly valuable.',
      rating: 5
    }
  ];

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  return (
    <main className="relative min-h-screen pt-6">
      {/* Hero Section */}
      <div className="text-center py-8 px-6">
        <div className="flex items-center justify-center gap-2 text-accent-primary mb-4">
          <Sparkles className="w-5 h-5" />
          <span className="text-sm uppercase tracking-wider font-semibold">Premium Experience</span>
        </div>
        <h2 
          className="text-4xl md:text-5xl font-bold italic mb-4"
          style={{ 
            fontFamily: 'Gilroy-Black, sans-serif',
            background: 'repeating-radial-gradient(circle at 25% 25%, #bc46ea 0%, #f3ae1a 25%, #bc46ea 50%, #f3ae1a 75%, #bc46ea 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Unlock Your Full Potential
        </h2>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          Join thousands of satisfied users who have upgraded to Premium and transformed their learning journey.
        </p>
      </div>

      <div className="px-6 space-y-8">
        {/* Pricing Plans */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Choose Your Plan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={plan.id}
                className={`h-full cursor-default rounded-xl ${
                  index === 0 
                    ? 'border-2 border-[#f3ae1a] bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-700/30' 
                    : 'border-2 border-[#bc46ea] bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-purple-900/20'
                }`}
                style={{ pointerEvents: 'none' }}
              >
                <CardHeader className="text-center pb-4 pt-6">
                  <CardTitle className="text-2xl font-bold text-white mb-4">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-[#f3ae1a]">{plan.price}</span>
                    <span className="text-gray-400 text-lg">{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="px-6 pb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-white flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>

        {/* Features Grid */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Premium Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              
              // Different background variations based on priority
              const getBackgroundClass = (priority: string) => {
                switch (priority) {
                  case 'high':
                    return "bg-gradient-to-br from-[#bc46ea]/30 to-[#bc46ea]/20 hover:from-[#bc46ea]/40 hover:to-[#bc46ea]/30";
                  case 'medium':
                    return "bg-gradient-to-br from-[#bc46ea]/20 to-[#bc46ea]/10 hover:from-[#bc46ea]/30 hover:to-[#bc46ea]/20";
                  case 'low':
                    return "bg-gradient-to-br from-[#bc46ea]/15 to-[#bc46ea]/8 hover:from-[#bc46ea]/25 hover:to-[#bc46ea]/15";
                  default:
                    return "bg-gradient-to-br from-[#bc46ea]/20 to-[#bc46ea]/10 hover:from-[#bc46ea]/30 hover:to-[#bc46ea]/20";
                }
              };

              const getGlowClass = (priority: string) => {
                switch (priority) {
                  case 'high':
                    return "from-[#bc46ea]/8 via-transparent to-[#bc46ea]/4";
                  case 'medium':
                    return "from-[#bc46ea]/6 via-transparent to-[#bc46ea]/3";
                  case 'low':
                    return "from-[#bc46ea]/4 via-transparent to-[#bc46ea]/2";
                  default:
                    return "from-[#bc46ea]/6 via-transparent to-[#bc46ea]/3";
                }
              };

              return (
                <Card key={index} className={`glass-tile border-white/10 ${getBackgroundClass(feature.priority)} transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#f3ae1a]/20 group`}>
                  <CardContent className="p-8 text-center relative overflow-hidden">
                    {/* Glowing background effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getGlowClass(feature.priority)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-12 h-12 text-[#f3ae1a] drop-shadow-lg" style={{
                          filter: 'drop-shadow(0 0 5px #f3ae1a) drop-shadow(0 0 10px #f3ae1a)'
                        }} />
                      </div>
                      <h3 className="text-xl font-bold text-[#f3ae1a] mb-3 group-hover:text-white transition-colors duration-300">{feature.title}</h3>
                      <p className="text-base text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-tile border-white/10 bg-white/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent-primary text-accent-primary" />
                    ))}
                  </div>
                  <p className="text-text-secondary mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-text-secondary">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <Card className="glass-tile border-white/10 bg-white/5">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-text-secondary">Yes, you can cancel your subscription at any time from your account settings. You'll retain access until the end of your billing period.</p>
              </CardContent>
            </Card>
            
            <Card className="glass-tile border-white/10 bg-white/5">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">What payment methods do you accept?</h3>
                <p className="text-text-secondary">We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely.</p>
              </CardContent>
            </Card>
            
            <Card className="glass-tile border-white/10 bg-white/5">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">Is there a free trial?</h3>
                <p className="text-text-secondary">Yes! New users get a 7-day free trial to experience all Premium features before committing to a subscription.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Premium;
