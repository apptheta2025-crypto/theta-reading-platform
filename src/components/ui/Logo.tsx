import React from 'react';
import { cn } from '@/lib/utils';
import thetaLogo from '@/assets/theta-logo.svg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-16 h-16'
  };

  return (
    <div className={cn(
      "flex items-center justify-center",
      sizeClasses[size],
      className
    )}>
      <img
        src={thetaLogo}
        alt="Theta Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;
