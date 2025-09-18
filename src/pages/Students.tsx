import React, { useState } from 'react';
import { GraduationCap, Book, Calculator, Globe, Beaker, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FilterChips from '@/components/ui/FilterChips';
import MediaCard from '@/components/media/MediaCard';
import { mockStudentContent } from '@/data/mockData';
import { useMode } from '@/contexts/ModeContext';
import { cn } from '@/lib/utils';

const gradeFilters = Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`);
const subjectFilters = ['Math', 'Science', 'English', 'History', 'Art', 'Music'];

const subjectIcons = {
  Math: Calculator,
  Science: Beaker,
  English: Book,
  History: History,
  Art: Book,
  Music: Book
};

const Students: React.FC = () => {
  const { isStudentMode, toggleStudentMode } = useMode();
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const filteredContent = mockStudentContent.filter(item => {
    if (selectedGrade !== 'All' && !item.title.includes(selectedGrade)) {
      return false;
    }
    if (selectedSubject !== 'All' && !item.title.toLowerCase().includes(selectedSubject.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <main className="pb-24 min-h-screen">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-brand-primary" />
            <h1 className="text-3xl font-bold text-foreground">Students</h1>
          </div>
          
          {/* Student mode toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-text-secondary">Student Mode</span>
            <Button
              variant={isStudentMode ? "default" : "outline"}
              size="sm"
              onClick={toggleStudentMode}
              className={cn(
                "transition-all duration-200",
                isStudentMode && "bg-brand-primary hover:bg-brand-glow"
              )}
            >
              {isStudentMode ? 'ON' : 'OFF'}
            </Button>
          </div>
        </div>

        {/* Student mode notice */}
        {isStudentMode && (
          <div className="bg-brand-muted/50 border border-brand-primary/30 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-5 h-5 text-brand-primary" />
              <span className="font-medium text-brand-primary">Student Mode Active</span>
            </div>
            <p className="text-sm text-text-secondary">
              Only K-12 educational content is shown. Other content is hidden across the app.
            </p>
          </div>
        )}

        {/* Grade filters */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Grade Level</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedGrade === 'All' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedGrade('All')}
              className={cn(
                selectedGrade === 'All' && "bg-brand-primary hover:bg-brand-glow"
              )}
            >
              All Grades
            </Button>
            {gradeFilters.map((grade) => (
              <Button
                key={grade}
                variant={selectedGrade === grade ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedGrade(grade)}
                className={cn(
                  "text-sm",
                  selectedGrade === grade && "bg-brand-primary hover:bg-brand-glow"
                )}
              >
                {grade}
              </Button>
            ))}
          </div>
        </div>

        {/* Subject filters */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-foreground mb-3">Subject</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedSubject === 'All' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSubject('All')}
              className={cn(
                selectedSubject === 'All' && "bg-brand-primary hover:bg-brand-glow"
              )}
            >
              All Subjects
            </Button>
            {subjectFilters.map((subject) => {
              const Icon = subjectIcons[subject as keyof typeof subjectIcons];
              return (
                <Button
                  key={subject}
                  variant={selectedSubject === subject ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSubject(subject)}
                  className={cn(
                    "text-sm gap-2",
                    selectedSubject === subject && "bg-brand-primary hover:bg-brand-glow"
                  )}
                >
                  <Icon className="w-3 h-3" />
                  {subject}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {filteredContent.length > 0 ? (
          <div className="space-y-8">
            {/* Featured educational content */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Educational Content
                <Badge variant="secondary" className="ml-2 bg-brand-muted text-brand-primary">
                  {filteredContent.length} items
                </Badge>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredContent.map((item) => (
                  <MediaCard key={item.id} item={item} size="sm" />
                ))}
              </div>
            </section>

            {/* Study tips */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Study Tips</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-surface-mid rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Book className="w-6 h-6 text-brand-primary" />
                    <h3 className="font-semibold text-foreground">Active Reading</h3>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Take notes while reading and summarize each chapter to improve comprehension.
                  </p>
                </div>
                
                <div className="bg-surface-mid rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Calculator className="w-6 h-6 text-brand-primary" />
                    <h3 className="font-semibold text-foreground">Practice Problems</h3>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Solve practice problems regularly to master mathematical concepts.
                  </p>
                </div>
                
                <div className="bg-surface-mid rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Globe className="w-6 h-6 text-brand-primary" />
                    <h3 className="font-semibold text-foreground">Real-world Connections</h3>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Connect what you learn to real-world examples and current events.
                  </p>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="text-center py-12">
            <GraduationCap className="w-16 h-16 text-text-secondary mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No content found</h3>
            <p className="text-text-secondary">
              Try adjusting your grade level or subject filters
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Students;