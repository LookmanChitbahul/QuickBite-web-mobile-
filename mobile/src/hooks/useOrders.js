import { useState, useEffect } from 'react';
import { db } from '../services/firestore';
import { useAuth } from './useAuth';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const snapshot = await db.collection('orders')
        .where('userId', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .get();
      
      const orderList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setOrders(orderList);
    } catch (err) {
      setError(err.message);
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData) => {
    try {
      if (!user) {
        throw new Error('User must be authenticated to create an order');
      }

      const orderNumber = 'ORD-' + new Date().getFullYear() + '-' + 
        String(Date.now()).slice(-6);

      const newOrder = {
        orderNumber,
        userId: user.uid,
        ...orderData,
        status: 'pending',
        timeline: [
          {
            status: 'pending',
            timestamp: new Date().toISOString(),
            message: 'Order placed successfully'
          }
        ],
        estimatedDeliveryTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await db.collection('orders').add(newOrder);
      
      // Add the new order to local state
      const createdOrder = { id: docRef.id, ...newOrder };
      setOrders(prevOrders => [createdOrder, ...prevOrders]);
      
      return createdOrder;
    } catch (err) {
      console.error('Error creating order:', err);
      throw err;
    }
  };

  const getOrderById = async (orderId) => {
    try {
      const doc = await db.collection('orders').doc(orderId).get();
      if (doc.exists()) {
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (err) {
      console.error('Error getting order:', err);
      throw err;
    }
  };

  const updateOrderStatus = async (orderId, newStatus, message) => {
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;

      const updatedTimeline = [
        ...order.timeline,
        {
          status: newStatus,
          timestamp: new Date().toISOString(),
          message: message || `Order ${newStatus}`
        }
      ];

      const updateData = {
        status: newStatus,
        timeline: updatedTimeline,
        updatedAt: new Date().toISOString()
      };

      // Set delivery time when delivered
      if (newStatus === 'delivered') {
        updateData.actualDeliveryTime = new Date().toISOString();
      }

      await db.collection('orders').doc(orderId).update(updateData);
      
      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, ...updateData }
            : order
        )
      );
    } catch (err) {
      console.error('Error updating order status:', err);
      throw err;
    }
  };

  const addOrderRating = async (orderId, rating, review) => {
    try {
      const updateData = {
        rating,
        review,
        updatedAt: new Date().toISOString()
      };

      await db.collection('orders').doc(orderId).update(updateData);
      
      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, ...updateData }
            : order
        )
      );
    } catch (err) {
      console.error('Error adding order rating:', err);
      throw err;
    }
  };

  const cancelOrder = async (orderId, reason) => {
    try {
      await updateOrderStatus(orderId, 'cancelled', `Order cancelled: ${reason}`);
    } catch (err) {
      console.error('Error cancelling order:', err);
      throw err;
    }
  };

  const reorderFromPrevious = async (orderId) => {
    try {
      const order = await getOrderById(orderId);
      if (!order) {
        throw new Error('Order not found');
      }

      // Create new order with same items but updated timestamp
      const reorderData = {
        restaurantId: order.restaurantId,
        items: order.items,
        pricing: order.pricing,
        deliveryAddress: order.deliveryAddress,
        paymentMethod: order.paymentMethod,
        specialInstructions: order.specialInstructions
      };

      return await createOrder(reorderData);
    } catch (err) {
      console.error('Error reordering:', err);
      throw err;
    }
  };

  // Get orders by status
  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status);
  };

  // Get active orders (not delivered or cancelled)
  const getActiveOrders = () => {
    return orders.filter(order => 
      !['delivered', 'cancelled'].includes(order.status)
    );
  };

  return {
    orders,
    loading,
    error,
    loadOrders,
    createOrder,
    getOrderById,
    updateOrderStatus,
    addOrderRating,
    cancelOrder,
    reorderFromPrevious,
    getOrdersByStatus,
    getActiveOrders
  };
}