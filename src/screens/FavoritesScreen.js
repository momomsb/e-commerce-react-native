import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function FavoritesScreen({ favorites, toggleFavorite, navigateToProductDetail }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFavorites = favorites.filter(f =>
    f.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderGridItem = ({ item }) => {
    const isFav = favorites.some(f => Number(f.id) === Number(item.id));
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
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Text style={styles.headerCount}>{favorites.length} items</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color="#A0A0A0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search favorites..."
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

      {/* Content */}
      {filteredFavorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={60} color="#E0E0E0" />
          <Text style={styles.emptyText}>
            {searchQuery ? 'No favorites match your search' : 'No favorites yet!'}
          </Text>
          <Text style={styles.emptySubtext}>
            {searchQuery ? 'Try a different search term.' : 'Save your favorite items here.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredFavorites}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productsGrid}
          renderItem={renderGridItem}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: {
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#111' },
  headerCount: { fontSize: 13, color: '#A0A0A0', marginTop: 2 },
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
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#000', marginTop: 15 },
  emptySubtext: { fontSize: 14, color: '#A0A0A0', marginTop: 8, textAlign: 'center', marginBottom: 20 },
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
