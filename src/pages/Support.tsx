import React, { useState } from 'react';
import { Search, HelpCircle, MessageCircle, Mail, Phone, FileText, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Support: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: HelpCircle },
    { id: 'account', name: 'Account & Billing', icon: FileText },
    { id: 'technical', name: 'Technical Issues', icon: MessageCircle },
    { id: 'content', name: 'Content & Library', icon: FileText },
    { id: 'premium', name: 'Premium Features', icon: HelpCircle },
  ];

  const faqItems = [
    {
      id: 1,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'To reset your password, go to Settings > Account > Security and click "Reset Password". You\'ll receive an email with instructions.',
      popular: true
    },
    {
      id: 2,
      category: 'technical',
      question: 'Why is my audio not playing?',
      answer: 'Check your internet connection and try refreshing the page. If the issue persists, try clearing your browser cache or using a different browser.',
      popular: true
    },
    {
      id: 3,
      category: 'content',
      question: 'How do I download content for offline listening?',
      answer: 'Look for the download icon next to any audiobook or podcast. Tap it to download the content for offline access.',
      popular: false
    },
    {
      id: 4,
      category: 'premium',
      question: 'What are the benefits of Premium?',
      answer: 'Premium gives you unlimited downloads, ad-free experience, exclusive content, and priority customer support.',
      popular: true
    },
    {
      id: 5,
      category: 'account',
      question: 'How do I cancel my subscription?',
      answer: 'Go to Settings > Account > Subscription and click "Cancel Subscription". You\'ll retain access until the end of your billing period.',
      popular: false
    },
    {
      id: 6,
      category: 'technical',
      question: 'The app is running slowly. What should I do?',
      answer: 'Try closing other apps, restart your device, or check if you have the latest version of the app installed.',
      popular: false
    }
  ];

  const contactMethods = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      available: true,
      responseTime: 'Usually within 2 minutes'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      available: true,
      responseTime: 'Within 24 hours'
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with our team',
      icon: Phone,
      available: false,
      responseTime: 'Premium users only'
    }
  ];

  const filteredFaqs = faqItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="relative min-h-screen">
      {/* Header */}
      <div className="glass-panel p-6 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Help Center</h1>
            <p className="text-text-secondary">Find answers and get support</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <Input
            type="search"
            placeholder="Search for help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-foreground placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all duration-300"
          />
        </div>
      </div>

      <div className="px-6 space-y-8">
        {/* Categories */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-2xl transition-all duration-300",
                    selectedCategory === category.id
                      ? "bg-accent-primary text-white shadow-lg shadow-accent-primary/25"
                      : "hover:bg-white/10 text-text-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Popular Articles</h2>
          <div className="space-y-3">
            {filteredFaqs.filter(item => item.popular).map((item) => (
              <Card key={item.id} className="glass-tile border-white/10 bg-white/5">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-2">{item.question}</h3>
                      <p className="text-sm text-text-secondary line-clamp-2">{item.answer}</p>
                    </div>
                    <Badge variant="secondary" className="ml-4 bg-accent-primary/20 text-accent-primary">
                      Popular
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All FAQs */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="space-y-3">
            {filteredFaqs.map((item) => (
              <Card key={item.id} className="glass-tile border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-2">{item.question}</h3>
                      <p className="text-sm text-text-secondary line-clamp-2">{item.answer}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-secondary ml-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Still need help?</h2>
          <p className="text-text-secondary mb-6">Can't find what you're looking for? Contact our support team.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card 
                  key={index} 
                  className={cn(
                    "glass-tile border-white/10 transition-all duration-300",
                    method.available ? "hover:bg-white/10 cursor-pointer" : "opacity-50 cursor-not-allowed"
                  )}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-accent-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-accent-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{method.title}</h3>
                    <p className="text-sm text-text-secondary mb-3">{method.description}</p>
                    <p className="text-xs text-accent-primary">{method.responseTime}</p>
                    {!method.available && (
                      <Badge variant="outline" className="mt-2 text-xs">
                        Premium Only
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Support;
