import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Bell, 
  Settings, 
  HelpCircle, 
  Star,
  Gift,
  Shield,
  ChevronRight,
  LogOut
} from 'lucide-react-native';
import { router } from 'expo-router';

export default function Profile() {
  const insets = useSafeAreaInsets();

  const menuItems = [
    {
      id: 'addresses',
      title: 'My Addresses',
      subtitle: 'Manage delivery addresses',
      icon: <MapPin size={24} color="#6b7280" />,
      onPress: () => {}
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      subtitle: 'Cards and payment options',
      icon: <CreditCard size={24} color="#6b7280" />,
      onPress: () => {}
    },
    {
      id: 'favorites',
      title: 'Favorites',
      subtitle: 'Your favorite restaurants',
      icon: <Star size={24} color="#6b7280" />,
      onPress: () => {}
    },
    {
      id: 'promotions',
      title: 'Promotions & Offers',
      subtitle: 'Active deals and discounts',
      icon: <Gift size={24} color="#6b7280" />,
      onPress: () => {}
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Manage notifications',
      icon: <Bell size={24} color="#6b7280" />,
      onPress: () => {}
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'App preferences',
      icon: <Settings size={24} color="#6b7280" />,
      onPress: () => {}
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      subtitle: 'Account security settings',
      icon: <Shield size={24} color="#6b7280" />,
      onPress: () => {}
    },
    {
      id: 'help',
      title: 'Help & Support',
      subtitle: 'Get help and contact us',
      icon: <HelpCircle size={24} color="#6b7280" />,
      onPress: () => {}
    }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={{ 
        paddingTop: insets.top + 15,
        paddingHorizontal: 20,
        paddingBottom: 15,
        backgroundColor: '#fff'
      }}>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold',
          color: '#1f2937'
        }}>
          Profile
        </Text>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Info */}
        <View style={{
          backgroundColor: '#fff',
          padding: 20,
          marginBottom: 20
        }}>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            marginBottom: 20
          }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: '#f3f4f6',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <User size={40} color="#6b7280" />
            </View>
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={{ 
                fontSize: 20, 
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: 4
              }}>
                John Doe
              </Text>
              <Text style={{ 
                fontSize: 16, 
                color: '#6b7280',
                marginBottom: 8
              }}>
                john.doe@email.com
              </Text>
              <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center' 
              }}>
                <Star size={16} color="#f59e0b" fill="#f59e0b" />
                <Text style={{ 
                  marginLeft: 4,
                  fontSize: 14, 
                  color: '#6b7280'
                }}>
                  4.8 • 24 orders
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#f3f4f6',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20
              }}
            >
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600',
                color: '#1f2937'
              }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={{ 
            flexDirection: 'row',
            backgroundColor: '#f8f9fa',
            borderRadius: 12,
            padding: 16
          }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ 
                fontSize: 20, 
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: 4
              }}>
                24
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: '#6b7280'
              }}>
                Orders
              </Text>
            </View>
            <View style={{ 
              width: 1, 
              backgroundColor: '#e5e7eb',
              marginHorizontal: 16
            }} />
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ 
                fontSize: 20, 
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: 4
              }}>
                $245
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: '#6b7280'
              }}>
                Spent
              </Text>
            </View>
            <View style={{ 
              width: 1, 
              backgroundColor: '#e5e7eb',
              marginHorizontal: 16
            }} />
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ 
                fontSize: 20, 
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: 4
              }}>
              $15
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: '#6b7280'
              }}>
                Saved
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={{ backgroundColor: '#fff' }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.onPress}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 16,
                borderBottomWidth: index < menuItems.length - 1 ? 1 : 0,
                borderBottomColor: '#f3f4f6'
              }}
            >
              <View style={{ 
                width: 40, 
                height: 40,
                borderRadius: 20,
                backgroundColor: '#f8f9fa',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 16
              }}>
                {item.icon}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: 2
                }}>
                  {item.title}
                </Text>
                <Text style={{ 
                  fontSize: 14, 
                  color: '#6b7280'
                }}>
                  {item.subtitle}
                </Text>
              </View>
              <ChevronRight size={20} color="#d1d5db" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            marginTop: 20,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <LogOut size={24} color="#ef4444" />
          <Text style={{ 
            marginLeft: 12,
            fontSize: 16, 
            fontWeight: '600',
            color: '#ef4444'
          }}>
            Sign Out
          </Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={{ 
          textAlign: 'center',
          marginTop: 20,
          fontSize: 14, 
          color: '#9ca3af'
        }}>
          FoodDelivery v1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}