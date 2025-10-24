import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Search,
  MapPin,
  Bell,
  Star,
  Clock,
  ChevronRight,
} from "lucide-react-native";
import { router } from "expo-router";
import { useRestaurants, useCategories } from "../../hooks/useRestaurants";

export default function Home() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    restaurants,
    loading: restaurantsLoading,
    searchRestaurants,
  } = useRestaurants();
  const { categories, loading: categoriesLoading } = useCategories();

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      await searchRestaurants(query.trim());
    }
  };

  const handleRestaurantPress = (restaurant) => {
    router.push(`/(tabs)/restaurant/${restaurant.id}`);
  };

  const handleCategoryPress = (category) => {
    searchRestaurants(category.name);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 10,
          paddingHorizontal: 20,
          paddingBottom: 10,
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MapPin size={20} color="#EF4444" />
            <Text
              style={{
                marginLeft: 8,
                fontSize: 16,
                fontWeight: "600",
                color: "#1f2937",
              }}
            >
              123 Main St, City
            </Text>
          </View>
          <TouchableOpacity>
            <Bell size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f3f4f6",
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <Search size={20} color="#6b7280" />
          <TextInput
            style={{
              flex: 1,
              marginLeft: 12,
              fontSize: 16,
              color: "#1f2937",
            }}
            placeholder="Search restaurants or dishes..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories */}
        <View style={{ paddingVertical: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: 16,
              paddingHorizontal: 20,
            }}
          >
            Categories
          </Text>
          {categoriesLoading ? (
            <ActivityIndicator
              size="large"
              color="#EF4444"
              style={{ marginVertical: 20 }}
            />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              style={{ flexGrow: 0 }}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => handleCategoryPress(category)}
                  style={{
                    alignItems: "center",
                    marginRight: 20,
                    width: 80,
                  }}
                >
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: category.color || "#f3f4f6",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Text style={{ fontSize: 24 }}>{category.icon || "🍽️"}</Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: "#374151",
                      textAlign: "center",
                    }}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Popular Restaurants */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 15,
              color: "#1f2937",
            }}
          >
            {searchQuery ? "Search Results" : "Popular Near You"}
          </Text>
          {restaurantsLoading ? (
            <ActivityIndicator
              size="large"
              color="#EF4444"
              style={{ marginVertical: 20 }}
            />
          ) : restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                onPress={() => handleRestaurantPress(restaurant)}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  marginBottom: 15,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Image
                  source={{
                    uri:
                      restaurant.images?.[0] ||
                      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
                  }}
                  style={{
                    width: "100%",
                    height: 160,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                  resizeMode="cover"
                />
                <View style={{ padding: 16 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 4,
                      color: "#1f2937",
                    }}
                  >
                    {restaurant.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#6b7280",
                      marginBottom: 8,
                      numberOfLines: 2,
                    }}
                  >
                    {restaurant.description}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Star size={16} color="#f59e0b" fill="#f59e0b" />
                    <Text
                      style={{
                        marginLeft: 4,
                        fontSize: 14,
                        color: "#374151",
                        fontWeight: "600",
                      }}
                    >
                      {restaurant.rating}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 8,
                        fontSize: 14,
                        color: "#6b7280",
                      }}
                    >
                      ({restaurant.reviewCount} reviews)
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Clock size={14} color="#6b7280" />
                      <Text
                        style={{
                          marginLeft: 4,
                          fontSize: 14,
                          color: "#6b7280",
                        }}
                      >
                        {restaurant.estimatedDeliveryTime}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#EF4444",
                        fontWeight: "600",
                      }}
                    >
                      ${restaurant.deliveryFee?.toFixed(2)} delivery
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text
              style={{
                textAlign: "center",
                color: "#6b7280",
                fontSize: 16,
                marginVertical: 20,
              }}
            >
              {searchQuery
                ? "No restaurants found for your search."
                : "No restaurants available."}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
