import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { renderStars } from './CategoriesScreen';

const { height } = Dimensions.get('window');
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export default function ProductDetailScreen({ selectedProduct, selectedCategory, navigateToScreen, addToCart }) {
  const [selectedSize, setSelectedSize] = useState('S');

  if (!selectedProduct) return null;

  const mainImage = selectedProduct.images && selectedProduct.images.length > 0 
    ? selectedProduct.images[0] 
    : selectedProduct.thumbnail;

  return (
    <View style={styles.detailScreenContainer}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => navigateToScreen('Products')} style={styles.detailHeaderBtn}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.detailHeaderTitle}>{selectedCategory?.title || 'Product'}</Text>
        <TouchableOpacity style={styles.detailHeaderBtn}>
          <Feather name="share-2" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.detailImageWrapper}>
        <Image source={{ uri: mainImage }} style={styles.detailMainImage} />
      </View>

      <View style={styles.bottomSheetContainer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.bottomSheetScroll}>
          <View style={styles.dragHandleContainer}>
            <View style={styles.dragHandle} />
          </View>

          <View style={styles.detailContent}>
            <Text style={styles.sheetSectionTitle}>Select Size</Text>
            <View style={styles.sizesRow}>
              {SIZES.map(size => (
                <TouchableOpacity 
                  key={size} 
                  style={[styles.sizeBubble, selectedSize === size && styles.sizeBubbleSelected]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[styles.sizeBubbleText, selectedSize === size && styles.sizeBubbleTextSelected]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.sizeInfoBtn}>
              <Text style={styles.sizeInfoTitle}>Size info</Text>
              <Feather name="chevron-right" size={20} color="#000" />
            </TouchableOpacity>

            <View style={styles.detailInfoDivider} />

            <Text style={styles.detailProductPrice}>${selectedProduct.price}</Text>
            <Text style={styles.detailProductTitle}>{selectedProduct.title}</Text>
            <Text style={styles.detailProductBrand}>{selectedProduct.brand || 'Premium Brand'}</Text>
            
            <Text style={styles.sheetSectionTitle}>Description</Text>
            <Text style={styles.detailDescriptionText}>{selectedProduct.description}</Text>

            {selectedProduct.reviews && selectedProduct.reviews.length > 0 && (
              <View style={styles.reviewsWrapper}>
                <Text style={styles.sheetSectionTitle}>Reviews ({selectedProduct.reviews.length})</Text>
                {selectedProduct.reviews.map((review, idx) => (
                  <View key={idx} style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                      <Text style={styles.reviewerName}>{review.reviewerName}</Text>
                      <View style={styles.reviewStars}>
                        {renderStars(review.rating)}
                      </View>
                    </View>
                    <Text style={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</Text>
                    <Text style={styles.reviewCommentText}>{review.comment}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.addToCartWrapper}>
          <TouchableOpacity style={styles.addToCartSuperBtn} onPress={() => addToCart(selectedSize)}>
            <Text style={styles.addToCartSuperBtnText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailScreenContainer: { flex: 1, backgroundColor: '#EBEBEB' },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 15, paddingBottom: 10, zIndex: 10 },
  detailHeaderBtn: { padding: 5 },
  detailHeaderTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  detailImageWrapper: { height: height * 0.45, width: '100%', justifyContent: 'center', alignItems: 'center', padding: 20 },
  detailMainImage: { width: '90%', height: '90%', resizeMode: 'contain' },
  bottomSheetContainer: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, shadowColor: '#000', shadowOffset: { width: 0, height: -5 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 10 },
  bottomSheetScroll: { paddingBottom: 100 },
  dragHandleContainer: { width: '100%', alignItems: 'center', paddingVertical: 15 },
  dragHandle: { width: 40, height: 5, backgroundColor: '#DCDCDC', borderRadius: 3 },
  detailContent: { paddingHorizontal: 25 },
  sheetSectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 15, textAlign: 'center' },
  sizesRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  sizeBubble: { width: 50, height: 40, borderRadius: 8, borderWidth: 1, borderColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  sizeBubbleSelected: { backgroundColor: '#1C1C1C', borderColor: '#1C1C1C' },
  sizeBubbleText: { fontSize: 14, fontWeight: '600', color: '#888' },
  sizeBubbleTextSelected: { color: '#fff' },
  sizeInfoBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sizeInfoTitle: { fontSize: 14, fontWeight: '600', color: '#333' },
  detailInfoDivider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 15 },
  detailProductPrice: { fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 5, textAlign: 'center' },
  detailProductTitle: { fontSize: 20, fontWeight: '600', color: '#333', marginBottom: 5, textAlign: 'center' },
  detailProductBrand: { fontSize: 14, color: '#A0A0A0', marginBottom: 20, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 },
  detailDescriptionText: { fontSize: 15, color: '#666', lineHeight: 22, marginBottom: 30, textAlign: 'center' },
  reviewsWrapper: { marginTop: 10 },
  reviewCard: { backgroundColor: '#F9F9F9', padding: 15, borderRadius: 12, marginBottom: 15 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  reviewerName: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  reviewStars: { flexDirection: 'row' },
  reviewDate: { fontSize: 12, color: '#A0A0A0', marginBottom: 8 },
  reviewCommentText: { fontSize: 14, color: '#555', lineHeight: 20 },
  addToCartWrapper: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 10, paddingBottom: Platform.OS === 'ios' ? 25 : 15, borderTopWidth: 1, borderTopColor: '#F5F5F5' },
  addToCartSuperBtn: { backgroundColor: '#1C1C1C', height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  addToCartSuperBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
});
