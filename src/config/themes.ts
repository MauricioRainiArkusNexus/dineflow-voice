
import { ThemeConfig } from '@/types/theme';

export const themes: Record<string, ThemeConfig> = {
  breakfast: {
    name: "Rocco's Breakfast & Brunch",
    logo: "/lovable-uploads/59b4188e-23e4-4854-9379-e472f12d2daf.png",
    colors: {
      primary: "#FEF7CD",
      secondary: "#FEC6A1",
      accent: "#F2FCE2",
      background: "#FFFFFF",
      foreground: "#2D3436",
      text: "#2D3436",
      card: "rgba(255, 255, 255, 0.9)",
      cardForeground: "#2D3436",
      border: "#E2E8F0"
    },
    font: {
      heading: "'Poppins', sans-serif",
      body: "'Inter', sans-serif",
    },
    images: {
      hero: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      menu: [
        "https://images.unsplash.com/photo-1600336153113-d66c79de3e91",
        "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666",
      ]
    }
  },
  sushi: {
    name: "Rocahana Sushi",
    logo: "/lovable-uploads/0e7e5515-0268-4ea5-918c-135505ca14f1.png",
    colors: {
      primary: "#EA384C",
      secondary: "#1A1F2C",
      accent: "#8B5CF6",
      background: "#0F1116",
      foreground: "#FFFFFF",
      text: "#FFFFFF",
      card: "rgba(26, 31, 44, 0.9)",
      cardForeground: "#FFFFFF",
      border: "#2D3748"
    },
    font: {
      heading: "'Playfair Display', serif",
      body: "'Montserrat', sans-serif",
    },
    images: {
      hero: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
      menu: [
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
        "https://images.unsplash.com/photo-1611143669185-af224c5e3252",
      ]
    }
  }
};
