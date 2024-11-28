import React, { createContext, useContext, useState, ReactNode } from 'react';

type Display = 'mobile' | 'desktop' | 'smallDesktop';

interface DisplayContextType {
  display: Display;
  setDisplay: (display: Display) => void; // Изменено на setDisplay
}

const DisplayContext = createContext<DisplayContextType | undefined>(undefined);

export const DisplayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [display, setDisplay] = useState<Display>('desktop');

  return (
    <DisplayContext.Provider value={{ display, setDisplay }}> {/* Изменено на setDisplay */}
      {children}
    </DisplayContext.Provider>
  );
};

export const useDisplay = () => {
  const context = useContext(DisplayContext);
  if (!context) {
    throw new Error('useDisplay must be used within a DisplayProvider');
  }
  return context;
};
