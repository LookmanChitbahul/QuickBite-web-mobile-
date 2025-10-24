import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Clock, CheckCircle, Truck, MapPin } from 'lucide-react-native';
import { router } from 'expo-router';

export default function Orders() {
  const insets = useSafeAreaInsets();
  
  const [activeTab, setActiveTab] = useState('current');
  
  const currentOrders = [
    {
      id: '1',
      restaurant: 'Burger Palace',
      status: 'preparing',
      estimatedTime: '20-25 min',
      total: 28.97,
      items: ['2x Classic Burger', '1x Fries'],
      orderNumber: '#BP001',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400'
    },
    {
      id: '2',
      restaurant: 'Pizza Corner',
      status: 'out_for_delivery',
      estimatedTime: '10-15 min',
      total: 22.48,
      items: ['1x Margherita Pizza'],
      orderNumber: '#PC002',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400'
    }
  ];
  
  const pastOrders = [
    {
      id: '3',
      restaurant: 'Asian Fusion',
      status: 'delivered',
      date: 'Yesterday',
      total: 34.50,
      items: ['1x Pad Thai', '1x Spring Rolls'],
      orderNumber: '#AF003',
      image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400'
    },
    {
      id: '4',
      restaurant: 'Sweet Treats',
      status: 'delivered',
      date: '2 days ago',
      total: 15.99,
      items: ['2x Chocolate Cake', '1x Latte'],
      orderNumber: '#ST004',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'preparing':
        return <Clock size={20} color="#f59e0b" />;
      case 'out_for_delivery':
        return <Truck size={20} color="#3b82f6" />;
      case 'delivered':
        return <CheckCircle size={20} color="#10b981" />;
      default:
        return <Clock size={20} color="#6b7280" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'preparing':
        return 'Preparing';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Processing';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'preparing':
        return '#f59e0b';
      case 'out_for_delivery':
        return '#3b82f6';
      case 'delivered':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const renderOrderCard = (order, isPast = false) => (
    <TouchableOpacity
      key={order.id}
      onPress={() => router.push(`/(tabs)/tracking/${order.id}`)}
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
          source={{ uri: order.image }}
          style={{ 
            width: 60, 
            height: 60, 
            borderRadius: 8 
          }}
          resizeMode="cover"
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 8
          }}>
            <View style={{ flex: 1 }}>
              <Text style={{ 
                fontSize: 16, 
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: 4
              }}>
                {order.restaurant}
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: '#6b7280'
              }}>
                {order.orderNumber}
              </Text>
            </View>
            <Text style={{ 
              fontSize: 16, 
              fontWeight: 'bold',
              color: '#1f2937'
            }}>
              ${order.total.toFixed(2)}
            </Text>
          </View>

          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            marginBottom: 8
          }}>
            {getStatusIcon(order.status)}
            <Text style={{ 
              marginLeft: 8,
              fontSize: 14,
              color: getStatusColor(order.status),
              fontWeight: '600'
            }}>
              {getStatusText(order.status)}
            </Text>
            {!isPast && order.estimatedTime && (
              <Text style={{ 
                marginLeft: 8,
                fontSize: 14,
                color: '#6b7280'
              }}>
                • {order.estimatedTime}
              </Text>
            )}
            {isPast && order.date && (
              <Text style={{ 
                marginLeft: 8,
                fontSize: 14,
                color: '#6b7280'
              }}>
                • {order.date}
              </Text>
            )}
          </View>

          <Text style={{ 
            fontSize: 14,
            color: '#6b7280',
            numberOfLines: 1
          }}>
            {order.items.join(', ')}
          </Text>
        </View>
      </View>

      {!isPast && (
        <View style={{ 
          flexDirection: 'row',
          marginTop: 12,
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6'
        }}>
          <TouchableOpacity
            onPress={() => router.push(`/(tabs)/tracking/${order.id}`)}
            style={{
              flex: 1,
              backgroundColor: '#f3f4f6',
              paddingVertical: 10,
              borderRadius: 8,
              alignItems: 'center',
              marginRight: 8
            }}
          >
            <Text style={{ 
              fontSize: 14,
              fontWeight: '600',
              color: '#1f2937'
            }}>
              Track Order
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#EF4444',
              paddingVertical: 10,
              borderRadius: 8,
              alignItems: 'center',
              marginLeft: 8
            }}
          >
            <Text style={{ 
              fontSize: 14,
              fontWeight: '600',
              color: '#fff'
            }}>
              Reorder
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isPast && (
        <View style={{ 
          flexDirection: 'row',
          marginTop: 12,
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6'
        }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#EF4444',
              paddingVertical: 10,
              borderRadius: 8,
              alignItems: 'center'
            }}
          >
            <Text style={{ 
              fontSize: 14,
              fontWeight: '600',
              color: '#fff'
            }}>
              Reorder
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

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
          Your Orders
        </Text>
      </View>

      {/* Tabs */}
      <View style={{ 
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10
      }}>
        <TouchableOpacity
          onPress={() => setActiveTab('current')}
          style={{
            flex: 1,
            paddingVertical: 10,
            borderBottomWidth: 2,
            borderBottomColor: activeTab === 'current' ? '#EF4444' : 'transparent',
            alignItems: 'center'
          }}
        >
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: activeTab === 'current' ? '#EF4444' : '#6b7280'
          }}>
            Current ({currentOrders.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('past')}
          style={{
            flex: 1,
            paddingVertical: 10,
            borderBottomWidth: 2,
            borderBottomColor: activeTab === 'past' ? '#EF4444' : 'transparent',
            alignItems: 'center'
          }}
        >
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: activeTab === 'past' ? '#EF4444' : '#6b7280'
          }}>
            Past ({pastOrders.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 20 }}>
          {activeTab === 'current' ? (
            currentOrders.length > 0 ? (
              currentOrders.map(order => renderOrderCard(order, false))
            ) : (
              <View style={{ 
                alignItems: 'center', 
                justifyContent: 'center',
                paddingVertical: 60
              }}>
                <Clock size={60} color="#d1d5db" />
                <Text style={{ 
                  fontSize: 18, 
                  fontWeight: 'bold', 
                  marginTop: 20,
                  marginBottom: 10,
                  color: '#1f2937',
                  textAlign: 'center'
                }}>
                  No current orders
                </Text>
                <Text style={{ 
                  fontSize: 16, 
                  color: '#6b7280',
                  textAlign: 'center'
                }}>
                  Your active orders will appear here
                </Text>
              </View>
            )
          ) : (
            pastOrders.length > 0 ? (
              pastOrders.map(order => renderOrderCard(order, true))
            ) : (
              <View style={{ 
                alignItems: 'center', 
                justifyContent: 'center',
                paddingVertical: 60
              }}>
                <CheckCircle size={60} color="#d1d5db" />
                <Text style={{ 
                  fontSize: 18, 
                  fontWeight: 'bold', 
                  marginTop: 20,
                  marginBottom: 10,
                  color: '#1f2937',
                  textAlign: 'center'
                }}>
                  No past orders
                </Text>
                <Text style={{ 
                  fontSize: 16, 
                  color: '#6b7280',
                  textAlign: 'center'
                }}>
                  Your order history will appear here
                </Text>
              </View>
            )
          )}
        </View>
      </ScrollView>
    </View>
  );
}