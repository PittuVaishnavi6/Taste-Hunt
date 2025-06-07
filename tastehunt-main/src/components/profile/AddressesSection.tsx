
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useSupabaseData } from '@/hooks/useSupabaseData';
import AddressFormModal from './AddressFormModal';
import AddAddressModal from './AddAddressModal';

interface AddressesSectionProps {
  userData: any;
  onUpdate: (data: any) => void;
}

const AddressesSection = ({ userData, onUpdate }: AddressesSectionProps) => {
  const { addresses, saveAddress, deleteAddress, updateAddress } = useSupabaseData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAddAddress = () => {
    setShowAddForm(true);
  };

  const handleSaveNewAddress = async (newAddress: { type: string; address: string }) => {
    await saveAddress(newAddress);
    setShowAddForm(false);
    
    toast({
      title: "Address Added",
      description: "New address has been added successfully.",
    });
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const handleEditAddress = (addressId: string) => {
    setEditingId(addressId);
  };

  const handleSaveAddress = async (addressId: string, newAddress: string) => {
    const success = await updateAddress(addressId, { address: newAddress });
    
    if (success) {
      setEditingId(null);
      toast({
        title: "Address Updated",
        description: "Address updated successfully.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update address. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDeleteAddress = async (addressId: string) => {
    setDeletingId(addressId);
    
    try {
      const success = await deleteAddress(addressId);
      
      if (success) {
        toast({
          title: "Address Deleted",
          description: "Address has been removed successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete address. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      toast({
        title: "Error",
        description: "Failed to delete address. Please try again.",
        variant: "destructive"
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Delivery Addresses
          </CardTitle>
          <Button 
            size="sm" 
            onClick={handleAddAddress}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition-colors"
            disabled={showAddForm}
          >
            <Plus className="h-4 w-4" />
            Add Address
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAddForm && (
          <AddAddressModal
            onSave={handleSaveNewAddress}
            onCancel={handleCancelAdd}
          />
        )}
        
        {addresses.length === 0 && !showAddForm ? (
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No addresses saved</p>
            <p className="text-sm text-gray-400">Add your delivery addresses for faster checkout.</p>
          </div>
        ) : (
          addresses.map((address) => (
            editingId === address.id ? (
              <AddressFormModal
                key={address.id}
                address={address}
                onSave={handleSaveAddress}
                onCancel={handleCancelEdit}
              />
            ) : (
              <Card key={address.id} className="border border-gray-200 transition-all hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{address.type}</h3>
                        {address.is_default && (
                          <Badge className="bg-green-100 text-green-800">Default</Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">
                        {address.address_line || address.address}
                        {address.city && `, ${address.city}`}
                        {address.pincode && ` - ${address.pincode}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditAddress(address.id)}
                        className="flex items-center gap-1 transition-all hover:bg-gray-50"
                      >
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                      {!address.is_default && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteAddress(address.id)}
                          disabled={deletingId === address.id}
                          className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50 transition-all"
                        >
                          <Trash2 className="h-3 w-3" />
                          {deletingId === address.id ? 'Deleting...' : 'Delete'}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default AddressesSection;
