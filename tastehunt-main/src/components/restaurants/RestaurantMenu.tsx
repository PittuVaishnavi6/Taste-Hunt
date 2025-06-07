
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Minus } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { getCartItems, addToCart, removeFromCart, updateItemQuantity, calculateCartTotals } from '@/utils/cartUtils';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface RestaurantMenuProps {
  menu: {
    [category: string]: MenuItem[];
  };
  restaurantName: string;
}

const RestaurantMenu = ({ menu, restaurantName }: RestaurantMenuProps) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  
  useEffect(() => {
    const updateCart = () => {
      setCartItems(getCartItems());
    };
    
    updateCart();
    window.addEventListener('cartUpdated', updateCart);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCart);
    };
  }, []);
  
  const handleAddToCart = (item: MenuItem) => {
    const cartItem = {
      ...item,
      restaurantName,
      quantity: 1
    };
    
    addToCart(cartItem);
    
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };
  
  const handleRemoveFromCart = (itemId: number) => {
    const existingItem = cartItems.find(item => item.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      updateItemQuantity(itemId, existingItem.quantity - 1);
    } else {
      removeFromCart(itemId);
    }
  };
  
  const handleIncreaseQuantity = (item: MenuItem) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      updateItemQuantity(item.id, existingItem.quantity + 1);
    } else {
      handleAddToCart(item);
    }
  };
  
  const getItemQuantity = (itemId: number) => {
    const item = cartItems.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };
  
  const categories = Object.keys(menu);
  const totals = calculateCartTotals(cartItems);
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">{restaurantName} Menu</h2>
        <p className="text-muted-foreground">Choose from our delicious selection</p>
      </div>
      
      <Tabs defaultValue={categories[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {categories.map((category) => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="capitalize text-xs md:text-sm"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {menu[category].map((item) => {
                const quantity = getItemQuantity(item.id);
                
                return (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">
                        ₹{item.price}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">₹{item.price}</span>
                        
                        {quantity > 0 ? (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            
                            <span className="font-medium min-w-[20px] text-center">
                              {quantity}
                            </span>
                            
                            <Button
                              size="sm"
                              onClick={() => handleIncreaseQuantity(item)}
                              className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(item)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {cartItems.length > 0 && (
        <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Cart Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>₹{totals.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee:</span>
                <span>₹{totals.deliveryFee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service Fee:</span>
                <span>₹{totals.serviceFee}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>₹{totals.total}</span>
              </div>
            </div>
            
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Proceed to Checkout
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RestaurantMenu;
