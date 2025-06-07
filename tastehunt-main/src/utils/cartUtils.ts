
// Helper functions for cart management

// Get cart items from localStorage
export const getCartItems = () => {
  const storedCart = localStorage.getItem('cartItems');
  return storedCart ? JSON.parse(storedCart) : [];
};

// Save cart items to localStorage
export const saveCartItems = (items: any[]) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
  // Dispatch custom event for components on the same page
  window.dispatchEvent(new Event('cartUpdated'));
};

// Clear cart items
export const clearCart = () => {
  localStorage.removeItem('cartItems');
  window.dispatchEvent(new Event('cartUpdated'));
};

// Add item to cart
export const addToCart = (item: any) => {
  const currentCart = getCartItems();
  const existingItemIndex = currentCart.findIndex((i: any) => i.id === item.id);
  
  if (existingItemIndex >= 0) {
    currentCart[existingItemIndex].quantity += item.quantity || 1;
  } else {
    currentCart.push({ ...item, quantity: item.quantity || 1 });
  }
  
  saveCartItems(currentCart);
  return currentCart;
};

// Remove item from cart
export const removeFromCart = (itemId: number) => {
  const currentCart = getCartItems();
  const updatedCart = currentCart.filter((item: any) => item.id !== itemId);
  saveCartItems(updatedCart);
  return updatedCart;
};

// Update item quantity
export const updateItemQuantity = (itemId: number, quantity: number) => {
  if (quantity < 1) {
    return removeFromCart(itemId);
  }
  
  const currentCart = getCartItems();
  const updatedCart = currentCart.map((item: any) => 
    item.id === itemId ? { ...item, quantity } : item
  );
  
  saveCartItems(updatedCart);
  return updatedCart;
};

// Calculate cart totals (in INR with reasonable pricing)
export const calculateCartTotals = (items: any[]) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = items.length > 0 ? 30 : 0; // ₹30 delivery fee
  const serviceFee = items.length > 0 ? 15 : 0; // ₹15 service fee
  
  return {
    subtotal,
    deliveryFee,
    serviceFee,
    total: subtotal + deliveryFee + serviceFee
  };
};
