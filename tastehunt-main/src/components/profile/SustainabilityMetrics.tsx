
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Leaf } from 'lucide-react';

interface SustainabilityMetricsProps {
  sustainabilityScore: number;
  wasteReduced: string;
  emissionsSaved: string;
}

const SustainabilityMetrics = ({ sustainabilityScore, wasteReduced, emissionsSaved }: SustainabilityMetricsProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Your Sustainability Impact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center h-32 w-32 rounded-full border-8 border-green-light bg-background relative mb-4">
            <span className="text-3xl font-bold text-green-dark">{sustainabilityScore}</span>
            <span className="absolute bottom-1 text-xs text-muted-foreground">out of 100</span>
          </div>
          <h3 className="font-bold text-lg">Sustainability Score</h3>
          <p className="text-sm text-muted-foreground">
            Your score is based on your order history and food waste reduction
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Food Waste Reduction</span>
              <span className="font-medium">Excellent</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Sustainable Restaurant Choices</span>
              <span className="font-medium">Very Good</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Eco-Friendly Delivery Options</span>
              <span className="font-medium">Good</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
        </div>
        
        <Separator />
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-bold mb-2">Environmental Impact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Food Waste Reduced</span>
                <span className="font-medium">{wasteReduced}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">CO₂ Emissions Saved</span>
                <span className="font-medium">{emissionsSaved}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Water Saved</span>
                <span className="font-medium">682 liters</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Trees Equivalent</span>
                <span className="font-medium">3.2 trees</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-bold mb-2">Sustainability Tips</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Leaf className="h-4 w-4 text-green-dark mt-0.5 flex-shrink-0" />
                <span>Order from restaurants with 90%+ sustainability scores</span>
              </li>
              <li className="flex items-start gap-2">
                <Leaf className="h-4 w-4 text-green-dark mt-0.5 flex-shrink-0" />
                <span>Choose eco-friendly delivery options when available</span>
              </li>
              <li className="flex items-start gap-2">
                <Leaf className="h-4 w-4 text-green-dark mt-0.5 flex-shrink-0" />
                <span>Select items with the "Eco Choice" badge</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SustainabilityMetrics;
