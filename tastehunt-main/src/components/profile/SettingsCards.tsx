
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CreditCard, MapPin } from 'lucide-react';

interface UserAddress {
  address: string;
}

const SettingsCards = ({ userAddress }: { userAddress: string }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive order updates and promotions</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">SMS Notifications</p>
              <p className="text-sm text-muted-foreground">Get text messages for order status</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">Sustainability Insights</p>
              <p className="text-sm text-muted-foreground">Receive tips on reducing food waste</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-medium">Fraud Detection Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified of suspicious activity</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <Button variant="outline" className="w-full">Change Password</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/26</p>
              </div>
            </div>
            <Badge>Default</Badge>
          </div>
          <Button className="w-full" variant="outline">Add Payment Method</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Delivery Addresses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Home</p>
                <p className="text-sm text-muted-foreground">{userAddress}</p>
              </div>
            </div>
            <Badge>Default</Badge>
          </div>
          <Button className="w-full" variant="outline">Add Address</Button>
        </CardContent>
      </Card>
      
      <Card className="bg-red-50">
        <CardContent className="p-6">
          <h3 className="font-bold text-red-600 mb-2">Delete Account</h3>
          <p className="text-sm text-red-600 mb-4">
            Once you delete your account, all of your data will be permanently removed.
            This action cannot be undone.
          </p>
          <Button variant="destructive">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsCards;
