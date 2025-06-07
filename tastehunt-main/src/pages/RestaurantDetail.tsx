
import { useParams } from 'react-router-dom';
import { Star, Clock, Leaf, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import RestaurantMenu from '@/components/restaurants/RestaurantMenu';
import enhancedRestaurants from '@/constants/enhancedRestaurantData';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const restaurant = enhancedRestaurants.find(r => r.id === parseInt(id || '0'));
  
  if (!restaurant) {
    return (
      <div className="container py-8 px-4 md:px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
          <Button onClick={() => navigate('/restaurants')}>
            Back to Restaurants
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        <div className="absolute top-4 left-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/restaurants')}
            className="bg-white/90 hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-lg opacity-90 mb-3">{restaurant.cuisine}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {restaurant.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{restaurant.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Leaf className="h-4 w-4 text-green-400" />
                <span>{restaurant.wasteReduction} waste reduction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu Section */}
      <div className="container py-8 px-4 md:px-6">
        <RestaurantMenu 
          menu={restaurant.menu} 
          restaurantName={restaurant.name}
        />
      </div>
    </div>
  );
};

export default RestaurantDetail;
