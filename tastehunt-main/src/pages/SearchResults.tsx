import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowLeft } from 'lucide-react';
import { enhancedRestaurants } from '@/constants/enhancedRestaurantData';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search') || '';
    setSearchQuery(query);
    if (query) {
      performSearch(query);
    }
  }, [location.search]);

  const performSearch = (query: string) => {
    setLoading(true);
    const lowerQuery = query.toLowerCase().trim();
    const results: any[] = [];

    // Search through restaurants and their menu items
    enhancedRestaurants.forEach(restaurant => {
      // Check if restaurant name matches
      if (restaurant.name.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'restaurant',
          id: restaurant.id,
          name: restaurant.name,
          image: restaurant.image,
          cuisine: restaurant.cuisine,
          rating: restaurant.rating,
          deliveryTime: restaurant.deliveryTime
        });
      }

      // Check menu items
      Object.values(restaurant.menu).forEach(category => {
        category.forEach(item => {
          if (item.name.toLowerCase().includes(lowerQuery)) {
            results.push({
              type: 'dish',
              restaurantId: restaurant.id,
              restaurantName: restaurant.name,
              dishName: item.name,
              price: item.price,
              image: item.image,
              description: item.description
            });
          }
        });
      });
    });

    setSearchResults(results);
    setLoading(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for restaurants or dishes..."
              className="pl-9 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <Button onClick={handleSearch} className="shrink-0">
            Search
          </Button>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Searching...</p>
          </div>
        ) : (
          <>
            {searchQuery && (
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Search Results for "{searchQuery}"
                </h1>
                <p className="text-gray-600">
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                </p>
              </div>
            )}

            {searchResults.length === 0 && searchQuery ? (
              <Card className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No results found for "{searchQuery}"
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try searching for different keywords or browse our restaurants directly.
                  </p>
                  <Link to="/restaurants">
                    <Button>Browse All Restaurants</Button>
                  </Link>
                </div>
              </Card>
            ) : (
              <div className="grid gap-6">
                {searchResults.map((result, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      {result.type === 'restaurant' ? (
                        <Link to={`/restaurant/${result.id}`} className="flex items-center gap-4 p-4 hover:bg-gray-50">
                          <img 
                            src={result.image} 
                            alt={result.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900">{result.name}</h3>
                            <p className="text-gray-600 text-sm mb-1">{result.cuisine}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <span className="text-yellow-500">★</span>
                                {result.rating}
                              </span>
                              <span>{result.deliveryTime}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              Restaurant
                            </span>
                          </div>
                        </Link>
                      ) : (
                        <Link to={`/restaurant/${result.restaurantId}`} className="flex items-center gap-4 p-4 hover:bg-gray-50">
                          <img 
                            src={result.image || '/placeholder.svg'} 
                            alt={result.dishName}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900">{result.dishName}</h3>
                            <p className="text-gray-600 text-sm mb-1">from {result.restaurantName}</p>
                            <p className="text-gray-500 text-sm">{result.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-lg text-gray-900 mb-1">₹{result.price}</div>
                            <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                              Dish
                            </span>
                          </div>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
