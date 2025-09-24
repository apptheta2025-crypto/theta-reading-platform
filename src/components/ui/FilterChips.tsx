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
    <div className={cn("flex flex-wrap gap-3", className)}>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilterClick(filter)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            "focus:theta-focus border-2",
            activeFilter === filter
              ? "bg-theta-purple text-white border-theta-purple shadow-sm"
              : "bg-surface-mid text-text-secondary border-border hover:bg-surface-high hover:text-foreground hover:border-theta-purple"
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