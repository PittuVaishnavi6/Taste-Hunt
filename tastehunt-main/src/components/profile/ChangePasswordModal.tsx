
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, X, Eye, EyeOff } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface ChangePasswordModalProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const ChangePasswordModal = ({ onCancel, onSuccess }: ChangePasswordModalProps) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleSave = () => {
    // Validate inputs
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Please fill in all password fields.",
        variant: "destructive"
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirm password do not match.",
        variant: "destructive"
      });
      return;
    }

    if (formData.newPassword.length < 6) {
      toast({
        title: "Password Too Short",
        description: "New password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    // Check current password against stored credentials
    const storedCredentials = localStorage.getItem('userCredentials');
    if (storedCredentials) {
      try {
        const credentials = JSON.parse(storedCredentials);
        if (credentials.password !== formData.currentPassword) {
          toast({
            title: "Incorrect Password",
            description: "Current password is incorrect.",
            variant: "destructive"
          });
          return;
        }

        // Update password
        credentials.password = formData.newPassword;
        localStorage.setItem('userCredentials', JSON.stringify(credentials));
        
        toast({
          title: "Password Updated",
          description: "Your password has been successfully updated.",
        });
        
        onSuccess();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update password. Please try again.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Error",
        description: "No user credentials found. Please log in again.",
        variant: "destructive"
      });
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <Card className="border border-gray-200 transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="mt-1 pr-10"
                  placeholder="Enter current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8"
                  onClick={() => togglePasswordVisibility('current')}
                >
                  {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="mt-1 pr-10"
                  placeholder="Enter new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="mt-1 pr-10"
                  placeholder="Confirm new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 justify-end pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onCancel}
              className="flex items-center gap-1 transition-all hover:bg-gray-50"
            >
              <X className="h-3 w-3" />
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={handleSave}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 transition-colors"
            >
              <Save className="h-3 w-3" />
              Update Password
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordModal;
