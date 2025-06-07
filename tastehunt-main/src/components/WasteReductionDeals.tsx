import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Leaf, Percent } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addToCart } from '@/utils/cartUtils';
interface WasteReductionDeal {
  id: string;
  restaurantName: string;
  restaurantId: string;
  distance: string;
  menuItem: {
    id: number;
    name: string;
    originalPrice: number;
    discountedPrice: number;
    discountPercentage: number;
    image: string;
    expiryTime: string;
    reason: string;
    sustainabilityScore: number;
  };
}
const WasteReductionDeals = () => {
  const {
    toast
  } = useToast();
  const [deals, setDeals] = useState<WasteReductionDeal[]>([]);
  const [userLocation] = useState('Mumbai');
  useEffect(() => {
    const mockDeals: WasteReductionDeal[] = [{
      id: '1',
      restaurantName: 'Satvam Restaurant',
      restaurantId: '1',
      distance: '0.5 km',
      menuItem: {
        id: 101,
        name: 'Dal Makhani',
        originalPrice: 220,
        discountedPrice: 154,
        discountPercentage: 30,
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&auto=format',
        expiryTime: '2 hours',
        reason: 'End of lunch special',
        sustainabilityScore: 95
      }
    }, {
      id: '2',
      restaurantName: 'Mumbai Tadka',
      restaurantId: '2',
      distance: '0.8 km',
      menuItem: {
        id: 102,
        name: 'Butter Chicken',
        originalPrice: 280,
        discountedPrice: 196,
        discountPercentage: 30,
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&auto=format',
        expiryTime: '1.5 hours',
        reason: 'Fresh batch expiring today',
        sustainabilityScore: 88
      }
    }, {
      id: '3',
      restaurantName: 'Delhi Darbar',
      restaurantId: '3',
      distance: '1.2 km',
      menuItem: {
        id: 103,
        name: 'Shahi Paneer',
        originalPrice: 260,
        discountedPrice: 156,
        discountPercentage: 40,
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&auto=format',
        expiryTime: '3 hours',
        reason: 'Surplus from lunch rush',
        sustainabilityScore: 92
      }
    }, {
      id: '5',
      restaurantName: 'Spice Symphony',
      restaurantId: '5',
      distance: '0.7 km',
      menuItem: {
        id: 105,
        name: 'Masala Dosa',
        originalPrice: 150,
        discountedPrice: 105,
        discountPercentage: 30,
        image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop&auto=format',
        expiryTime: '1 hour',
        reason: 'Batter expiring soon',
        sustainabilityScore: 93
      }
    }];
    setDeals(mockDeals);
  }, [userLocation]);
  const handleAddDealToCart = (deal: WasteReductionDeal) => {
    const cartItem = {
      id: deal.menuItem.id,
      name: deal.menuItem.name,
      price: deal.menuItem.discountedPrice,
      originalPrice: deal.menuItem.originalPrice,
      image: deal.menuItem.image,
      restaurantName: deal.restaurantName,
      restaurantId: deal.restaurantId,
      sustainabilityScore: deal.menuItem.sustainabilityScore,
      isDeal: true,
      discountPercentage: deal.menuItem.discountPercentage,
      expiryTime: deal.menuItem.expiryTime
    };
    addToCart(cartItem);
    toast({
      title: "Deal added to cart!",
      description: `${deal.menuItem.name} with ${deal.menuItem.discountPercentage}% discount has been added to your cart.`
    });
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Leaf className="h-6 w-6 mr-2 text-green-dark" />
            Nearby Waste Reduction Deals
          </h2>
          <p className="text-muted-foreground">Help reduce food waste while saving money</p>
        </div>
        <Badge variant="outline" className="flex items-center">
          <MapPin className="h-3 w-3 mr-1" />
          {userLocation}
        </Badge>
      </div>

      {deals.length === 0 ? <Card>
          <CardContent className="text-center py-8">
            <Leaf className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No deals available right now</h3>
            <p className="text-muted-foreground">Check back later for food waste reduction deals in your area.</p>
          </CardContent>
        </Card> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deals.map(deal => <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={deal.menuItem.image} alt={deal.menuItem.name} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-red-500 text-white">
                    <Percent className="h-3 w-3 mr-1" />
                    {deal.menuItem.discountPercentage}% OFF
                  </Badge>
                </div>
                <div className="absolute top-2 left-2">
                  
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{deal.menuItem.name}</CardTitle>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{deal.restaurantName}</span>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {deal.distance}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-green-dark">
                      ₹{deal.menuItem.discountedPrice}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{deal.menuItem.originalPrice}
                    </span>
                  </div>
                  <div className="flex items-center text-amber-600">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="text-sm">{deal.menuItem.expiryTime}</span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground bg-amber-50 p-2 rounded">
                  {deal.menuItem.reason}
                </p>
                
                <Button onClick={() => handleAddDealToCart(deal)} className="w-full bg-green-dark hover:bg-green text-white">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>)}
        </div>}
    </div>;
};
export default WasteReductionDeals;
