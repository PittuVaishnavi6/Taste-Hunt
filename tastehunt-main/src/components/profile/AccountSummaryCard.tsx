
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Leaf, Shield } from 'lucide-react';

interface AccountSummaryProps {
  totalOrders: number;
  wasteReduced: string;
  emissionsSaved: string;
}

const AccountSummaryCard = ({ totalOrders, wasteReduced, emissionsSaved }: AccountSummaryProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Account Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-muted rounded-lg p-4 text-center">
            <ShoppingBag className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <Leaf className="h-6 w-6 mx-auto mb-2 text-green-dark" />
            <p className="text-muted-foreground">Waste Reduced</p>
            <p className="text-2xl font-bold text-green-dark">{wasteReduced}</p>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <Shield className="h-6 w-6 mx-auto mb-2 text-green-dark" />
            <p className="text-muted-foreground">Emissions Saved</p>
            <p className="text-2xl font-bold text-green-dark">{emissionsSaved}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSummaryCard;
