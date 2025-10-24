import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Minus, Plus, Heart } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function ItemDetail() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  // Mock item data
  const item = {
    id: id,
    name: 'Classic Burger',
    description: 'A delicious beef patty with fresh lettuce, tomato, onion, pickles, and our special sauce on a toasted sesame bun. Made with 100% fresh ground beef.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
    restaurant: 'Burger Palace',
    rating: 4.8,
    reviews: 340,
    calories: 520,
    prepTime: '10-12 min'
  };

  const sizes = [
    { id: 'small', name: 'Small', price: 0 },
    { id: 'medium', name: 'Medium', price: 0 },
    { id: 'large', name: 'Large', price: 2.00 }
  ];

  const toppings = [
    { id: 'cheese', name: 'Extra Cheese', price: 1.50 },
    { id: 'bacon', name: 'Bacon', price: 2.00 },
    { id: 'mushroom', name: 'Mushrooms', price: 1.00 },
    { id: 'avocado', name: 'Avocado', price: 2.50 }
  ];

  const customizations = [
    {
      id: 'doneness',
      title: 'How would you like it cooked?',
      options: [
        { id: 'rare', name: 'Rare' },
        { id: 'medium', name: 'Medium' },
        { id: 'well', name: 'Well Done' }
      ],
      required: true
    },
    {
      id: 'pickles',
      title: 'Pickles',
      options: [
        { id: 'normal', name: 'Normal' },
        { id: 'extra', name: 'Extra Pickles' },
        { id: 'no', name: 'No Pickles' }
      ],
      required: false
    }
  ];

  const toggleTopping = (toppingId) => {
    setSelectedToppings(prev => 
      prev.includes(toppingId) 
        ? prev.filter(id => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  const selectOption = (customizationId, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [customizationId]: optionId
    }));
  };

  const calculateTotalPrice = () => {
    let total = item.price;
    
    // Add size price
    const sizePrice = sizes.find(s => s.name === selectedSize)?.price || 0;
    total += sizePrice;
    
    // Add toppings price
    const toppingsPrice = selectedToppings.reduce((sum, toppingId) => {
      const topping = toppings.find(t => t.id === toppingId);
      return sum + (topping?.price || 0);
    }, 0);
    total += toppingsPrice;
    
    return total * quantity;
  };

  const addToCart = () => {
    // Here you would typically add the item to cart with all customizations
    console.log('Adding to cart:', {
      item: item,
      quantity: quantity,
      size: selectedSize,
      toppings: selectedToppings,
      customizations: selectedOptions,
      totalPrice: calculateTotalPrice()
    });
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <StatusBar style="light" />
      
      {/* Header Image */}
      <View style={{ position: 'relative' }}>
        <Image 
          source={{ uri: item.image }}
          style={{ 
            width: '100%', 
            height: 300
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
        {/* Item Info */}
        <View style={{ 
          backgroundColor: '#fff',
          padding: 20,
          marginTop: -30,
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
            {item.name}
          </Text>
          
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12
          }}>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: 'bold',
              color: '#EF4444'
            }}>
              ${item.price.toFixed(2)}
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: '#6b7280'
            }}>
              ⭐ {item.rating} ({item.reviews} reviews)
            </Text>
          </View>
          
          <Text style={{ 
            fontSize: 16, 
            color: '#6b7280',
            lineHeight: 22,
            marginBottom: 12
          }}>
            {item.description}
          </Text>
          
          <View style={{ 
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={{ 
              fontSize: 14, 
              color: '#6b7280',
              marginRight: 16
            }}>
              🔥 {item.calories} cal
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: '#6b7280'
            }}>
              ⏱️ {item.prepTime}
            </Text>
          </View>
        </View>

        {/* Size Selection */}
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
            color: '#1f2937',
            marginBottom: 15
          }}>
            Size
          </Text>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size.id}
              onPress={() => setSelectedSize(size.name)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: selectedSize === size.name ? '#fef2f2' : 'transparent',
                borderWidth: selectedSize === size.name ? 1 : 0,
                borderColor: '#EF4444',
                marginBottom: 8
              }}
            >
              <Text style={{ 
                fontSize: 16,
                color: selectedSize === size.name ? '#EF4444' : '#1f2937',
                fontWeight: selectedSize === size.name ? '600' : 'normal'
              }}>
                {size.name}
              </Text>
              {size.price > 0 && (
                <Text style={{ 
                  fontSize: 16,
                  color: selectedSize === size.name ? '#EF4444' : '#6b7280',
                  fontWeight: '600'
                }}>
                  +${size.price.toFixed(2)}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Toppings */}
        <View style={{ 
          backgroundColor: '#fff',
          marginHorizontal: 20,
          marginBottom: 20,
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
            color: '#1f2937',
            marginBottom: 15
          }}>
            Add Toppings
          </Text>
          {toppings.map((topping) => (
            <TouchableOpacity
              key={topping.id}
              onPress={() => toggleTopping(topping.id)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: selectedToppings.includes(topping.id) ? '#fef2f2' : 'transparent',
                borderWidth: selectedToppings.includes(topping.id) ? 1 : 0,
                borderColor: '#EF4444',
                marginBottom: 8
              }}
            >
              <Text style={{ 
                fontSize: 16,
                color: selectedToppings.includes(topping.id) ? '#EF4444' : '#1f2937',
                fontWeight: selectedToppings.includes(topping.id) ? '600' : 'normal'
              }}>
                {topping.name}
              </Text>
              <Text style={{ 
                fontSize: 16,
                color: selectedToppings.includes(topping.id) ? '#EF4444' : '#6b7280',
                fontWeight: '600'
              }}>
                +${topping.price.toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Customizations */}
        {customizations.map((customization) => (
          <View 
            key={customization.id}
            style={{ 
              backgroundColor: '#fff',
              marginHorizontal: 20,
              marginBottom: 20,
              borderRadius: 12,
              padding: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3
            }}
          >
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: 15
            }}>
              {customization.title} {customization.required && <Text style={{ color: '#EF4444' }}>*</Text>}
            </Text>
            {customization.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => selectOption(customization.id, option.id)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  backgroundColor: selectedOptions[customization.id] === option.id ? '#fef2f2' : 'transparent',
                  borderWidth: selectedOptions[customization.id] === option.id ? 1 : 0,
                  borderColor: '#EF4444',
                  marginBottom: 8
                }}
              >
                <Text style={{ 
                  fontSize: 16,
                  color: selectedOptions[customization.id] === option.id ? '#EF4444' : '#1f2937',
                  fontWeight: selectedOptions[customization.id] === option.id ? '600' : 'normal'
                }}>
                  {option.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Bar */}
      <View style={{ 
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: insets.bottom + 15,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5
      }}>
        <View style={{ 
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Quantity Selector */}
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            backgroundColor: '#f3f4f6',
            borderRadius: 25,
            paddingHorizontal: 4,
            paddingVertical: 4
          }}>
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Minus size={16} color="#1f2937" />
            </TouchableOpacity>
            <Text style={{ 
              marginHorizontal: 20, 
              fontSize: 18, 
              fontWeight: 'bold',
              color: '#1f2937'
            }}>
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#EF4444',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Plus size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity
            onPress={addToCart}
            style={{
              flex: 1,
              backgroundColor: '#EF4444',
              paddingVertical: 16,
              borderRadius: 25,
              alignItems: 'center',
              marginLeft: 15,
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
              Add to Cart • ${calculateTotalPrice().toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}