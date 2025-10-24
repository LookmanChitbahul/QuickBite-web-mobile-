import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, ArrowLeft, Clock } from 'lucide-react-native';
import { router } from 'expo-router';
import KeyboardAvoidingAnimatedView from '@/components/KeyboardAvoidingAnimatedView';

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches] = useState(['Burger', 'Pizza', 'Sushi', 'Tacos']);
  
  const searchResults = [
    {
      id: '1',
      name: 'Classic Burger',
      restaurant: 'Burger Palace',
      price: '$12.99',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      rating: 4.5,
      type: 'item'
    },
    {
      id: '2',
      name: 'Margherita Pizza',
      restaurant: 'Pizza Corner',
      price: '$18.99',
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400',
      rating: 4.8,
      type: 'item'
    },
    {
      id: '3',
      name: 'Asian Fusion',
      restaurant: null,
      price: null,
      image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400',
      rating: 4.3,
      deliveryTime: '30-35 min',
      type: 'restaurant'
    }
  ];

  const filteredResults = searchQuery.length > 0 
    ? searchResults.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.restaurant && item.restaurant.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
      <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
        <StatusBar style="dark" />
        
        {/* Header */}
        <View style={{ 
          paddingTop: insets.top + 10,
          paddingHorizontal: 20,
          paddingBottom: 15,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb'
        }}>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            marginBottom: 15
          }}>
            <TouchableOpacity 
              onPress={() => router.back()}
              style={{ marginRight: 15 }}
            >
              <ArrowLeft size={24} color="#1f2937" />
            </TouchableOpacity>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold',
              color: '#1f2937'
            }}>
              Search
            </Text>
          </View>

          {/* Search Input */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f3f4f6',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12
          }}>
            <Search size={20} color="#6b7280" />
            <TextInput
              style={{ 
                flex: 1,
                marginLeft: 12,
                fontSize: 16,
                color: '#1f2937'
              }}
              placeholder="Search for food or restaurants"
              placeholderTextColor="#6b7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>
        </View>

        <ScrollView 
          style={{ flex: 1 }} 
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
          showsVerticalScrollIndicator={false}
        >
          {searchQuery.length === 0 ? (
            /* Recent Searches */
            <View style={{ padding: 20 }}>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: 'bold', 
                marginBottom: 15,
                color: '#1f2937'
              }}>
                Recent Searches
              </Text>
              {recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSearchQuery(search)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#f3f4f6'
                  }}
                >
                  <Clock size={18} color="#6b7280" />
                  <Text style={{ 
                    marginLeft: 12, 
                    fontSize: 16,
                    color: '#1f2937'
                  }}>
                    {search}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            /* Search Results */
            <View style={{ padding: 20 }}>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: 'bold', 
                marginBottom: 15,
                color: '#1f2937'
              }}>
                Search Results ({filteredResults.length})
              </Text>
              
              {filteredResults.length === 0 ? (
                <View style={{ 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  paddingVertical: 60
                }}>
                  <Text style={{ 
                    fontSize: 16, 
                    color: '#6b7280',
                    textAlign: 'center'
                  }}>
                    No results found for "{searchQuery}"
                  </Text>
                  <Text style={{ 
                    fontSize: 14, 
                    color: '#9ca3af',
                    textAlign: 'center',
                    marginTop: 8
                  }}>
                    Try searching for something else
                  </Text>
                </View>
              ) : (
                filteredResults.map((result) => (
                  <TouchableOpacity
                    key={result.id}
                    onPress={() => {
                      if (result.type === 'restaurant') {
                        router.push(`/(tabs)/restaurant/${result.id}`);
                      } else {
                        router.push(`/(tabs)/item/${result.id}`);
                      }
                    }}
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#fff',
                      borderRadius: 12,
                      padding: 12,
                      marginBottom: 12,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3
                    }}
                  >
                    <Image 
                      source={{ uri: result.image }}
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
                          {result.name}
                        </Text>
                        {result.restaurant && (
                          <Text style={{ 
                            fontSize: 14, 
                            color: '#6b7280',
                            marginBottom: 4
                          }}>
                            {result.restaurant}
                          </Text>
                        )}
                        <Text style={{ 
                          fontSize: 14, 
                          color: '#6b7280'
                        }}>
                          ⭐ {result.rating} {result.deliveryTime && `• ${result.deliveryTime}`}
                        </Text>
                      </View>
                      {result.price && (
                        <Text style={{ 
                          fontSize: 16, 
                          fontWeight: 'bold', 
                          color: '#EF4444'
                        }}>
                          {result.price}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}