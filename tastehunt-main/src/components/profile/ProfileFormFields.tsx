
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, MapPin } from 'lucide-react';

interface PersonalInfoFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage?: string;
}

interface ProfileFormFieldsProps {
  formData: PersonalInfoFormData;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileFormFields = ({ formData, isEditing, onInputChange }: ProfileFormFieldsProps) => {
  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            disabled={!isEditing}
            className={`transition-all ${!isEditing ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300 focus:ring-2 focus:ring-green-500'}`}
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onInputChange}
            disabled={!isEditing}
            className={`transition-all ${!isEditing ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300 focus:ring-2 focus:ring-green-500'}`}
            placeholder="Enter your email address"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            disabled={!isEditing}
            className={`transition-all ${!isEditing ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300 focus:ring-2 focus:ring-green-500'}`}
            placeholder="Enter your phone number"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Delivery Address
          </Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={onInputChange}
            disabled={!isEditing}
            className={`transition-all ${!isEditing ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300 focus:ring-2 focus:ring-green-500'}`}
            placeholder="Enter your delivery address"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileFormFields;
