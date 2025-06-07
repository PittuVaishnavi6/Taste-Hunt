
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { restaurants } from "@/constants/restaurantData";

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const CategoryTabs = ({ activeTab, onTabChange }: CategoryTabsProps) => {
  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className="mb-8"
    >
      <TabsList className="hidden">
        <TabsTrigger value="all">All</TabsTrigger>
      </TabsList>
      <TabsContent value="all" />
    </Tabs>
  );
};

export default CategoryTabs;
