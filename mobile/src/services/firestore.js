// Firestore Database Service
// Mock implementation - replace with actual Firebase once installed

// Mock data storage
let mockData = {
  users: {},
  restaurants: {
    'rest_1': {
      id: 'rest_1',
      name: "Mario's Pizza Palace",
      description: "Authentic Italian pizza made with fresh ingredients",
      images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b'],
      logo: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f',
      cuisine: ['italian', 'pizza'],
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        coordinates: { latitude: 40.7128, longitude: -74.0060 }
      },
      rating: 4.5,
      reviewCount: 324,
      priceRange: '$$',
      deliveryFee: 2.99,
      minimumOrder: 15.00,
      estimatedDeliveryTime: '25-40 min',
      isActive: true,
      createdAt: new Date().toISOString()
    },
    'rest_2': {
      id: 'rest_2',
      name: "Burger Haven",
      description: "Gourmet burgers and fries",
      images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd'],
      logo: 'https://images.unsplash.com/photo-1550317138-10000687a72b',
      cuisine: ['american', 'burgers'],
      address: {
        street: '456 Oak Ave',
        city: 'New York',
        state: 'NY',
        zipCode: '10002',
        coordinates: { latitude: 40.7589, longitude: -73.9851 }
      },
      rating: 4.2,
      reviewCount: 156,
      priceRange: '$$$',
      deliveryFee: 3.99,
      minimumOrder: 20.00,
      estimatedDeliveryTime: '20-35 min',
      isActive: true,
      createdAt: new Date().toISOString()
    }
  },
  menu_items: {
    'item_1': {
      id: 'item_1',
      restaurantId: 'rest_1',
      name: 'Margherita Pizza',
      description: 'Fresh mozzarella, tomato sauce, basil',
      images: ['https://images.unsplash.com/photo-1604382355076-af4b0eb60143'],
      category: 'pizza',
      basePrice: 16.99,
      calories: 250,
      preparationTime: '15-20 min',
      ingredients: ['mozzarella', 'tomato sauce', 'basil', 'olive oil'],
      customizations: {
        sizes: [
          { id: 'small', name: 'Small (10")', priceModifier: 0 },
          { id: 'medium', name: 'Medium (12")', priceModifier: 3.00 },
          { id: 'large', name: 'Large (14")', priceModifier: 6.00 }
        ],
        toppings: [
          { id: 'pepperoni', name: 'Pepperoni', price: 2.50 },
          { id: 'mushrooms', name: 'Mushrooms', price: 1.50 },
          { id: 'olives', name: 'Black Olives', price: 1.50 }
        ]
      },
      isAvailable: true,
      isPopular: true
    },
    'item_2': {
      id: 'item_2',
      restaurantId: 'rest_2',
      name: 'Classic Cheeseburger',
      description: 'Beef patty, cheese, lettuce, tomato, pickles',
      images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd'],
      category: 'burgers',
      basePrice: 12.99,
      calories: 580,
      preparationTime: '10-15 min',
      ingredients: ['beef patty', 'cheese', 'lettuce', 'tomato', 'pickles'],
      customizations: {
        options: [
          {
            id: 'cooking_style',
            title: 'How would you like it cooked?',
            required: true,
            choices: [
              { id: 'medium_rare', name: 'Medium Rare', priceModifier: 0 },
              { id: 'medium', name: 'Medium', priceModifier: 0 },
              { id: 'well_done', name: 'Well Done', priceModifier: 0 }
            ]
          }
        ],
        toppings: [
          { id: 'bacon', name: 'Bacon', price: 2.00 },
          { id: 'avocado', name: 'Avocado', price: 1.50 }
        ]
      },
      isAvailable: true,
      isPopular: false
    }
  },
  categories: {
    'cat_1': { id: 'cat_1', name: 'Pizza', icon: '🍕', color: '#EF4444' },
    'cat_2': { id: 'cat_2', name: 'Burgers', icon: '🍔', color: '#F59E0B' },
    'cat_3': { id: 'cat_3', name: 'Asian', icon: '🥢', color: '#10B981' },
    'cat_4': { id: 'cat_4', name: 'Desserts', icon: '🍰', color: '#8B5CF6' }
  },
  orders: {}
};

class FirestoreService {
  // Collection helpers
  collection(collectionName) {
    return {
      doc: (docId) => ({
        get: async () => {
          await this.simulateDelay();
          const data = mockData[collectionName]?.[docId];
          return {
            exists: () => !!data,
            data: () => data,
            id: docId
          };
        },
        set: async (data) => {
          await this.simulateDelay();
          if (!mockData[collectionName]) {
            mockData[collectionName] = {};
          }
          mockData[collectionName][docId] = { ...data, id: docId };
          return { id: docId };
        },
        update: async (data) => {
          await this.simulateDelay();
          if (mockData[collectionName]?.[docId]) {
            mockData[collectionName][docId] = {
              ...mockData[collectionName][docId],
              ...data,
              updatedAt: new Date().toISOString()
            };
          }
        },
        delete: async () => {
          await this.simulateDelay();
          if (mockData[collectionName]?.[docId]) {
            delete mockData[collectionName][docId];
          }
        }
      }),
      add: async (data) => {
        await this.simulateDelay();
        const id = 'doc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        if (!mockData[collectionName]) {
          mockData[collectionName] = {};
        }
        mockData[collectionName][id] = { ...data, id, createdAt: new Date().toISOString() };
        return { id };
      },
      where: (field, operator, value) => ({
        get: async () => {
          await this.simulateDelay();
          const collection = mockData[collectionName] || {};
          const docs = Object.values(collection).filter(doc => {
            switch (operator) {
              case '==':
                return doc[field] === value;
              case '!=':
                return doc[field] !== value;
              case '>':
                return doc[field] > value;
              case '<':
                return doc[field] < value;
              case '>=':
                return doc[field] >= value;
              case '<=':
                return doc[field] <= value;
              case 'array-contains':
                return Array.isArray(doc[field]) && doc[field].includes(value);
              case 'in':
                return Array.isArray(value) && value.includes(doc[field]);
              default:
                return false;
            }
          });
          return {
            docs: docs.map(doc => ({
              id: doc.id,
              data: () => doc,
              exists: () => true
            }))
          };
        }
      }),
      orderBy: (field, direction = 'asc') => ({
        get: async () => {
          await this.simulateDelay();
          const collection = mockData[collectionName] || {};
          const docs = Object.values(collection).sort((a, b) => {
            if (direction === 'desc') {
              return b[field] > a[field] ? 1 : -1;
            }
            return a[field] > b[field] ? 1 : -1;
          });
          return {
            docs: docs.map(doc => ({
              id: doc.id,
              data: () => doc,
              exists: () => true
            }))
          };
        }
      }),
      get: async () => {
        await this.simulateDelay();
        const collection = mockData[collectionName] || {};
        const docs = Object.values(collection);
        return {
          docs: docs.map(doc => ({
            id: doc.id,
            data: () => doc,
            exists: () => true
          }))
        };
      }
    };
  }

  async simulateDelay() {
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));
  }

  // Generate mock ID
  generateId() {
    return 'mock_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}

// Export singleton instance
export const db = new FirestoreService();

// When you install Firebase, replace this file with:
/*
import { 
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';

export {
  db,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot
};
*/