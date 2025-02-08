
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { Button } from '@/components/ui/button';
import { AIWaiter } from '@/components/AIWaiter';

const Index = () => {
  const navigate = useNavigate();
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground animate-fade-in">
      <AIWaiter />
      <div className="container px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome to DineFlow</h1>
        </header>
        
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-card shadow-lg backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4">Browse Menu</h2>
            <Button onClick={() => navigate('/menu')} className="w-full">
              View Menu
            </Button>
          </div>
          
          <div className="p-6 rounded-lg bg-card shadow-lg backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
            <Button onClick={() => navigate('/profile')} className="w-full">
              View Profile
            </Button>
          </div>
          
          <div className="p-6 rounded-lg bg-card shadow-lg backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
            <Button onClick={() => navigate('/cart')} className="w-full">
              View Cart
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
