
import { ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/providers/ThemeProvider";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, removeItem } = useCartStore();
  const { currentTheme } = useTheme();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-heading font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground font-body mb-4">
            Add some delicious items from our menu to get started
          </p>
          <Button onClick={() => navigate("/menu")}>View Menu</Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-background text-foreground p-6"
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
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <img 
            src={currentTheme.logo} 
            alt={currentTheme.name}
            className="h-16 object-contain"
          />
          <h1 className="text-3xl font-heading font-bold">{currentTheme.name}</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-16 w-16 rounded object-cover"
                      />
                      <div>
                        <p className="font-heading font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground font-body">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between font-heading">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-body">
                  Payment integration will be implemented here
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full font-body">Place Order</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
