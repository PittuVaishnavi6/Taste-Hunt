
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Edit, Save, X, Phone } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useSupabaseData } from '@/hooks/useSupabaseData';

interface UserInfoSectionProps {
  userData: any;
  onUpdate: (data: any) => void;
}

const UserInfoSection = ({ userData, onUpdate }: UserInfoSectionProps) => {
  const { updateProfile } = useSupabaseData();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
  });

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      name: userData?.name || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: userData?.name || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
    });
  };

  const handleSave = async () => {
    setLoading(true);
    
    try {
      const success = await updateProfile({
        name: formData.name,
        phone: formData.phone,
      });

      if (success) {
        setIsEditing(false);
        onUpdate(formData);
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
          {!isEditing ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleEdit}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCancel}
                disabled={loading}
                className="flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
              >
                <Save className="h-3 w-3" />
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </Label>
            {isEditing ? (
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="Enter your full name"
              />
            ) : (
              <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-md">{userData?.name || 'Not provided'}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-md">{userData?.email}</p>
            {isEditing && (
              <p className="text-xs text-gray-500">Email cannot be changed here. Contact support if needed.</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Phone className="h-4 w-4" />
            Phone Number
          </Label>
          {isEditing ? (
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1"
              placeholder="Enter your phone number"
              type="tel"
            />
          ) : (
            <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-md">
              {userData?.phone || 'No phone number provided'}
            </p>
          )}
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Account Information</h4>
          <div className="space-y-2 text-sm text-blue-800">
            <p>Member since: {new Date(userData?.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            <p>Account Status: <span className="font-medium text-green-700">Active</span></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoSection;
