
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
}

const SearchBar = ({ searchQuery, onSearchChange, onClearFilters }: SearchBarProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by restaurant, cuisine or dish..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ fontFamily: "'Playfair Display', serif" }}
        />
      </div>
      {searchQuery && (
        <Button 
          variant="outline" 
          onClick={onClearFilters}
          className="whitespace-nowrap"
        >
          Clear Search
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
