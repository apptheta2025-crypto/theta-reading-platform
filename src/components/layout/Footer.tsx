import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Blog', href: '/blog' },
  ];

  const communityLinks = [
    { label: 'For Students', href: '/students' },
    { label: 'For Educators', href: '/educators' },
    { label: 'For Authors', href: '/authors' },
    { label: 'Community Guidelines', href: '/community' },
  ];

  const usefulLinks = [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact Support', href: '/support' },
    { label: 'System Status', href: '/status' },
    { label: 'API Documentation', href: '/api' },
  ];

  const planLinks = [
    { label: 'Free Plan', href: '/pricing#free' },
    { label: 'Premium', href: '/pricing#premium' },
    { label: 'Student Discount', href: '/pricing#student' },
    { label: 'Enterprise', href: '/pricing#enterprise' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Accessibility', href: '/accessibility' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/theta', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/theta', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/theta', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/theta', label: 'YouTube' },
    { icon: Linkedin, href: 'https://linkedin.com/company/theta', label: 'LinkedIn' },
  ];

  const FooterColumn: React.FC<{ title: string; links: Array<{ label: string; href: string }> }> = ({ 
    title, 
    links 
  }) => (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className="text-sm text-text-secondary hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:rounded"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-surface-low border-t border-border">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company */}
          <FooterColumn title="Company" links={companyLinks} />
          
          {/* Communities */}
          <FooterColumn title="Communities" links={communityLinks} />
          
          {/* Useful Links */}
          <FooterColumn title="Useful Links" links={usefulLinks} />
          
          {/* Plans */}
          <FooterColumn title="Plans" links={planLinks} />
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-brand-primary" />
              <span className="text-sm text-text-secondary">support@theta.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-brand-primary" />
              <span className="text-sm text-text-secondary">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-brand-primary" />
              <span className="text-sm text-text-secondary">San Francisco, CA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legal row */}
      <div className="border-t border-border bg-surface-mid/30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Legal links */}
            <div className="flex flex-wrap gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-xs text-text-secondary hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:rounded"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-text-secondary hover:text-brand-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:rounded-full"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-xs text-text-secondary text-center">
              © {currentYear} Theta. All rights reserved. Made with ❤️ for learners everywhere.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
