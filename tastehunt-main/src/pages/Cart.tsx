import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { 
  MinusCircle, 
  PlusCircle, 
  Trash2, 
  Leaf, 
  AlertCircle,
  Info
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { getCartItems, updateItemQuantity, removeFromCart } from '@/utils/cartUtils';
import { analyzeFraudRisk } from '@/utils/fraudDetection';
import OTPVerification from '@/components/OTPVerification';

export const useCartItems = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  
  // Load initial cart items
  useEffect(() => {
    setCartItems(getCartItems());
    
    // Listen for cart updates
    const handleCartUpdate = () => {
      setCartItems(getCartItems());
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const updateCart = (newCart: any[]) => {
    setCartItems(newCart);
    localStorage.setItem('cartItems', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return { cartItems, updateCart };
};

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cartItems, updateCart } = useCartItems();
  
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [fraudDetection, setFraudDetection] = useState({
    alert: false,
    message: '',
    requiresOTP: false
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 30; // ₹30 delivery fee
  const serviceFee = 15; // ₹15 service fee
  const promoDiscount = appliedPromo ? 50 : 0; // ₹50 discount
  const total = subtotal + deliveryFee + serviceFee - promoDiscount;
  
  const avgSustainabilityScore = cartItems.length > 0 
    ? cartItems.reduce((sum, item) => sum + item.sustainabilityScore, 0) / cartItems.length 
    : 0;
  
  const estimatedWasteReduction = cartItems.length > 0 
    ? Math.round(avgSustainabilityScore * 0.9) 
    : 0;

  // Check for fraud patterns whenever cart changes
  useEffect(() => {
    if (cartItems.length > 0) {
      const orderData = {
        userId: 'user123',
        totalAmount: total,
        items: cartItems.map(item => ({
          id: item.id.toString(),
          quantity: item.quantity,
          price: item.price
        })),
        deliveryAddress: '',
        paymentMethod: 'credit-card'
      };

      const fraudResult = analyzeFraudRisk(orderData);
      
      if (fraudResult.isFraudulent || fraudResult.riskLevel === 'high') {
        setFraudDetection({
          alert: true,
          message: 'Unusual order pattern detected. For security, we need to verify your identity before proceeding.',
          requiresOTP: true
        });
      } else if (fraudResult.riskLevel === 'medium') {
        setFraudDetection({
          alert: true,
          message: 'We noticed some unusual patterns in your order. Please review your items.',
          requiresOTP: false
        });
      } else {
        setFraudDetection({
          alert: false,
          message: '',
          requiresOTP: false
        });
      }
    }
  }, [cartItems, total]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = updateItemQuantity(id, newQuantity);
    updateCart(updatedCart);
  };

  const removeItem = (id: number) => {
    const updatedCart = removeFromCart(id);
    updateCart(updatedCart);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'eco25') {
      setAppliedPromo(true);
      toast({
        title: "Promo code applied",
        description: "You got ₹50 off your order!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid promo code",
        description: "Please enter a valid promo code.",
      });
    }
  };

  const proceedToCheckout = () => {
    if (fraudDetection.requiresOTP) {
      setShowOTPVerification(true);
      return;
    }

    navigate('/checkout', { 
      state: { 
        cartItems,
        subtotal,
        deliveryFee,
        serviceFee,
        promoDiscount,
        total,
        estimatedWasteReduction
      }
    });
  };

  const handleOTPVerification = () => {
    setShowOTPVerification(false);
    setFraudDetection(prev => ({ ...prev, requiresOTP: false, alert: false }));
    
    navigate('/checkout', { 
      state: { 
        cartItems,
        subtotal,
        deliveryFee,
        serviceFee,
        promoDiscount,
        total,
        estimatedWasteReduction
      }
    });
  };

  const handleOTPCancel = () => {
    setShowOTPVerification(false);
  };

  if (showOTPVerification) {
    return (
      <div className="container py-8 px-4 md:px-6">
        <div className="max-w-md mx-auto">
          <OTPVerification 
            onVerify={handleOTPVerification}
            onCancel={handleOTPCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter">Your Cart</h1>
        <p className="text-muted-foreground">Review your items before checkout</p>
      </div>

      {fraudDetection.alert && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Security Alert</AlertTitle>
          <AlertDescription>
            {fraudDetection.message}
          </AlertDescription>
        </Alert>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add items from our restaurants to get started</p>
          <Link to="/restaurants">
            <Button size="lg">Browse Restaurants</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                          {item.sustainabilityScore > 94 && (
                            <div className="absolute bottom-0 right-0 m-1">
                              <Badge className="bg-green-dark text-xs flex items-center gap-1">
                                <Leaf className="h-3 w-3" />
                                Eco
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {item.restaurantName}
                              </p>
                              <div className="mt-1 flex items-center">
                                <span className="text-sm">₹{item.price}</span>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="ml-2 flex items-center">
                                        <Badge variant="outline" className="text-xs">
                                          {item.sustainabilityScore}% sustainable
                                        </Badge>
                                        <Info className="h-3 w-3 ml-1" />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-xs max-w-[200px]">
                                        This score represents how sustainable this dish is based on 
                                        ingredients, packaging, and preparation methods.
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <MinusCircle className="h-4 w-4" />
                                <span className="sr-only">Decrease quantity</span>
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <PlusCircle className="h-4 w-4" />
                                <span className="sr-only">Increase quantity</span>
                              </Button>
                            </div>
                          </div>
                          <div className="mt-2 flex justify-between">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-muted-foreground"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                            <span className="font-medium">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Separator className="my-6" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <Link to="/restaurants">
                    <Button variant="link" className="pl-0">
                      Add more items
                    </Button>
                  </Link>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Leaf className="h-4 w-4 mr-1 text-green-dark" />
                    <span>Average sustainability score: {Math.round(avgSustainabilityScore)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-light/10 border-green-light">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Leaf className="h-6 w-6 text-green-dark flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-green-dark">Your Environmental Impact</h3>
                    <p className="text-sm mt-1">
                      By ordering from sustainable restaurants, your order is helping to reduce food waste.
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm text-muted-foreground">Estimated food waste reduction</p>
                        <p className="text-2xl font-bold text-green-dark">{estimatedWasteReduction}%</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm text-muted-foreground">CO₂ emissions saved</p>
                        <p className="text-2xl font-bold text-green-dark">1.3 kg</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span>₹{serviceFee}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-green-dark">
                      <span>Promo (ECO25)</span>
                      <span>-₹{promoDiscount}</span>
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {!appliedPromo && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={applyPromoCode}>Apply</Button>
                    </div>
                  )}
                  <Button 
                    className="w-full bg-green-dark hover:bg-green text-white"
                    size="lg"
                    onClick={proceedToCheckout}
                  >
                    {fraudDetection.requiresOTP ? "Verify & Checkout" : "Proceed to Checkout"}
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 px-6 py-3 text-xs text-muted-foreground">
                <p>
                  Our fraud detection system monitors all transactions for your security.
                  We analyze ordering patterns, location, and payment details to prevent fraudulent activity.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
