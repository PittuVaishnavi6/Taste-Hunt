
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Shield, Lock, Smartphone, Bell } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import ChangePasswordModal from './ChangePasswordModal';

const SecuritySection = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const handlePasswordChangeSuccess = () => {
    setShowChangePassword(false);
  };

  const handlePasswordChangeCancel = () => {
    setShowChangePassword(false);
  };

  const handleEnable2FA = () => {
    toast({
      title: "Two-Factor Authentication",
      description: "2FA setup will be available soon.",
    });
  };

  const handleToggleSwitch = (setting: string, enabled: boolean) => {
    toast({
      title: "Settings Updated",
      description: `${setting} has been ${enabled ? 'enabled' : 'disabled'}.`,
    });
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {showChangePassword && (
          <ChangePasswordModal
            onSuccess={handlePasswordChangeSuccess}
            onCancel={handlePasswordChangeCancel}
          />
        )}

        {!showChangePassword && (
          <>
            {/* Password Section */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password & Authentication
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-gray-600">Update your account password</p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={handleChangePassword}
                    className="transition-all hover:bg-gray-50 hover:border-green-300"
                  >
                    Change Password
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={handleEnable2FA}
                    className="transition-all hover:bg-gray-50 hover:border-green-300"
                  >
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* OTP Preferences */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                OTP Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS OTP</p>
                    <p className="text-sm text-gray-600">Receive OTP via SMS</p>
                  </div>
                  <Switch 
                    defaultChecked 
                    onCheckedChange={(checked) => handleToggleSwitch('SMS OTP', checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email OTP</p>
                    <p className="text-sm text-gray-600">Receive OTP via email</p>
                  </div>
                  <Switch 
                    defaultChecked 
                    onCheckedChange={(checked) => handleToggleSwitch('Email OTP', checked)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Notification Preferences */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Security Notifications
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Login Alerts</p>
                    <p className="text-sm text-gray-600">Get notified of new device logins</p>
                  </div>
                  <Switch 
                    defaultChecked 
                    onCheckedChange={(checked) => handleToggleSwitch('Login Alerts', checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Fraud Detection</p>
                    <p className="text-sm text-gray-600">Alert for suspicious activities</p>
                  </div>
                  <Switch 
                    defaultChecked 
                    onCheckedChange={(checked) => handleToggleSwitch('Fraud Detection', checked)}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SecuritySection;
