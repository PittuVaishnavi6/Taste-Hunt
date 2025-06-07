import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Order {
  id: string;
  restaurant_name: string;
  delivery_address: string;
  subtotal: number;
  delivery_fee: number;
  service_fee: number;
  promo_discount: number;
  total: number;
  status: string;
  estimated_delivery: string;
  created_at: string;
  order_items: OrderItem[];
  address_id?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
}

export interface Address {
  id: string;
  type: string;
  address: string;
  address_line?: string;
  city?: string;
  pincode?: string;
  is_default: boolean;
}

export const useSupabaseData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch user profile
  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      console.log('Fetching profile for user:', user.id);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      console.log('Profile data:', data);
      setProfile(data);
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  // Update profile with proper phone number handling
  const updateProfile = async (updates: { name?: string; phone?: string }) => {
    if (!user) return false;
    
    try {
      console.log('Updating profile for user:', user.id, updates);
      
      // Update the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id);

      if (profileError) {
        console.error('Error updating profile:', profileError);
        return false;
      }

      // Also update user metadata if phone is being updated
      if (updates.phone !== undefined) {
        const { error: metadataError } = await supabase.auth.updateUser({
          data: { phone: updates.phone }
        });

        if (metadataError) {
          console.error('Error updating user metadata:', metadataError);
          // Don't return false here as profile update succeeded
        }
      }

      console.log('Profile updated successfully with phone number');
      await fetchProfile(); // Refresh profile data
      return true;
    } catch (error) {
      console.error('Error in updateProfile:', error);
      return false;
    }
  };

  // Fetch user addresses
  const fetchAddresses = async () => {
    if (!user) return;
    
    try {
      console.log('Fetching addresses for user:', user.id);
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching addresses:', error);
        return;
      }

      console.log('Addresses data:', data);
      setAddresses(data || []);
    } catch (error) {
      console.error('Error in fetchAddresses:', error);
    }
  };

  // Delete address
  const deleteAddress = async (addressId: string) => {
    if (!user) return false;
    
    try {
      console.log('Deleting address:', addressId);
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', addressId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting address:', error);
        return false;
      }

      console.log('Address deleted successfully');
      await fetchAddresses();
      return true;
    } catch (error) {
      console.error('Error in deleteAddress:', error);
      return false;
    }
  };

  // Update address
  const updateAddress = async (addressId: string, updates: { type?: string; address?: string }) => {
    if (!user) return false;
    
    try {
      console.log('Updating address:', addressId, updates);
      const { error } = await supabase
        .from('addresses')
        .update(updates)
        .eq('id', addressId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating address:', error);
        return false;
      }

      console.log('Address updated successfully');
      await fetchAddresses();
      return true;
    } catch (error) {
      console.error('Error in updateAddress:', error);
      return false;
    }
  };

  // Fetch user orders
  const fetchOrders = async () => {
    if (!user) return;
    
    try {
      console.log('Fetching orders for user:', user.id);
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
        return;
      }

      console.log('Orders data:', ordersData);
      setOrders(ordersData || []);
    } catch (error) {
      console.error('Error in fetchOrders:', error);
    }
  };

  // Save order to database with restaurant name from cart items
  const saveOrder = async (orderData: {
    restaurant_name?: string;
    delivery_address: string;
    subtotal: number;
    delivery_fee: number;
    service_fee: number;
    promo_discount: number;
    total: number;
    estimated_delivery: string;
    items: { name: string; quantity: number; price: number; restaurant?: string }[];
    address_id?: string;
  }) => {
    if (!user) {
      console.error('No user logged in');
      return null;
    }

    setLoading(true);
    try {
      console.log('Saving order:', orderData);
      
      // Extract restaurant name from items or use provided restaurant_name
      const restaurantName = orderData.restaurant_name || 
        orderData.items[0]?.restaurant || 
        'Restaurant'; // fallback only if no restaurant info is available
      
      // Insert order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          restaurant_name: restaurantName,
          delivery_address: orderData.delivery_address,
          subtotal: orderData.subtotal,
          delivery_fee: orderData.delivery_fee,
          service_fee: orderData.service_fee,
          promo_discount: orderData.promo_discount,
          total: orderData.total,
          estimated_delivery: orderData.estimated_delivery,
          address_id: orderData.address_id,
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error saving order:', orderError);
        return null;
      }

      console.log('Order saved:', order);

      // Insert order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error saving order items:', itemsError);
        return null;
      }

      console.log('Order items saved');
      
      // Refresh orders
      await fetchOrders();
      
      return order.id;
    } catch (error) {
      console.error('Error in saveOrder:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Save address
  const saveAddress = async (address: { 
    type: string; 
    address: string;
    address_line?: string;
    city?: string;
    pincode?: string;
  }) => {
    if (!user) return;

    try {
      console.log('Saving address:', address);
      const { error } = await supabase
        .from('addresses')
        .insert({
          user_id: user.id,
          type: address.type,
          address: address.address,
          address_line: address.address_line,
          city: address.city,
          pincode: address.pincode,
        });

      if (error) {
        console.error('Error saving address:', error);
        return;
      }

      console.log('Address saved');
      await fetchAddresses();
    } catch (error) {
      console.error('Error in saveAddress:', error);
    }
  };

  // Get latest order
  const getLatestOrder = (): Order | null => {
    return orders.length > 0 ? orders[0] : null;
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchAddresses();
      fetchOrders();
    } else {
      setProfile(null);
      setAddresses([]);
      setOrders([]);
    }
  }, [user]);

  return {
    profile,
    addresses,
    orders,
    loading,
    saveOrder,
    saveAddress,
    deleteAddress,
    updateAddress,
    updateProfile,
    getLatestOrder,
    fetchProfile,
    fetchAddresses,
    fetchOrders,
  };
};
