import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const filters = [
  'All',
  'Education', 
  'Entertainment',
  'Thrill',
  'Romantic',
  'Business'
];

interface FilterChipsProps {
  onFilterChange?: (filter: string) => void;
  className?: string;
}

const FilterChips: React.FC<FilterChipsProps> = ({ onFilterChange, className }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange?.(filter);
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilterClick(filter)}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-brand-primary/50",
            activeFilter === filter
              ? "bg-brand-primary text-white shadow-sm"
              : "bg-surface-mid text-text-secondary hover:bg-surface-mid/80 hover:text-foreground"
          )}
          aria-pressed={activeFilter === filter}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterChips;