
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/cartStore";
import { CartToast } from "@/components/CartToast";
import { useTheme } from "@/providers/ThemeProvider";
import { menuItems } from "@/config/themes";

export const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "main" | "dessert" | "drink">("all");
  const { toast } = useToast();
  const addToCart = useCartStore((state) => state.addItem);
  const { currentTheme } = useTheme();

  const restaurantType = currentTheme.name.toLowerCase().includes('breakfast') ? 'breakfast' : 'sushi';
  const items = menuItems[restaurantType];

  const filteredItems = selectedCategory === "all" 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: any) => {
    addToCart(item);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
      action: <CartToast />,
      duration: 5000,
    });
  };

  return (
    <div 
      className="min-h-screen bg-background p-6 animate-fade-in"
      style={{
        '--primary': currentTheme.colors.primary,
        '--secondary': currentTheme.colors.secondary,
        '--accent': currentTheme.colors.accent,
        '--background': currentTheme.colors.background,
        '--foreground': currentTheme.colors.foreground,
        '--card': currentTheme.colors.card,
        '--card-foreground': currentTheme.colors.cardForeground,
        '--border': currentTheme.colors.border,
        '--font-heading': currentTheme.font.heading,
        '--font-body': currentTheme.font.body,
      } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <img 
            src={currentTheme.logo} 
            alt={currentTheme.name}
            className="h-16 object-contain"
          />
          <h1 className="text-4xl font-heading font-bold text-center">{currentTheme.name}</h1>
        </div>
        
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </Button>
          <Button
            variant={selectedCategory === "main" ? "default" : "outline"}
            onClick={() => setSelectedCategory("main")}
          >
            Main Dishes
          </Button>
          <Button
            variant={selectedCategory === "drink" ? "default" : "outline"}
            onClick={() => setSelectedCategory("drink")}
          >
            Drinks
          </Button>
          <Button
            variant={selectedCategory === "dessert" ? "default" : "outline"}
            onClick={() => setSelectedCategory("dessert")}
          >
            Desserts
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {item.icon}
                  <CardTitle className="font-heading">{item.name}</CardTitle>
                </div>
                <CardDescription className="font-body">{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-body">
                    Preparation time: {item.preparationTime}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="text-xs bg-secondary/10 px-2 py-1 rounded-full font-body"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold font-heading">${item.price.toFixed(2)}</span>
                <Button onClick={() => handleAddToCart(item)} className="font-body">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};