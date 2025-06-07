
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  CheckCircle,
  Clock,
  MapPin,
  Leaf,
  Receipt,
  ThumbsUp,
  PanelRightOpen,
  Package
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseData, Order } from '@/hooks/useSupabaseData';
import { supabase } from '@/integrations/supabase/client';

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useSupabaseData();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderProgress, setOrderProgress] = useState(10);
  
  // Redirect to auth if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
  }, [user, navigate]);

  // Fetch specific order by ID
  useEffect(() => {
    const fetchOrder = async () => {
      if (!user || !orderId) return;
      
      setLoading(true);
      try {
        console.log('Fetching order:', orderId);
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (*)
          `)
          .eq('id', orderId)
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching order:', error);
          return;
        }

        console.log('Order data:', data);
        setOrder(data);
      } catch (error) {
        console.error('Error in fetchOrder:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [user, orderId]);
  
  // Simulate order progress
  useEffect(() => {
    const interval = setInterval(() => {
      setOrderProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(interval);
        return 100;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Determine order stage based on progress
  const getOrderStage = () => {
    if (orderProgress < 25) return 'confirmed';
    if (orderProgress < 50) return 'preparing';
    if (orderProgress < 75) return 'ready';
    return 'delivering';
  };
  
  // Get stage description
  const getStageDescription = () => {
    const stage = getOrderStage();
    switch (stage) {
      case 'confirmed':
        return 'Your order is confirmed and being processed by our fraud detection system.';
      case 'preparing':
        return 'The restaurant is preparing your food with fresh ingredients.';
      case 'ready':
        return 'Your food is ready and waiting for the delivery driver.';
      case 'delivering':
        return 'Your food is on the way! Driver is using the most efficient route.';
      default:
        return '';
    }
  };
  
  // Format remaining time - using mock data since estimatedArrival doesn't exist in Order type
  const getFormattedRemainingTime = () => {
    const now = new Date();
    const estimatedArrival = new Date(now.getTime() + 25 * 60 * 1000); // 25 minutes from now
    const diff = estimatedArrival.getTime() - now.getTime();
    
    if (diff <= 0) return 'Arriving now';
    
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes} min`;
  };
  
  if (!user) {
    return null; // Will redirect to auth
  }

  if (loading) {
    return (
      <div className="container py-8 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-tighter">Loading Order...</h1>
          <p className="text-muted-foreground mt-2">Please wait while we fetch your order details.</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-8 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
              <Receipt className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter">Order Not Found</h1>
          <p className="text-muted-foreground mt-2">
            We couldn't find the order you're looking for.
          </p>
          <Button className="mt-4" asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Mock data for sustainability metrics since they don't exist in the Order type
  const sustainabilityData = {
    wasteReduction: '91%',
    sustainabilityScore: 85,
    packagingType: 'Eco-friendly',
    driverName: 'Rajesh Kumar'
  };

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-light/20 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-dark" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter">Order Confirmed!</h1>
          <p className="text-muted-foreground mt-2">
            Your order #{order.id.slice(0, 8)} has been placed successfully.
          </p>
          {profile && (
            <p className="text-sm text-muted-foreground mt-1">
              Ordered by: {profile.name} ({profile.email})
            </p>
          )}
        </div>
        
        {/* Order Progress */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">Order Status</h2>
                <Badge variant={getOrderStage() === 'delivering' ? 'default' : 'outline'}>
                  {getOrderStage() === 'confirmed' && 'Confirmed'}
                  {getOrderStage() === 'preparing' && 'Preparing'}
                  {getOrderStage() === 'ready' && 'Ready'}
                  {getOrderStage() === 'delivering' && 'On the way'}
                </Badge>
              </div>
              
              <Progress value={orderProgress} className="h-2" />
              
              <p className="text-sm text-muted-foreground">{getStageDescription()}</p>
              
              <div className="grid grid-cols-4 gap-2 pt-4">
                <div className="flex flex-col items-center text-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${orderProgress >= 0 ? 'bg-green-dark text-white' : 'bg-muted text-muted-foreground'}`}>
                    <Receipt className="h-5 w-5" />
                  </div>
                  <p className="text-xs mt-2">Confirmed</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${orderProgress >= 25 ? 'bg-green-dark text-white' : 'bg-muted text-muted-foreground'}`}>
                    <PanelRightOpen className="h-5 w-5" />
                  </div>
                  <p className="text-xs mt-2">Preparing</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${orderProgress >= 50 ? 'bg-green-dark text-white' : 'bg-muted text-muted-foreground'}`}>
                    <Package className="h-5 w-5" />
                  </div>
                  <p className="text-xs mt-2">Ready</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${orderProgress >= 75 ? 'bg-green-dark text-white' : 'bg-muted text-muted-foreground'}`}>
                    <MapPin className="h-5 w-5" />
                  </div>
                  <p className="text-xs mt-2">Delivering</p>
                </div>
              </div>
              
              {orderProgress >= 75 && (
                <div className="bg-muted p-4 rounded-lg mt-4 flex items-start space-x-3">
                  <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                    <ThumbsUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{sustainabilityData.driverName} is on the way with your order</p>
                    <div className="flex items-center mt-2 text-sm">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">Estimated arrival in:</span>
                      <span className="ml-1 font-medium">{getFormattedRemainingTime()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Order Details */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="font-bold text-lg mb-4">Order Details</h2>
            
            <div className="mb-4">
              <p className="font-medium">{order.restaurant_name}</p>
              <p className="text-sm text-muted-foreground">Order #{order.id.slice(0, 8)}</p>
              <p className="text-sm text-muted-foreground">
                Placed on {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
              </p>
            </div>
            
            <div className="space-y-3">
              {order.order_items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex items-start">
                    <span className="text-sm mr-2">{item.quantity}x</span>
                    <span>{item.name}</span>
                  </div>
                  <span>₹{(Number(item.price) * item.quantity).toFixed(0)}</span>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{Number(order.subtotal).toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>₹{Number(order.delivery_fee).toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Fee</span>
                <span>₹{Number(order.service_fee).toFixed(0)}</span>
              </div>
              {Number(order.promo_discount) > 0 && (
                <div className="flex justify-between text-green-dark">
                  <span>Promo Discount</span>
                  <span>-₹{Number(order.promo_discount).toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium pt-2">
                <span>Total</span>
                <span>₹{Number(order.total).toFixed(0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Delivery Information */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="font-bold text-lg mb-4">Delivery Information</h2>
            
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Delivery Address</p>
                <p className="text-sm text-muted-foreground">{order.delivery_address}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 mt-4">
              <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Estimated Delivery Time</p>
                <p className="text-sm text-muted-foreground">{order.estimated_delivery || '25-35 min'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Sustainability Information */}
        <Card className="mb-6 bg-green-light/10 border-green-light">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Leaf className="h-6 w-6 text-green-dark flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="font-bold text-lg text-green-dark mb-2">Sustainability Impact</h2>
                <p className="text-sm mb-4">
                  Your order is helping to reduce food waste and environmental impact.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-muted-foreground">Food waste reduction</p>
                    <p className="text-2xl font-bold text-green-dark">{sustainabilityData.wasteReduction}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-muted-foreground">Sustainability score</p>
                    <p className="text-2xl font-bold text-green-dark">{sustainabilityData.sustainabilityScore}/100</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-muted-foreground">Packaging type</p>
                    <p className="text-lg font-bold text-green-dark">{sustainabilityData.packagingType}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-muted-foreground">CO₂ saved</p>
                    <p className="text-lg font-bold text-green-dark">1.6 kg</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            className="flex-1 bg-green-dark hover:bg-green text-white"
            size="lg"
            asChild
          >
            <Link to="/">Order Again</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            asChild
          >
            <Link to="/profile">View Order History</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
