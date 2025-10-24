import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Star, Clock, MapPin, Plus, Heart } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function RestaurantDetail() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const [favorite, setFavorite] = useState(false);

  // Mock restaurant data
  const restaurant = {
    id: id,
    name: 'Burger Palace',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600',
    rating: 4.5,
    reviews: 1200,
    deliveryTime: '25-30 min',
    deliveryFee: '$2.99',
    description: 'Fresh, juicy burgers made with premium ingredients and served hot',
    cuisine: 'American',
    address: '123 Main Street, Downtown'
  };

  const categories = ['Popular', 'Burgers', 'Sides', 'Drinks', 'Desserts'];

  const menuItems = [
    {
      id: '1',
      name: 'Classic Burger',
      description: 'Beef patty, lettuce, tomato, onion, pickles, special sauce',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      category: 'Popular'
    },
    {
      id: '2',
      name: 'Double Cheeseburger',
      description: 'Two beef patties, double cheese, lettuce, special sauce',
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400',
      category: 'Popular'
    },
    {
      id: '3',
      name: 'Chicken Burger',
      description: 'Grilled chicken breast, avocado, lettuce, mayo',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1606755962773-d324e2dadc14?w=400',
      category: 'Burgers'
    },
    {
      id: '4',
      name: 'French Fries',
      description: 'Crispy golden fries with sea salt',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=400',
      category: 'Sides'
    },
    {
      id: '5',
      name: 'Coca Cola',
      description: 'Refreshing cold soda',
      price: 2.99,
      image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400',
      category: 'Drinks'
    }
  ];

  const filteredItems = selectedCategory === 'Popular' 
    ? menuItems.filter(item => item.category === 'Popular')
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <StatusBar style="light" />
      
      {/* Header Image */}
      <View style={{ position: 'relative' }}>
        <Image 
          source={{ uri: restaurant.image }}
          style={{ 
            width: '100%', 
            height: 250
          }}
          resizeMode="cover"
        />
        
        {/* Header Controls */}
        <View style={{ 
          position: 'absolute',
          top: insets.top + 10,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20
        }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <ArrowLeft size={20} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setFavorite(!favorite)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Heart 
              size={20} 
              color={favorite ? "#EF4444" : "#fff"} 
              fill={favorite ? "#EF4444" : "transparent"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Restaurant Info */}
        <View style={{ 
          backgroundColor: '#fff',
          padding: 20,
          marginTop: -20,
          marginHorizontal: 20,
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          <Text style={{ 
            fontSize: 24, 
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: 8
          }}>
            {restaurant.name}
          </Text>
          
          <Text style={{ 
            fontSize: 16, 
            color: '#6b7280',
            marginBottom: 12
          }}>
            {restaurant.description}
          </Text>
          
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            marginBottom: 8
          }}>
            <Star size={16} color="#f59e0b" fill="#f59e0b" />
            <Text style={{ 
              marginLeft: 4,
              fontSize: 14, 
              color: '#1f2937',
              fontWeight: '600'
            }}>
              {restaurant.rating} ({restaurant.reviews} reviews)
            </Text>
          </View>
          
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            marginBottom: 8
          }}>
            <Clock size={16} color="#6b7280" />
            <Text style={{ 
              marginLeft: 4,
              fontSize: 14, 
              color: '#6b7280'
            }}>
              {restaurant.deliveryTime} • {restaurant.deliveryFee} delivery
            </Text>
          </View>
          
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center'
          }}>
            <MapPin size={16} color="#6b7280" />
            <Text style={{ 
              marginLeft: 4,
              fontSize: 14, 
              color: '#6b7280'
            }}>
              {restaurant.address}
            </Text>
          </View>
        </View>

        {/* Categories */}
        <View style={{ paddingVertical: 20 }}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            style={{ flexGrow: 0 }}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={{
                  backgroundColor: selectedCategory === category ? '#EF4444' : '#fff',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 25,
                  marginRight: 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3
                }}
              >
                <Text style={{
                  color: selectedCategory === category ? '#fff' : '#1f2937',
                  fontWeight: '600',
                  fontSize: 14
                }}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Menu Items */}
        <View style={{ paddingHorizontal: 20 }}>
          {filteredItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push(`/(tabs)/item/${item.id}`)}
              style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 16,
                marginBottom: 15,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                flexDirection: 'row'
              }}
            >
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text style={{ 
                  fontSize: 18, 
                  fontWeight: '600', 
                  marginBottom: 4,
                  color: '#1f2937'
                }}>
                  {item.name}
                </Text>
                <Text style={{ 
                  fontSize: 14, 
                  color: '#6b7280',
                  marginBottom: 8,
                  lineHeight: 20
                }}>
                  {item.description}
                </Text>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: 'bold', 
                  color: '#EF4444' 
                }}>
                  ${item.price}
                </Text>
              </View>
              
              <View style={{ position: 'relative' }}>
                <Image 
                  source={{ uri: item.image }}
                  style={{ 
                    width: 100, 
                    height: 100, 
                    borderRadius: 8 
                  }}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: -8,
                    right: -8,
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: '#EF4444',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 5
                  }}
                >
                  <Plus size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}