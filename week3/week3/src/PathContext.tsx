import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface PathContextType {
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

const PathContext = createContext<PathContextType | undefined>(undefined);

export const PathProvider = ({ children }: { children: ReactNode }) => {
  const [currentPath, setCurrentPath] = useState('/marimo');

  return (
    <PathContext.Provider value={{ currentPath, setCurrentPath }}>
      {children}
    </PathContext.Provider>
  );
};

export const useCurrentPath = () => {
  const context = useContext(PathContext);
  if (!context) {
    throw new Error('useCurrentPath must be used within PathProvider');
  }
  return context.currentPath;
};

export const useSetPath = () => {
  const context = useContext(PathContext);
  if (!context) {
    throw new Error('useSetPath must be used within PathProvider');
  }
  return context.setCurrentPath;
};
