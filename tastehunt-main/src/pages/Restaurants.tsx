
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RestaurantCard from '@/components/restaurants/RestaurantCard';
import SearchBar from '@/components/restaurants/SearchBar';
import CategoryTabs from '@/components/restaurants/CategoryTabs';
import WasteReductionDeals from '@/components/WasteReductionDeals';
import { restaurants } from '@/constants/restaurantData';

const Restaurants = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<'restaurants' | 'deals'>('restaurants');

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesCategory = selectedCategory === 'all' || restaurant.tags.includes(selectedCategory);
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter">
          {currentView === 'restaurants' ? 'Restaurants' : 'Food Waste Reduction'}
        </h1>
        <p className="text-muted-foreground">
          {currentView === 'restaurants' 
            ? 'Discover sustainable dining options near you' 
            : 'Save money while helping reduce food waste'}
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <Button 
          variant={currentView === 'restaurants' ? 'default' : 'outline'}
          onClick={() => setCurrentView('restaurants')}
        >
          Browse Restaurants
        </Button>
        <Button 
          variant={currentView === 'deals' ? 'default' : 'outline'}
          onClick={() => setCurrentView('deals')}
          className="bg-green-dark hover:bg-green text-white"
        >
          Waste Reduction Deals
        </Button>
      </div>

      {currentView === 'restaurants' ? (
        <>
          <SearchBar 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery}
            onClearFilters={handleClearFilters}
          />
          <CategoryTabs 
            activeTab={selectedCategory} 
            onTabChange={setSelectedCategory} 
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium mb-2">No restaurants found</h3>
              <p className="text-muted-foreground">Try adjusting your search or category filters</p>
            </div>
          )}
        </>
      ) : (
        <WasteReductionDeals />
      )}
    </div>
  );
};

export default Restaurants;
