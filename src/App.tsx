import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from "@/providers/ThemeProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { Menu } from "./pages/Menu";
import Checkout from "./pages/Checkout";
import VoiceTranscription from "./pages/VoiceTranscription";
import { MainLayout } from '@/components/MainLayout';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Index />
      },
      {
        path: '/menu',
        element: <Menu />
      },
      {
        path: '/checkout',
        element: <Checkout />
      },
      {
        path: '/voice',
        element: <VoiceTranscription />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
