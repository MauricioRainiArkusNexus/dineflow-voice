
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeConfig, RestaurantTheme } from '@/types/theme';
import { themes } from '@/config/themes';

interface ThemeContextType {
  currentTheme: ThemeConfig;
  setTheme: (theme: RestaurantTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(themes.breakfast);

  useEffect(() => {
    // Check current time to set appropriate theme
    const hour = new Date().getHours();
    const isBreakfastHours = hour >= 6 && hour < 16; // 6 AM to 4 PM
    setCurrentTheme(themes[isBreakfastHours ? 'breakfast' : 'sushi']);
  }, []);

  const setTheme = (theme: RestaurantTheme) => {
    setCurrentTheme(themes[theme]);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
