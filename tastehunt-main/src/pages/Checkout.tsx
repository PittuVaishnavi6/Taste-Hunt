import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import OTPVerification from '@/components/OTPVerification';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  AlertCircle, 
  CheckCircle, 
  MapPin, 
  Clock, 
  Leaf 
} from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { clearCart } from '@/utils/cartUtils';

interface OrderSummary {
  subtotal: number;
  items: number;
  deliveryFee: number;
  serviceFee: number;
  promoDiscount: number;
  total: number;
  estimatedDelivery: string;
  wasteReduction: string;
}

interface LocationState {
  cartItems: any[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  promoDiscount: number;
  total: number;
  estimatedWasteReduction: number;
  restaurantName?: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const { saveOrder, saveAddress, profile, addresses } = useSupabaseData();
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fraudAlert, setFraudAlert] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  
  // Redirect to auth if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
  }, [user, navigate]);

  // Initialize with default values, then update with location state if available
  const [orderSummary, setOrderSummary] = useState<OrderSummary>({
    subtotal: 280, // ₹280 reasonable subtotal
    items: 3,
    deliveryFee: 30, // ₹30 delivery fee
    serviceFee: 15, // ₹15 service fee
    promoDiscount: 50, // ₹50 promo discount
    total: 275, // ₹275 total
    estimatedDelivery: '25-35 min',
    wasteReduction: '91%'
  });
  
  // Get cart items from location state
  useEffect(() => {
    const state = location.state as LocationState | null;
    if (state) {
      setOrderSummary({
        subtotal: state.subtotal,
        items: state.cartItems.length,
        deliveryFee: state.deliveryFee,
        serviceFee: state.serviceFee,
        promoDiscount: state.promoDiscount,
        total: state.total,
        estimatedDelivery: '25-35 min',
        wasteReduction: `${state.estimatedWasteReduction}%`
      });
    }
  }, [location.state]);
  
  // Pre-fill form with profile data
  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
      }));
    }
  }, [profile]);

  // Pre-fill address if user has saved addresses
  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddress = addresses.find(addr => addr.is_default) || addresses[0];
      setFormData(prev => ({
        ...prev,
        address: defaultAddress.address
      }));
    }
  }, [addresses]);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    phone: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
    instructions: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber' && value.replace(/\s/g, '').startsWith('1234')) {
      setFraudAlert(true);
    } else if (name === 'cardNumber') {
      setFraudAlert(false);
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (fraudAlert) {
      return;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to place an order.",
        variant: "destructive"
      });
      return;
    }
    
    setShowOTPVerification(true);
  };

  const handleVerificationSuccess = async () => {
    setLoading(true);
    
    try {
      const state = location.state as LocationState | null;
      const cartItems = state?.cartItems || [];
      
      // Save address if it's new
      if (formData.address.trim()) {
        await saveAddress({
          type: 'Delivery',
          address: `${formData.address}, ${formData.city}, ${formData.zip}`
        });
      }

      // Get restaurant name from location state or cart items
      const restaurantName = state?.restaurantName || 
        cartItems[0]?.restaurant || 
        'Green Garden Bistro'; // fallback

      // Prepare order data
      const orderData = {
        restaurant_name: restaurantName,
        delivery_address: `${formData.address}, ${formData.city}, ${formData.zip}`,
        subtotal: orderSummary.subtotal,
        delivery_fee: orderSummary.deliveryFee,
        service_fee: orderSummary.serviceFee,
        promo_discount: orderSummary.promoDiscount,
        total: orderSummary.total,
        estimated_delivery: orderSummary.estimatedDelivery,
        items: cartItems.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          restaurant: item.restaurant || restaurantName
        }))
      };

      console.log('Saving order:', orderData);
      const orderId = await saveOrder(orderData);
      
      if (orderId) {
        // Clear the cart
        clearCart();
        
        toast({
          title: "Order placed successfully!",
          description: "Your order has been confirmed and saved.",
        });

        // Navigate to order confirmation with the real order ID
        navigate(`/order-confirmation/${orderId}`);
      } else {
        throw new Error('Failed to save order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Error placing order",
        description: "There was an error saving your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationCancel = () => {
    setShowOTPVerification(false);
    toast({
      title: "Verification cancelled",
      description: "Your order has not been processed.",
    });
  };

  if (!user) {
    return null; // Will redirect to auth
  }

  if (showOTPVerification) {
    return (
      <div className="container py-8 px-4 md:px-6">
        <OTPVerification 
          onVerify={handleVerificationSuccess}
          onCancel={handleVerificationCancel}
        />
      </div>
    );
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter">Checkout</h1>
        <p className="text-muted-foreground">Complete your order</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    value={formData.address}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      value={formData.city}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input 
                      id="zip" 
                      name="zip" 
                      value={formData.zip}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                  <Textarea 
                    id="instructions" 
                    name="instructions" 
                    placeholder="Add any special instructions for delivery"
                    value={formData.instructions}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Delivery Options</Label>
                  <RadioGroup 
                    value={deliveryOption} 
                    onValueChange={setDeliveryOption}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="font-normal cursor-pointer flex-1">
                        <div className="flex justify-between">
                          <span>Standard Delivery (25-35 min)</span>
                          <span>₹30</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="font-normal cursor-pointer flex-1">
                        <div className="flex justify-between">
                          <span>Express Delivery (15-20 min)</span>
                          <span>₹50</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="eco" id="eco" />
                      <Label htmlFor="eco" className="font-normal cursor-pointer flex-1">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span>Eco-Friendly Delivery</span>
                            <Leaf className="h-4 w-4 ml-2 text-green-dark" />
                          </div>
                          <span>₹35</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Carbon-neutral delivery using electric vehicles or bikes
                        </p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="credit-card" value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="credit-card" className="space-y-4">
                    {fraudAlert && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Fraud Alert</AlertTitle>
                        <AlertDescription>
                          Our system has detected suspicious activity with this card number. 
                          Please use a different payment method or contact customer support.
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        name="cardNumber" 
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required={paymentMethod === 'credit-card'}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input 
                          id="expiry" 
                          name="expiry" 
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          required={paymentMethod === 'credit-card'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          name="cvv" 
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required={paymentMethod === 'credit-card'}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input 
                        id="nameOnCard" 
                        name="nameOnCard" 
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                        required={paymentMethod === 'credit-card'}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="paypal" className="space-y-4">
                    <p className="text-center text-muted-foreground py-4">
                      You'll be redirected to PayPal to complete your payment securely.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-green-dark hover:bg-green text-white"
              disabled={loading || (paymentMethod === 'credit-card' && fraudAlert)}
            >
              {loading ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </div>
        
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({orderSummary.items} items)</span>
                <span>₹{orderSummary.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>₹{orderSummary.deliveryFee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service Fee</span>
                <span>₹{orderSummary.serviceFee}</span>
              </div>
              <div className="flex justify-between text-sm text-green-dark">
                <span>Promo Discount</span>
                <span>-₹{orderSummary.promoDiscount}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{orderSummary.total}</span>
              </div>
              
              <div className="bg-muted p-3 rounded-md mt-4 space-y-2">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Estimated Delivery:</span>
                  <span className="ml-auto font-medium">{orderSummary.estimatedDelivery}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Leaf className="h-4 w-4 mr-2 text-green-dark" />
                  <span className="text-muted-foreground">Waste Reduction:</span>
                  <span className="ml-auto font-medium text-green-dark">{orderSummary.wasteReduction}</span>
                </div>
              </div>
              
              <div className="bg-green-light/10 p-3 rounded-md border border-green-light">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-dark mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-green-dark">Sustainable Order Verified</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      This order meets our sustainability standards for ingredients, 
                      packaging, and efficient delivery routing.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
