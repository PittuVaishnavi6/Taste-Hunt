
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { X, Check } from 'lucide-react';

interface ProfileFormActionsProps {
  isEditing: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const ProfileFormActions = ({ isEditing, onCancel, onSubmit }: ProfileFormActionsProps) => {
  if (!isEditing) return null;

  return (
    <>
      <Separator />
      <div className="flex gap-3 justify-end">
        <Button 
          type="button"
          variant="outline" 
          onClick={onCancel}
          className="flex items-center gap-2 transition-colors hover:bg-gray-50"
        >
          <X className="h-4 w-4" />
          Cancel
        </Button>
        <Button 
          type="button"
          className="bg-green-600 hover:bg-green-700 flex items-center gap-2 transition-colors"
          onClick={onSubmit}
        >
          <Check className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </>
  );
};

export default ProfileFormActions;
