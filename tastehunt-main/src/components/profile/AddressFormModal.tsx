
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Save, X } from 'lucide-react';
import { Address } from '@/hooks/useSupabaseData';

interface AddressFormModalProps {
  address: Address;
  onSave: (addressId: string, newAddress: string) => void;
  onCancel: () => void;
}

const AddressFormModal = ({ address, onSave, onCancel }: AddressFormModalProps) => {
  const [formData, setFormData] = useState({
    fullAddress: address.address_line || address.address || '',
    addressType: address.type
  });

  const handleSave = () => {
    onSave(address.id, formData.fullAddress);
  };

  return (
    <Card className="border border-gray-200 transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-semibold text-gray-900">{address.type}</h3>
            {address.is_default && (
              <Badge className="bg-green-100 text-green-800">Default</Badge>
            )}
          </div>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="addressType" className="text-sm font-medium text-gray-700">
                Address Type
              </Label>
              <Input
                id="addressType"
                value={formData.addressType}
                onChange={(e) => setFormData(prev => ({ ...prev, addressType: e.target.value }))}
                className="mt-1"
                placeholder="e.g., Home, Office"
              />
            </div>
            
            <div>
              <Label htmlFor="fullAddress" className="text-sm font-medium text-gray-700">
                Full Address
              </Label>
              <Textarea
                id="fullAddress"
                value={formData.fullAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, fullAddress: e.target.value }))}
                className="mt-1 min-h-[80px]"
                placeholder="Enter your complete address including street, area, city, and pincode"
              />
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
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressFormModal;
