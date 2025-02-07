
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Pizza, Coffee, Salad } from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: "main" | "dessert" | "drink";
  preparationTime: string;
  ingredients: string[];
  imageUrl: string;
  icon: JSX.Element;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, basil, and our signature sauce",
    price: 14.99,
    category: "main",
    preparationTime: "15-20 min",
    ingredients: ["Tomato Sauce", "Fresh Mozzarella", "Basil", "Olive Oil"],
    imageUrl: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    icon: <Pizza className="h-6 w-6" />,
  },
  {
    id: 2,
    name: "Artisan Coffee",
    description: "Premium blend coffee with a rich, smooth taste",
    price: 4.99,
    category: "drink",
    preparationTime: "5 min",
    ingredients: ["Premium Coffee Beans", "Filtered Water"],
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    icon: <Coffee className="h-6 w-6" />,
  },
  {
    id: 3,
    name: "Garden Fresh Salad",
    description: "Mixed greens with seasonal vegetables and house dressing",
    price: 12.99,
    category: "main",
    preparationTime: "10 min",
    ingredients: ["Mixed Greens", "Cherry Tomatoes", "Cucumber", "House Dressing"],
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    icon: <Salad className="h-6 w-6" />,
  },
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "main" | "dessert" | "drink">("all");
  const { toast } = useToast();

  const filteredItems = selectedCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    // TODO: Implement cart functionality
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Our Menu</h1>
        
        {/* Category Filter */}
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

        {/* Menu Grid */}
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
                  <CardTitle>{item.name}</CardTitle>
                </div>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Preparation time: {item.preparationTime}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="text-xs bg-secondary px-2 py-1 rounded-full"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                <Button onClick={() => addToCart(item)}>Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
