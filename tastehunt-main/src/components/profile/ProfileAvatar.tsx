
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Camera } from 'lucide-react';

interface ProfileAvatarProps {
  name: string;
  profileImage?: string;
  isEditing: boolean;
  onImageChange: (imageData: string) => void;
}

const ProfileAvatar = ({ name, profileImage, isEditing, onImageChange }: ProfileAvatarProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onImageChange(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group">
        <Avatar className="h-32 w-32 ring-4 ring-gray-100">
          <AvatarImage src={profileImage} alt={name} />
          <AvatarFallback className="text-2xl bg-gradient-to-br from-green-400 to-blue-500 text-white">
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        {isEditing && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Label htmlFor="picture" className="cursor-pointer">
              <div className="bg-white rounded-full p-3 hover:bg-gray-100 transition-colors">
                <Camera className="h-6 w-6 text-gray-700" />
              </div>
            </Label>
            <Input
              id="picture"
              name="picture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={!isEditing || isUploading}
            />
          </div>
        )}
        
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>
      
      {isEditing && (
        <Badge variant="secondary" className="text-xs">
          <Camera className="h-3 w-3 mr-1" />
          Click avatar to change photo
        </Badge>
      )}
    </div>
  );
};

export default ProfileAvatar;
