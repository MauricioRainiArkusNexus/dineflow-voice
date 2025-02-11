
import { ThemeConfig } from '@/types/theme';

export const themes: Record<string, ThemeConfig> = {
  breakfast: {
    name: "Rocco's Breakfast & Brunch",
    logo: "/lovable-uploads/59b4188e-23e4-4854-9379-e472f12d2daf.png",
    colors: {
      primary: "#FEF7CD", // Soft warm yellow from logo
      secondary: "#FEC6A1", // Warm peach
      accent: "#F2FCE2", // Fresh mint
      background: "#FFFFFF",
      foreground: "#2D3436",
      text: "#2D3436",
      card: "rgba(255, 255, 255, 0.9)",
      cardForeground: "#2D3436",
      border: "#E2E8F0"
    },
    font: {
      heading: "'Poppins', sans-serif", // Modern, friendly font
      body: "'Inter', sans-serif", // Clean, readable font
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
      primary: "#EA384C", // Vibrant red from logo
      secondary: "#1A1F2C", // Deep navy
      accent: "#8B5CF6", // Royal purple
      background: "#0F1116", // Dark background
      foreground: "#FFFFFF",
      text: "#FFFFFF",
      card: "rgba(26, 31, 44, 0.9)",
      cardForeground: "#FFFFFF",
      border: "#2D3748"
    },
    font: {
      heading: "'Playfair Display', serif", // Elegant, luxury font
      body: "'Montserrat', sans-serif", // Modern, sophisticated font
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

export const menuItems = {
  breakfast: [
    {
      id: 1,
      name: "Eggs Benedict Florentine",
      description: "Poached eggs on English muffins with sautéed spinach, hollandaise sauce, and your choice of smoked salmon or ham",
      price: 16.99,
      category: "main",
      preparationTime: "15-20 min",
      ingredients: ["Eggs", "English Muffin", "Spinach", "Hollandaise Sauce"],
      imageUrl: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7",
    },
    {
      id: 2,
      name: "Brioche French Toast",
      description: "Thick-cut brioche bread dipped in vanilla-cinnamon batter, served with maple syrup and fresh berries",
      price: 14.99,
      category: "main",
      preparationTime: "12-15 min",
      ingredients: ["Brioche Bread", "Fresh Berries", "Maple Syrup", "Whipped Cream"],
      imageUrl: "https://images.unsplash.com/photo-1484723091739-30a097e8f929",
    },
    {
      id: 3,
      name: "Avocado Toast Deluxe",
      description: "Sourdough toast topped with smashed avocado, poached egg, cherry tomatoes, and microgreens",
      price: 13.99,
      category: "main",
      preparationTime: "10-12 min",
      ingredients: ["Sourdough Bread", "Avocado", "Eggs", "Cherry Tomatoes"],
      imageUrl: "https://images.unsplash.com/photo-1603046891744-56e9c3c19bc3",
    },
    {
      id: 4,
      name: "Fresh Berry Parfait",
      description: "Layers of Greek yogurt, house-made granola, honey, and fresh seasonal berries",
      price: 9.99,
      category: "dessert",
      preparationTime: "5-7 min",
      ingredients: ["Greek Yogurt", "House Granola", "Mixed Berries", "Honey"],
      imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
    },
    {
      id: 5,
      name: "Artisanal Coffee Flight",
      description: "Sample our three signature coffee roasts: Morning Light, Mountain Blend, and Dark Roast",
      price: 8.99,
      category: "drink",
      preparationTime: "5 min",
      ingredients: ["Morning Light Roast", "Mountain Blend", "Dark Roast"],
      imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    }
  ],
  sushi: [
    {
      id: 1,
      name: "Omakase Selection",
      description: "Chef's daily selection of premium nigiri and sashimi, featuring seasonal catches",
      price: 89.99,
      category: "main",
      preparationTime: "25-30 min",
      ingredients: ["Premium Fish Selection", "Specialty Rice", "Wasabi", "House Soy Sauce"],
      imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
    },
    {
      id: 2,
      name: "Dragon Roll Deluxe",
      description: "Tempura shrimp, avocado, unagi, and tobiko with special sauce",
      price: 24.99,
      category: "main",
      preparationTime: "15-20 min",
      ingredients: ["Shrimp Tempura", "Avocado", "Eel", "Flying Fish Roe"],
      imageUrl: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56",
    },
    {
      id: 3,
      name: "Torch-Seared Salmon Nigiri",
      description: "Premium salmon belly, torch-seared and topped with truffle oil",
      price: 18.99,
      category: "main",
      preparationTime: "10-12 min",
      ingredients: ["Salmon Belly", "Truffle Oil", "Green Onion", "Special Sauce"],
      imageUrl: "https://images.unsplash.com/photo-1534482421-64566f976cfa",
    },
    {
      id: 4,
      name: "Green Tea Ice Cream",
      description: "House-made matcha ice cream with mochi and red bean paste",
      price: 8.99,
      category: "dessert",
      preparationTime: "5 min",
      ingredients: ["Matcha", "Mochi", "Red Bean", "Whipped Cream"],
      imageUrl: "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7",
    },
    {
      id: 5,
      name: "Sake Flight",
      description: "Selection of three premium sakes: Junmai Daiginjo, Ginjo, and Nigori",
      price: 24.99,
      category: "drink",
      preparationTime: "5 min",
      ingredients: ["Junmai Daiginjo", "Ginjo", "Nigori"],
      imageUrl: "https://images.unsplash.com/photo-1603394151492-b4a8466bdec6",
    }
  ]
};
