import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { PLACEHOLDER_IMAGE } from "@/constants/restaurantData";
interface RestaurantCardProps {
  restaurant: {
    id: number;
    name: string;
    image: string;
    cuisine: string;
    rating: number;
    deliveryTime: string;
    wasteReduction: string;
    tags: string[];
  };
}
const RestaurantCard = ({
  restaurant
}: RestaurantCardProps) => {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = PLACEHOLDER_IMAGE;
  };
  return <Link to={`/restaurant/${restaurant.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-[1.03] duration-200 rounded-card soft-orange-bg">
        <div className="relative h-48">
          <img src={restaurant.image} alt={restaurant.name} className="object-cover w-full h-full" onError={handleImgError} />
          
          {restaurant.wasteReduction > '90%' && <div className="absolute top-2 left-2">
              
            </div>}
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-bold" style={{
            fontFamily: "'Playfair Display', serif"
          }}>{restaurant.name}</h3>
            <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {restaurant.deliveryTime}
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {restaurant.tags.map((tag, index) => <Badge key={index} variant="secondary" style={{
              fontFamily: "'Playfair Display', serif"
            }} className="text-xs shadow bg-zinc-500">
                  {tag}
                </Badge>)}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>;
};
export default RestaurantCard;