import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Shield } from 'lucide-react';
const Home = () => {
  const featuredRestaurants = [{
    id: 2,
    name: 'Mumbai Tadka',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    cuisine: 'Indian, Street Food',
    rating: 4.7,
    deliveryTime: '30-40 min',
    wasteReduction: '88%'
  }, {
    id: 3,
    name: 'Delhi Darbar',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    cuisine: 'Indian',
    rating: 4.9,
    deliveryTime: '20-30 min',
    wasteReduction: '92%'
  }, {
    id: 4,
    name: 'Noodle Junction',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    cuisine: 'Asian',
    rating: 4.6,
    deliveryTime: '35-45 min',
    wasteReduction: '85%'
  }, {
    id: 5,
    name: 'Spice Symphony',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    cuisine: 'Indian, Curry, Vegetarian',
    rating: 4.5,
    deliveryTime: '40-50 min',
    wasteReduction: '80%'
  }, {
    id: 7,
    name: 'Pizza Corner',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    cuisine: 'Italian',
    rating: 4.3,
    deliveryTime: '15-25 min',
    wasteReduction: '83%'
  }];
  return <div className="flex flex-col min-h-screen">
      <section className="relative py-12 md:py-20 bg-gradient-to-r from-orange-light/30 via-green-light/20 to-accent/20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">Craving Something New? Start Your Taste Hunt Today!</h1>
                <p className="text-muted-foreground md:text-xl">Order from your favorite local restaurants, explore new flavors, and enjoy fast, secure deliveries </p>
              </div>
              <div className="flex flex-col md:flex-row gap-2 min-[400px]:flex-row">
                <Link to="/restaurants">
                  <Button size="lg" className="bg-orange-dark hover:bg-orange text-white">
                    Order Now
                  </Button>
                </Link>
                <Link to="/restaurants">
                  <Button size="lg" variant="outline">
                    View Restaurants
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Healthy sustainable food" className="rounded-lg shadow-xl object-cover w-full aspect-video md:aspect-square" />
              
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter">How TasteHunt Works</h2>
            <p className="text-muted-foreground mt-2">Simple steps to sustainable food delivery</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-orange-light/60 flex items-center justify-center mb-4">
                <span className="font-bold text-zinc-50">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Choose Restaurant</h3>
              <p className="text-muted-foreground">Browse our curated list of eco-friendly restaurants committed to sustainability.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-orange-light/60 flex items-center justify-center mb-4">
                <span className="font-bold text-zinc-100">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Place Your Order</h3>
              <p className="text-muted-foreground">Select your meals and complete checkout with our secure fraud-protected system.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-orange-light/60 flex items-center justify-center mb-4">
                <span className="font-bold text-zinc-100">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Enjoy & Reduce Waste</h3>
              <p className="text-muted-foreground">Get your food delivered and track your personal impact on reducing food waste.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter">Featured Restaurants</h2>
              <p className="text-muted-foreground mt-2">Discover sustainable dining options</p>
            </div>
            <Link to="/restaurants">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredRestaurants.map(restaurant => <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id}>
                <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-[1.03] duration-200">
                  <div className="relative h-48">
                    <img src={restaurant.image} alt={restaurant.name} className="object-cover w-full h-full" />
                    
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-bold">{restaurant.name}</h3>
                      <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {restaurant.deliveryTime}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>)}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter">Why Choose TasteHunt</h2>
            <p className="text-muted-foreground mt-2">Making a difference with every order</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <CheckCircle className="h-12 w-12 text-orange-dark" />
                <h3 className="text-xl font-bold">Food Waste Management</h3>
                <p className="text-muted-foreground">Our AI-driven system predicts optimal inventory levels and portion sizes, reducing waste by up to 85%.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <Shield className="h-12 w-12 text-orange-dark" />
                <h3 className="text-xl font-bold">Fraud Detection</h3>
                <p className="text-muted-foreground">Advanced security measures protect against payment fraud and fake orders, ensuring a safe experience.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <Clock className="h-12 w-12 text-orange-dark" />
                <h3 className="text-xl font-bold">Real-Time Tracking</h3>
                <p className="text-muted-foreground">Track your order from restaurant to doorstep and see your personal environmental impact metrics.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;