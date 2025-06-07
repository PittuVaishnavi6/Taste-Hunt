
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Calendar } from 'lucide-react';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { useNavigate } from 'react-router-dom';

const OrderHistorySection = () => {
  const { orders } = useSupabaseData();
  const navigate = useNavigate();

  const handleViewDetails = (orderId: string) => {
    navigate(`/order-details/${orderId}`);
  };

  if (orders.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No orders yet</p>
          <p className="text-sm text-gray-400">Your order history will appear here once you place your first order.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Order History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{order.restaurant_name}</h3>
                    <Badge 
                      variant={order.status === 'delivered' ? 'default' : 'secondary'}
                      className={order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                    <span>Order #{order.id.slice(0, 8)}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {order.order_items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-lg">₹{order.total}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(order.id)}
                  >
                    View Details
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Reorder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {orders.length > 3 && (
          <div className="text-center pt-4">
            <Button variant="outline">Load More Orders</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderHistorySection;
