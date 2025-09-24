import React from 'react';
import { useMode } from '@/contexts/ModeContext';
import ReadHome from './ReadHome';
import ListenHome from './ListenHome';

const ModeBasedHome: React.FC = () => {
  const { mode } = useMode();

  console.log('ModeBasedHome - Current mode:', mode);

  // Force re-render by using mode as key
  return mode === 'read' ? <ReadHome key={`read-${mode}`} /> : <ListenHome key={`listen-${mode}`} />;
};

export default ModeBasedHome;
