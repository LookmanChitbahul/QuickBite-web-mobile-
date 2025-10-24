import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react-native';
import { router } from 'expo-router';

export default function Cart() {
  const insets = useSafeAreaInsets();
  
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Classic Burger',
      restaurant: 'Burger Palace',
      price: 12.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      customizations: ['No pickles', 'Extra cheese']
    },
    {
      id: '2',
      name: 'Margherita Pizza',
      restaurant: 'Pizza Corner',
      price: 18.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400',
      customizations: ['Large size', 'Thin crust']
    },
    {
      id: '3',
      name: 'Chicken Pad Thai',
      restaurant: 'Asian Fusion',
      price: 15.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1559314809-0f31657def5e?w=400',
      customizations: ['Medium spicy']
    }
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={{ 
          paddingTop: insets.top + 15,
          paddingHorizontal: 20,
          paddingBottom: 15,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb'
        }}>
          <Text style={{ 
            fontSize: 20, 
            fontWeight: 'bold',
            color: '#1f2937'
          }}>
            Your Cart
          </Text>
        </View>

        {/* Empty Cart */}
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center',
          paddingHorizontal: 40
        }}>
          <ShoppingBag size={80} color="#d1d5db" />
          <Text style={{ 
            fontSize: 20, 
            fontWeight: 'bold', 
            marginTop: 20,
            marginBottom: 10,
            color: '#1f2937',
            textAlign: 'center'
          }}>
            Your cart is empty
          </Text>
          <Text style={{ 
            fontSize: 16, 
            color: '#6b7280',
            textAlign: 'center',
            marginBottom: 30
          }}>
            Add some delicious items to get started
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/home')}
            style={{
              backgroundColor: '#EF4444',
              paddingHorizontal: 30,
              paddingVertical: 15,
              borderRadius: 25,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5
            }}
          >
            <Text style={{ 
              color: '#fff', 
              fontSize: 16, 
              fontWeight: '600'
            }}>
              Browse Menu
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={{ 
        paddingTop: insets.top + 15,
        paddingHorizontal: 20,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb'
      }}>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold',
          color: '#1f2937'
        }}>
          Your Cart ({cartItems.length} items)
        </Text>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Cart Items */}
        <View style={{ padding: 20 }}>
          {cartItems.map((item) => (
            <View
              key={item.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 16,
                marginBottom: 15,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image 
                  source={{ uri: item.image }}
                  style={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: 8 
                  }}
                  resizeMode="cover"
                />
                <View style={{ 
                  flex: 1, 
                  marginLeft: 12, 
                  justifyContent: 'space-between'
                }}>
                  <View>
                    <Text style={{ 
                      fontSize: 16, 
                      fontWeight: '600', 
                      marginBottom: 4,
                      color: '#1f2937'
                    }}>
                      {item.name}
                    </Text>
                    <Text style={{ 
                      fontSize: 14, 
                      color: '#6b7280',
                      marginBottom: 4
                    }}>
                      {item.restaurant}
                    </Text>
                    {item.customizations.length > 0 && (
                      <Text style={{ 
                        fontSize: 12, 
                        color: '#9ca3af',
                        fontStyle: 'italic'
                      }}>
                        {item.customizations.join(', ')}
                      </Text>
                    )}
                  </View>
                  <View style={{ 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 8
                  }}>
                    <Text style={{ 
                      fontSize: 16, 
                      fontWeight: 'bold', 
                      color: '#EF4444'
                    }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                    <View style={{ 
                      flexDirection: 'row', 
                      alignItems: 'center' 
                    }}>
                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 16,
                          backgroundColor: '#f3f4f6',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Minus size={16} color="#1f2937" />
                      </TouchableOpacity>
                      <Text style={{ 
                        marginHorizontal: 16, 
                        fontSize: 16, 
                        fontWeight: '600',
                        color: '#1f2937'
                      }}>
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 16,
                          backgroundColor: '#EF4444',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Plus size={16} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                  style={{ 
                    marginLeft: 8,
                    padding: 4
                  }}
                >
                  <Trash2 size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Order Summary */}
        <View style={{ 
          backgroundColor: '#fff',
          margin: 20,
          borderRadius: 12,
          padding: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: 'bold', 
            marginBottom: 15,
            color: '#1f2937'
          }}>
            Order Summary
          </Text>
          
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            marginBottom: 8
          }}>
            <Text style={{ fontSize: 16, color: '#6b7280' }}>
              Subtotal
            </Text>
            <Text style={{ fontSize: 16, color: '#1f2937' }}>
              ${subtotal.toFixed(2)}
            </Text>
          </View>
          
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            marginBottom: 8
          }}>
            <Text style={{ fontSize: 16, color: '#6b7280' }}>
              Delivery Fee
            </Text>
            <Text style={{ fontSize: 16, color: '#1f2937' }}>
              ${deliveryFee.toFixed(2)}
            </Text>
          </View>
          
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            marginBottom: 15,
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#e5e7eb'
          }}>
            <Text style={{ fontSize: 16, color: '#6b7280' }}>
              Tax
            </Text>
            <Text style={{ fontSize: 16, color: '#1f2937' }}>
              ${tax.toFixed(2)}
            </Text>
          </View>
          
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            marginBottom: 20
          }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold',
              color: '#1f2937'
            }}>
              Total
            </Text>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold',
              color: '#EF4444'
            }}>
              ${total.toFixed(2)}
            </Text>
          </View>
          
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/checkout')}
            style={{
              backgroundColor: '#EF4444',
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5
            }}
          >
            <Text style={{ 
              color: '#fff', 
              fontSize: 16, 
              fontWeight: 'bold'
            }}>
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}