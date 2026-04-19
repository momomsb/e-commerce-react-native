import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function CartScreen({ cart, updateCartQuantity, removeFromCart, navigateToCheckout, navigateToScreen, cartTotal }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCart = cart.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <Text style={styles.headerCount}>{cart.length} items</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color="#A0A0A0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search in cart..."
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
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="shopping-bag" size={60} color="#E0E0E0" />
          <Text style={styles.emptyText}>Your cart is empty!</Text>
          <Text style={styles.emptySubtext}>Add items to start shopping.</Text>
          <TouchableOpacity style={styles.continueShoppingBtn} onPress={() => navigateToScreen('Categories')}>
            <Text style={styles.continueShoppingText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={filteredCart}
            keyExtractor={(item) => item.cartId}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.thumbnail }} style={styles.cartImage} />
                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.cartItemSize}>Size: {item.selectedSize}</Text>
                  <Text style={styles.cartItemPrice}>${item.price}</Text>
                </View>
                <View style={styles.cartControls}>
                  <TouchableOpacity onPress={() => removeFromCart(item.cartId)}>
                    <Feather name="trash-2" size={20} color="#FF6B6B" style={styles.trashIcon} />
                  </TouchableOpacity>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => updateCartQuantity(item.cartId, -1)}>
                      <Feather name="minus" size={16} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => updateCartQuantity(item.cartId, 1)}>
                      <Feather name="plus" size={16} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            ListEmptyComponent={
              searchQuery.length > 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No items match "{searchQuery}"</Text>
                </View>
              ) : null
            }
          />
          <View style={styles.cartFooter}>
            <View style={styles.cartTotalRow}>
              <Text style={styles.cartTotalLabel}>Total Amount:</Text>
              <Text style={styles.cartTotalPrice}>${cartTotal}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutBtn} onPress={navigateToCheckout}>
              <Text style={styles.checkoutBtnText}>PROCEED TO CHECKOUT</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9F9F9' },
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
  continueShoppingBtn: { backgroundColor: '#000', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  continueShoppingText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  listContent: { paddingBottom: 10 },
  cartItem: {
    flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 15, marginTop: 15,
    borderRadius: 12, padding: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 5, elevation: 2,
  },
  cartImage: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#F5F5F5', resizeMode: 'contain' },
  cartItemInfo: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  cartItemTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 5 },
  cartItemSize: { fontSize: 14, color: '#888', marginBottom: 5 },
  cartItemPrice: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  cartControls: { justifyContent: 'space-between', alignItems: 'flex-end' },
  trashIcon: { padding: 5 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 20, marginTop: 10 },
  qtyBtn: { padding: 8 },
  qtyText: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 5 },
  cartFooter: { backgroundColor: '#fff', padding: 20, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  cartTotalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  cartTotalLabel: { fontSize: 16, color: '#888' },
  cartTotalPrice: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  checkoutBtn: { backgroundColor: '#000', paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  checkoutBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
