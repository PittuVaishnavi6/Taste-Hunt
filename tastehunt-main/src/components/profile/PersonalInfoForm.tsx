
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Edit } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import ProfileAvatar from './ProfileAvatar';
import ProfileFormFields from './ProfileFormFields';
import ProfileFormActions from './ProfileFormActions';

interface PersonalInfoFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage?: string;
}

interface PersonalInfoFormProps {
  initialData: PersonalInfoFormData;
  onSave: (data: PersonalInfoFormData) => void;
}

const PersonalInfoForm = ({ initialData, onSave }: PersonalInfoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PersonalInfoFormData>(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (imageData: string) => {
    setFormData(prev => ({
      ...prev,
      profileImage: imageData
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(initialData);
    setIsEditing(false);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
          {!isEditing && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <ProfileAvatar
            name={formData.name}
            profileImage="/lovable-uploads/d5d2189a-fac7-42d0-b6d3-0ab034afb416.png"
            isEditing={isEditing}
            onImageChange={handleImageChange}
          />

          <Separator />

          <ProfileFormFields
            formData={formData}
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />

          <ProfileFormActions
            isEditing={isEditing}
            onCancel={handleCancel}
            onSubmit={() => handleSubmit}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
