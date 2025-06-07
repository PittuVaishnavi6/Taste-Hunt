
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Index from '@/pages/Index';
import Home from '@/pages/Home';
import Restaurants from '@/pages/Restaurants';
import RestaurantDetail from '@/pages/RestaurantDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import OrderConfirmation from '@/pages/OrderConfirmation';
import Profile from '@/pages/Profile';
import Auth from '@/pages/Auth';
import SearchResults from '@/pages/SearchResults';
import OrderDetails from '@/pages/OrderDetails';
import NotFound from '@/pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Index /></Layout>} />
      <Route path="/home" element={<Layout><Home /></Layout>} />
      <Route path="/restaurants" element={<Layout><Restaurants /></Layout>} />
      <Route path="/restaurant/:id" element={<Layout><RestaurantDetail /></Layout>} />
      <Route path="/cart" element={<Layout><Cart /></Layout>} />
      <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
      <Route path="/order-confirmation/:orderId" element={<Layout><OrderConfirmation /></Layout>} />
      <Route path="/order-details/:orderId" element={<Layout><OrderDetails /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/auth" element={<Layout><Auth /></Layout>} />
      <Route path="/search" element={<Layout><SearchResults /></Layout>} />
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
};

export default AppRoutes;
