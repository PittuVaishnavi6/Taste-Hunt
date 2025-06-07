
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, MapPin, Shield, ShoppingBag, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { toast } from "@/hooks/use-toast";
import UserInfoSection from '@/components/profile/UserInfoSection';
import OrderHistorySection from '@/components/profile/OrderHistorySection';
import AddressesSection from '@/components/profile/AddressesSection';
import SecuritySection from '@/components/profile/SecuritySection';

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile, orders } = useSupabaseData();
  const [activeSection, setActiveSection] = useState('profile');

  // Redirect to auth if not logged in
  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const handleUpdateUserData = (newData: any) => {
    // This would typically update the profile via Supabase
    console.log('Updating user data:', newData);
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Order History', icon: ShoppingBag },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'orders':
        return <OrderHistorySection />;
      case 'addresses':
        return <AddressesSection userData={profile} onUpdate={handleUpdateUserData} />;
      case 'security':
        return <SecuritySection />;
      default:
        return <UserInfoSection userData={profile} onUpdate={handleUpdateUserData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600 mt-1">Manage your account and preferences</p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 transition-all"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
          
          {/* User Info Card */}
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 ring-2 ring-gray-100">
                  <AvatarImage src="/lovable-uploads/d5d2189a-fac7-42d0-b6d3-0ab034afb416.png" alt={profile.name} />
                  <AvatarFallback className="text-lg bg-gradient-to-br from-green-400 to-blue-500 text-white">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
                  <p className="text-gray-600">{profile.email}</p>
                  {profile.phone && (
                    <p className="text-gray-600 text-sm">{profile.phone}</p>
                  )}
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {orders.length} Orders
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      Member since {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium rounded-none first:rounded-t-lg last:rounded-b-lg transition-all ${
                        activeSection === item.id
                          ? 'bg-green-50 text-green-700 border-r-2 border-green-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
