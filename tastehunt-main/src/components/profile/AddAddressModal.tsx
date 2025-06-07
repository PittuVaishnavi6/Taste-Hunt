
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, X } from 'lucide-react';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { useToast } from '@/hooks/use-toast';

interface AddAddressModalProps {
  onSave: (address: { type: string; address: string }) => void;
  onCancel: () => void;
}

const AddAddressModal = ({ onSave, onCancel }: AddAddressModalProps) => {
  const { saveAddress } = useSupabaseData();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    addressType: '',
    fullAddress: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (formData.addressType.trim() && formData.fullAddress.trim()) {
      setLoading(true);
      try {
        await saveAddress({
          type: formData.addressType,
          address: formData.fullAddress
        });
        
        onSave({
          type: formData.addressType,
          address: formData.fullAddress
        });
        
        toast({
          title: "Success",
          description: "Address saved successfully!",
        });
      } catch (error) {
        console.error('Error saving address:', error);
        toast({
          title: "Error",
          description: "Failed to save address. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card className="border border-gray-200 transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 mb-4">Add New Address</h3>
          
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
                placeholder="e.g., Home, Office, Other"
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
              disabled={loading}
            >
              <X className="h-3 w-3" />
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={handleSave}
              disabled={!formData.addressType.trim() || !formData.fullAddress.trim() || loading}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 transition-colors disabled:bg-gray-400"
            >
              <Save className="h-3 w-3" />
              {loading ? "Saving..." : "Save Address"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddAddressModal;
