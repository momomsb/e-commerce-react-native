import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const TABS = ['Women', 'Men', 'Kids'];

export const TAB_CONFIGS = {
  'Women': {
    bannerColor: '#FFB6C1', 
    discount: '25%',
    bannerText: 'On Womens Eyewear',
    bannerImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400&h=300',
    categories: [
      { id: 'w1', title: 'Dresses', itemsCount: 1125, rating: 4, reviewCount: 3, apiCategory: 'womens-dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=200&h=200' },
      { id: 'w2', title: 'Bags', itemsCount: 275, rating: 4.5, reviewCount: 9, apiCategory: 'womens-bags', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=200&h=200' },
      { id: 'w3', title: 'Shoe', itemsCount: 1077, rating: 3.5, reviewCount: 5, apiCategory: 'womens-shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=200&h=200' },
      { id: 'w4', title: 'Watches', itemsCount: 840, rating: 5, reviewCount: 12, apiCategory: 'womens-watches', image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=200&h=200' },
      { id: 'w5', title: 'Jewellery', itemsCount: 2047, rating: 4.8, reviewCount: 6, apiCategory: 'womens-jewellery', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=200&h=200' },
      { id: 'w6', title: 'Beauty', itemsCount: 1540, rating: 4.2, reviewCount: 15, apiCategory: 'beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=200&h=200' },
      { id: 'w7', title: 'Fragrances', itemsCount: 890, rating: 4.9, reviewCount: 22, apiCategory: 'fragrances', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=200&h=200' },
      { id: 'w8', title: 'Skin Care', itemsCount: 1200, rating: 4.7, reviewCount: 18, apiCategory: 'skin-care', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=200&h=200' },
      { id: 'k4', title: 'Groceries', itemsCount: 800, rating: 4.2, reviewCount: 11, apiCategory: 'groceries', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200&h=200' },
      { id: 'k5', title: 'Home Decoration', itemsCount: 410, rating: 4.7, reviewCount: 8, apiCategory: 'home-decoration', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=200&h=200' },
    ],
  },
  'Men': {
    bannerColor: '#AED6F1', 
    discount: '15%',
    bannerText: 'On Mens Eyewear',
    bannerImage: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=400&h=300',
    categories: [
      { id: 'm1', title: 'Shirts', itemsCount: 575, rating: 4, reviewCount: 3, apiCategory: 'mens-shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=200&h=200' },
      { id: 'm2', title: 'Shoe', itemsCount: 1077, rating: 4.5, reviewCount: 7, apiCategory: 'mens-shoes', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=200&h=200' },
      { id: 'm3', title: 'Watches', itemsCount: 275, rating: 5, reviewCount: 9, apiCategory: 'mens-watches', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=200&h=200' },
      { id: 'm4', title: 'Sunglasses', itemsCount: 1250, rating: 3.5, reviewCount: 3, apiCategory: 'sunglasses', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=200&h=200' },
      { id: 'm5', title: 'Laptops', itemsCount: 450, rating: 4.8, reviewCount: 12, apiCategory: 'laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=200&h=200' },
      { id: 'm6', title: 'Smartphones', itemsCount: 980, rating: 4.6, reviewCount: 25, apiCategory: 'smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=200&h=200' },
    ],
  },
  'Kids': {
    bannerColor: '#D2B4DE', 
    discount: '10%',
    bannerText: 'On Kids Eyewear',
    bannerImage: 'https://images.unsplash.com/photo-1519238396254-04660d3d573d?auto=format&fit=crop&q=80&w=400&h=300',
    categories: [
      { id: 'k1', title: 'Tops', itemsCount: 125, rating: 4, reviewCount: 3, apiCategory: 'tops', image: 'https://images.unsplash.com/photo-1519238128362-e61180f12d4d?auto=format&fit=crop&q=80&w=200&h=200' },
      { id: 'k2', title: 'Sports Accessories', itemsCount: 575, rating: 4.5, reviewCount: 9, apiCategory: 'sports-accessories', image: 'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?auto=format&fit=crop&q=80&w=200&h=200' },
      { id: 'k3', title: 'Motorcycle Toys', itemsCount: 250, rating: 4, reviewCount: 3, apiCategory: 'motorcycle', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=200&h=200' },
    ],
  }
};

export const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Ionicons 
        key={i} 
        name={i <= Math.round(rating) ? "star" : "star-outline"} 
        size={14} 
        color="#FDB813" 
        style={{ marginRight: 2 }}
      />
    );
  }
  return stars;
};

export default function CategoriesScreen({ activeTab, setActiveTab, searchQuery, navigateToProducts }) {
  
  const displayedCategories = TAB_CONFIGS[activeTab].categories.filter(cat => 
    cat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderBanner = () => {
    if (searchQuery.length > 0) return null; 
    const config = TAB_CONFIGS[activeTab];
    return (
      <View style={[styles.bannerContainer, { backgroundColor: config.bannerColor }]}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerPercent}>{config.discount} <Text style={styles.bannerDiscount}>Extra Discount</Text></Text>
          <Text style={styles.bannerSubtitle}>{config.bannerText}</Text>
          <TouchableOpacity style={styles.shopNowBtn}>
            <Text style={styles.shopNowText}>SHOP NOW</Text>
          </TouchableOpacity>
        </View>
        <Image source={{ uri: config.bannerImage }} style={styles.bannerImage} resizeMode="cover" />
      </View>
    );
  };

  const renderPagination = () => {
    if (searchQuery.length > 0) return null;
    return (
      <View style={styles.pagination}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    );
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => navigateToProducts(item)}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.productItemsCount}>{item.itemsCount} items</Text>
        <View style={styles.ratingContainer}>
          {renderStars(item.rating)}
          <Text style={styles.reviewCount}>({item.reviewCount})</Text>
        </View>
      </View>
      <View style={styles.seeAllBtn}>
        <Text style={styles.seeAllText}>See All</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.tabsContainer}>
        {TABS.map(tab => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity 
              key={tab}
              style={isActive ? styles.tabActive : styles.tabInactive}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={isActive ? styles.tabTextActive : styles.tabTextInactive}>{tab}</Text>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
      
      <FlatList
        data={displayedCategories}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {renderBanner()}
            {renderPagination()}
          </>
        }
        renderItem={renderCategoryItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: '#A0A0A0' }}>No categories found for "{searchQuery}"</Text>
          </View>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabActive: { flex: 1, alignItems: 'center' },
  tabInactive: { flex: 1, alignItems: 'center' },
  tabTextActive: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 5 },
  tabTextInactive: { fontSize: 16, fontWeight: '500', color: '#A0A0A0' },
  activeIndicator: { width: '100%', height: 3, backgroundColor: '#000', borderRadius: 2 },
  bannerContainer: {
    marginHorizontal: 20,
    borderRadius: 16,
    height: 140,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bannerContent: { flex: 1, padding: 20, justifyContent: 'center', zIndex: 1 },
  bannerPercent: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  bannerDiscount: { fontSize: 14, fontWeight: '500' },
  bannerSubtitle: { fontSize: 13, fontWeight: '600', color: '#000', marginTop: 4, marginBottom: 12 },
  shopNowBtn: { backgroundColor: '#fff', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, alignSelf: 'flex-start' },
  shopNowText: { fontSize: 10, fontWeight: 'bold', color: '#000' },
  bannerImage: { width: 150, height: '100%', position: 'absolute', right: 0, bottom: 0 },
  pagination: { flexDirection: 'row', justifyContent: 'center', marginTop: 15, marginBottom: 25 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#E0E0E0', marginHorizontal: 4 },
  dotActive: { width: 14, backgroundColor: '#000' },
  listContent: { paddingBottom: 20 },
  productItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 20 },
  imageContainer: { width: 70, height: 70, backgroundColor: '#F5F5F5', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  productImage: { width: 50, height: 50, resizeMode: 'contain' },
  productInfo: { flex: 1, justifyContent: 'center' },
  productTitle: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 4 },
  productItemsCount: { fontSize: 12, color: '#A0A0A0', marginBottom: 6 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  reviewCount: { fontSize: 12, color: '#A0A0A0', marginLeft: 4 },
  seeAllBtn: { padding: 5 },
  seeAllText: { fontSize: 14, color: '#A0A0A0', fontWeight: '500' },
});
