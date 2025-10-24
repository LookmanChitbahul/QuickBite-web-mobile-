import { useState, useEffect } from 'react';
import { db } from '../services/firestore';

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const snapshot = await db.collection('restaurants').get();
      const restaurantList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setRestaurants(restaurantList);
    } catch (err) {
      setError(err.message);
      console.error('Error loading restaurants:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRestaurantById = async (id) => {
    try {
      const doc = await db.collection('restaurants').doc(id).get();
      if (doc.exists()) {
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (err) {
      console.error('Error getting restaurant:', err);
      throw err;
    }
  };

  const searchRestaurants = async (searchTerm) => {
    try {
      setLoading(true);
      
      // In a real Firebase implementation, you'd want to use
      // full-text search or Algolia integration
      const allRestaurants = await db.collection('restaurants').get();
      const filteredRestaurants = allRestaurants.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(restaurant => 
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      
      setRestaurants(filteredRestaurants);
    } catch (err) {
      setError(err.message);
      console.error('Error searching restaurants:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    restaurants,
    loading,
    error,
    loadRestaurants,
    getRestaurantById,
    searchRestaurants
  };
}

export function useMenuItems(restaurantId) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (restaurantId) {
      loadMenuItems();
    }
  }, [restaurantId]);

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const snapshot = await db.collection('menu_items')
        .where('restaurantId', '==', restaurantId)
        .get();
      
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setMenuItems(items);
    } catch (err) {
      setError(err.message);
      console.error('Error loading menu items:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMenuItemById = async (id) => {
    try {
      const doc = await db.collection('menu_items').doc(id).get();
      if (doc.exists()) {
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (err) {
      console.error('Error getting menu item:', err);
      throw err;
    }
  };

  return {
    menuItems,
    loading,
    error,
    loadMenuItems,
    getMenuItemById
  };
}

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const snapshot = await db.collection('categories').get();
      const categoryList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setCategories(categoryList);
    } catch (err) {
      setError(err.message);
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    loadCategories
  };
}