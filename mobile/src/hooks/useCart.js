import { useState, useEffect } from 'react';
import AsyncStorage from 'react-native-async-storage/async-storage';

const CART_STORAGE_KEY = '@food_delivery_cart';

export function useCart() {
  const [cart, setCart] = useState({
    items: [],
    restaurantId: null,
    restaurantName: '',
    subtotal: 0,
    deliveryFee: 0,
    tax: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [cart.items]);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveCart = async (cartData) => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const calculateTotals = () => {
    const subtotal = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + cart.deliveryFee + tax;

    const updatedCart = {
      ...cart,
      subtotal,
      tax,
      total
    };

    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const addToCart = async (menuItem, customizations, quantity = 1, restaurantInfo) => {
    try {
      // Calculate item price with customizations
      let itemPrice = menuItem.basePrice;
      
      // Add size price modifier
      if (customizations.size) {
        itemPrice += customizations.size.priceModifier;
      }
      
      // Add toppings prices
      if (customizations.toppings) {
        customizations.toppings.forEach(topping => {
          itemPrice += topping.price;
        });
      }

      const cartItem = {
        id: menuItem.id + '_' + Date.now(), // Unique cart item ID
        menuItemId: menuItem.id,
        name: menuItem.name,
        image: menuItem.images?.[0],
        basePrice: menuItem.basePrice,
        customizations,
        quantity,
        totalPrice: itemPrice * quantity,
        specialInstructions: customizations.specialInstructions || ''
      };

      let updatedCart;

      // If cart is empty or from same restaurant, add item
      if (cart.items.length === 0 || cart.restaurantId === restaurantInfo.id) {
        updatedCart = {
          ...cart,
          items: [...cart.items, cartItem],
          restaurantId: restaurantInfo.id,
          restaurantName: restaurantInfo.name,
          deliveryFee: restaurantInfo.deliveryFee || 2.99
        };
      } else {
        // If from different restaurant, replace cart
        updatedCart = {
          items: [cartItem],
          restaurantId: restaurantInfo.id,
          restaurantName: restaurantInfo.name,
          deliveryFee: restaurantInfo.deliveryFee || 2.99,
          subtotal: 0,
          tax: 0,
          total: 0
        };
      }

      setCart(updatedCart);
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };

  const updateItemQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    const updatedItems = cart.items.map(item => {
      if (item.id === cartItemId) {
        const unitPrice = item.totalPrice / item.quantity;
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: unitPrice * newQuantity
        };
      }
      return item;
    });

    const updatedCart = {
      ...cart,
      items: updatedItems
    };

    setCart(updatedCart);
  };

  const removeFromCart = (cartItemId) => {
    const updatedItems = cart.items.filter(item => item.id !== cartItemId);
    
    const updatedCart = {
      ...cart,
      items: updatedItems
    };

    // If cart is empty, reset restaurant info
    if (updatedItems.length === 0) {
      updatedCart.restaurantId = null;
      updatedCart.restaurantName = '';
      updatedCart.deliveryFee = 0;
    }

    setCart(updatedCart);
  };

  const clearCart = async () => {
    const emptyCart = {
      items: [],
      restaurantId: null,
      restaurantName: '',
      subtotal: 0,
      deliveryFee: 0,
      tax: 0,
      total: 0
    };

    setCart(emptyCart);
    await saveCart(emptyCart);
  };

  const getItemCount = () => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const isFromDifferentRestaurant = (restaurantId) => {
    return cart.items.length > 0 && cart.restaurantId !== restaurantId;
  };

  return {
    cart,
    loading,
    addToCart,
    updateItemQuantity,
    removeFromCart,
    clearCart,
    getItemCount,
    isFromDifferentRestaurant
  };
}