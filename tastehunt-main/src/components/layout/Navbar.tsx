
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, ShoppingCart, User, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile } = useSupabaseData();
  
  // Update cart count whenever localStorage changes
  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        const cartItems = JSON.parse(storedCart);
        setCartCount(cartItems.length);
      } else {
        setCartCount(0);
      }
    };
    
    updateCartCount();
    
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      toast({
        title: "Search Required",
        description: "Please enter a restaurant name or dish to search.",
        variant: "destructive",
      });
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };
  
  return (
    <header
      className="sticky top-0 z-40 w-full border-b bg-card backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg"
      style={{
        fontFamily: '"Playfair Display", serif',
      }}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-primary">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px] bg-card">
              <nav className="flex flex-col gap-4 mt-8 font-bold">
                <Link to="/" className="text-lg font-bold text-foreground">Home</Link>
                <Link to="/restaurants" className="text-lg font-bold text-foreground">Restaurants</Link>
                {user ? (
                  <>
                    <Link to="/profile" className="text-lg font-bold text-foreground">My Profile</Link>
                    <button onClick={handleLogout} className="text-lg font-bold text-primary hover:underline text-left">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/auth" className="text-lg font-bold text-primary hover:underline">Login</Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-extrabold text-2xl text-foreground tracking-tight">TasteHunt</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-6 font-medium">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-primary hover:underline transition-colors">
              Home
            </Link>
            <Link to="/restaurants" className="text-sm font-medium text-foreground hover:text-primary hover:underline transition-colors">
              Restaurants
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-foreground">Welcome, {profile?.name || user.email}</span>
                <button 
                  onClick={handleLogout}
                  className="text-sm font-medium text-primary hover:underline transition-colors flex items-center gap-1"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/auth" className="text-sm font-medium text-primary hover:underline transition-colors">
                Login
              </Link>
            )}
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="relative flex items-center">
            <Input
              type="search"
              placeholder="Search restaurants or dishes..."
              className="rounded-full w-[200px] pl-4 pr-10 md:w-[300px] bg-background border-primary/20"
              style={{ fontFamily: '"Playfair Display", serif' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative text-foreground hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          {user ? (
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary transition-colors">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary transition-colors">
                <User className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
