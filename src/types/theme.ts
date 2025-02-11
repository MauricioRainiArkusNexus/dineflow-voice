
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  text: string;
  card: string;
  cardForeground: string;
  border: string;
}

export interface ThemeConfig {
  name: string;
  logo: string;
  colors: ThemeColors;
  font: {
    heading: string;
    body: string;
  };
  images: {
    hero: string;
    menu: string[];
  };
}

export type RestaurantTheme = 'breakfast' | 'sushi';
