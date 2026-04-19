import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ProductsScreen({ navigation, selectedCategory, navigateToProductDetail, favorites, toggleFavorite }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      fetch(`https://dummyjson.com/products/category/${selectedCategory.apiCategory}`)
        .then(res => res.json())
        .then(data => {
          setProducts(data.products);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [selectedCategory]);

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderGridItem = ({ item }) => {
    const isFav = favorites.some(f => f.id === item.id);
    return (
      <View style={styles.gridItem}>
        <TouchableOpacity style={styles.gridImageContainer} onPress={() => navigateToProductDetail(item)}>
          <Image source={{ uri: item.thumbnail }} style={styles.gridImage} />
          <TouchableOpacity style={styles.heartButton} onPress={() => toggleFavorite(item)}>
            <Ionicons name={isFav ? "heart" : "heart-outline"} size={22} color={isFav ? "#FF6B6B" : "#A0A0A0"} />
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridInfo} onPress={() => navigateToProductDetail(item)}>
          <Text style={styles.gridTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.gridPrice}>${item.price}</Text>
          <View style={styles.gridRating}>
            <Ionicons name="star" size={12} color="#FDB813" />
            <Text style={styles.gridRatingText}>{item.rating}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{selectedCategory?.title || 'Products'}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color="#A0A0A0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={`Search in ${selectedCategory?.title || 'products'}...`}
            placeholderTextColor="#A0A0A0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#A0A0A0" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Products */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productsGrid}
          renderItem={renderGridItem}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <Text style={{ color: '#A0A0A0' }}>
                {searchQuery ? `No products found for "${searchQuery}"` : 'No products available'}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#111' },
  searchBarWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: '#333' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  productsGrid: { paddingHorizontal: 15, paddingTop: 10, paddingBottom: 20 },
  row: { justifyContent: 'space-between', marginBottom: 15 },
  gridItem: {
    width: (width - 45) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  gridImageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  gridImage: { width: '80%', height: '80%', resizeMode: 'contain' },
  heartButton: {
    position: 'absolute', top: 10, right: 10,
    backgroundColor: '#fff', borderRadius: 15, width: 30, height: 30,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
  },
  gridInfo: { padding: 12 },
  gridTitle: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6, height: 35 },
  gridPrice: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 4 },
  gridRating: { flexDirection: 'row', alignItems: 'center' },
  gridRatingText: { fontSize: 12, color: '#A0A0A0', marginLeft: 4 },
});
