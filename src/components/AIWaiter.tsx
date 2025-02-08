
import { useState, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCartStore } from '@/store/cartStore';
import { Bot, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AIWaiter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'agent', content: string }>>([]);
  const conversation = useConversation();
  const { toast } = useToast();
  const addItem = useCartStore((state) => state.addItem);

  const menuItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Fresh tomatoes, mozzarella, basil, and our signature sauce",
      price: 14.99,
      category: "main" as const,
      preparationTime: "15-20 min",
      ingredients: ["Tomato Sauce", "Fresh Mozzarella", "Basil", "Olive Oil"],
      imageUrl: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    },
    {
      id: 2,
      name: "Artisan Coffee",
      description: "Premium blend coffee with a rich, smooth taste",
      price: 4.99,
      category: "drink" as const,
      preparationTime: "5 min",
      ingredients: ["Premium Coffee Beans", "Filtered Water"],
      imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    },
    {
      id: 3,
      name: "Garden Fresh Salad",
      description: "Mixed greens with seasonal vegetables and house dressing",
      price: 12.99,
      category: "main" as const,
      preparationTime: "10 min",
      ingredients: ["Mixed Greens", "Cherry Tomatoes", "Cucumber", "House Dressing"],
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
  ];

  const startConversation = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsListening(true);
      
      await conversation.startSession({
        agentId: 'KzhqQGKZ0aVtYnrtTXkW',
        overrides: {
          agent: {
            language: 'en',
            prompt: {
              prompt: `You are a friendly AI waiter at our restaurant. You can help customers with:
              1. Taking orders from our menu which includes: ${menuItems.map(item => `${item.name} ($${item.price})`).join(', ')}
              2. Answering questions about ingredients, preparation time, and prices
              3. Making recommendations based on customer preferences
              
              Only recommend and accept orders for items that are actually on our menu. If a customer asks for something we don't have, politely explain what we do have instead.
              
              When a customer wants to order something, confirm the order and add it to their cart.
              
              Always respond in a friendly and helpful manner, as if you were a real waiter in a restaurant.`,
            },
            firstMessage: "Hello! I'm your AI waiter today. I can help you explore our menu, answer questions about our dishes, or take your order. What would you like to know?",
          },
        },
      });

      if (conversation.status === "connected") {
        setIsOpen(true);
        setMessages(prev => [...prev, { 
          type: 'agent', 
          content: "Hello! I'm your AI waiter today. I can help you explore our menu, answer questions about our dishes, or take your order. What would you like to know?" 
        }]);
      }

    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: "Error",
        description: "Failed to start conversation. Please check your microphone permissions.",
        variant: "destructive",
      });
    }
  };

  const stopConversation = () => {
    setIsListening(false);
    setIsOpen(false);
    conversation.endSession();
  };

  useEffect(() => {
    if (!conversation) return;

    const handleMessage = (message: any) => {
      console.log('Received message:', message);

      if (message.type === 'transcript' && message.content) {
        setMessages(prev => [...prev, { type: 'user', content: message.content }]);
      }
      
      if (message.type === 'message' && message.content) {
        setMessages(prev => [...prev, { type: 'agent', content: message.content }]);
      }

      if (message.type === 'intent' && message.content === 'add_to_cart') {
        const itemName = message.data?.itemName?.toLowerCase();
        const menuItem = menuItems.find(
          item => item.name.toLowerCase() === itemName
        );
        
        if (menuItem) {
          addItem(menuItem);
          toast({
            title: "Added to cart",
            description: `${menuItem.name} has been added to your cart`,
          });
        }
      }
    };

    // @ts-ignore - we know these events exist even though types don't show them
    conversation.onMessage = handleMessage;

    return () => {
      // @ts-ignore
      conversation.onMessage = null;
    };
  }, [conversation, addItem, toast]);

  return (
    <div className="fixed top-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={startConversation}
          className="rounded-full w-12 h-12 p-0"
          variant="default"
        >
          <Bot className="w-6 h-6" />
        </Button>
      ) : (
        <Card className="w-[350px] p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">AI Waiter</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={stopConversation}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="min-h-[200px] max-h-[400px] overflow-y-auto bg-muted rounded-lg p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-2 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground ml-4' 
                      : 'bg-secondary text-secondary-foreground mr-4'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isListening && (
              <p className="text-sm text-muted-foreground italic">
                Listening... Speak to place your order or ask questions about our menu.
              </p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
