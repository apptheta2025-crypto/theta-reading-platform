import React, { createContext, useContext, useState } from 'react';

interface ModeContextType {
  mode: 'read' | 'listen';
  toggleMode: () => void;
  setMode: (mode: 'read' | 'listen') => void;
  isStudentMode: boolean;
  toggleStudentMode: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<'read' | 'listen'>('read');
  const [isStudentMode, setIsStudentMode] = useState(false);

  const toggleMode = () => {
    setModeState(prev => prev === 'read' ? 'listen' : 'read');
  };

  const setMode = (newMode: 'read' | 'listen') => {
    setModeState(newMode);
  };

  const toggleStudentMode = () => {
    setIsStudentMode(prev => !prev);
  };

  return (
    <ModeContext.Provider
      value={{
        mode,
        toggleMode,
        setMode,
        isStudentMode,
        toggleStudentMode,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};