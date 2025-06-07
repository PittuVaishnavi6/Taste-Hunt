
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Order {
  id: string;
  date: string;
  restaurant: string;
  items: string[];
  total: number;
  status: string;
  sustainabilityScore: number;
}

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory = ({ orders }: OrderHistoryProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Order History</h2>
        <Button variant="outline" size="sm">
          Download History
        </Button>
      </div>
      
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <p className="font-bold">{order.restaurant}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <div className="flex items-center mt-2 md:mt-0">
                <Badge variant="outline">{order.status}</Badge>
                <Badge className="ml-2 bg-green-dark text-white">
                  {order.sustainabilityScore}% sustainable
                </Badge>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-1">Order #{order.id}</p>
              <ul className="list-disc list-inside text-sm">
                {order.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="font-bold">${order.total.toFixed(2)}</p>
              <div className="flex gap-2">
                <Link to={`/order-confirmation/${order.id}`}>
                  <Button variant="outline" size="sm">View Details</Button>
                </Link>
                <Button size="sm">Reorder</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="text-center">
        <Button variant="outline">Load More Orders</Button>
      </div>
    </div>
  );
};

export default OrderHistory;
