import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

export default function CheckoutScreen({ deliveryInfo, setDeliveryInfo, isFetchingUser, cartTotal, handlePlaceOrder }) {
  return (
    <View style={styles.checkoutContainer}>
      {isFetchingUser ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={{marginTop: 10}}>Loading User X details...</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.checkoutScroll}>
          <View style={styles.checkoutSection}>
            <Text style={styles.checkoutSectionTitle}>Delivery Address (User X)</Text>
            <View style={styles.inputRow}>
              <TextInput style={[styles.checkoutInput, { flex: 1, marginRight: 10 }]} placeholder="First Name" value={deliveryInfo.firstName} onChangeText={(t) => setDeliveryInfo({...deliveryInfo, firstName: t})} />
              <TextInput style={[styles.checkoutInput, { flex: 1 }]} placeholder="Last Name" value={deliveryInfo.lastName} onChangeText={(t) => setDeliveryInfo({...deliveryInfo, lastName: t})} />
            </View>
            <TextInput style={styles.checkoutInput} placeholder="Street Address" value={deliveryInfo.address} onChangeText={(t) => setDeliveryInfo({...deliveryInfo, address: t})} />
            <View style={styles.inputRow}>
              <TextInput style={[styles.checkoutInput, { flex: 1, marginRight: 10 }]} placeholder="City" value={deliveryInfo.city} onChangeText={(t) => setDeliveryInfo({...deliveryInfo, city: t})} />
              <TextInput style={[styles.checkoutInput, { flex: 1 }]} placeholder="Phone" keyboardType="phone-pad" value={deliveryInfo.phone} onChangeText={(t) => setDeliveryInfo({...deliveryInfo, phone: t})} />
            </View>
          </View>
          <View style={styles.checkoutSection}>
            <Text style={styles.checkoutSectionTitle}>Payment Method (Simulated)</Text>
            <View style={styles.cardUI}>
              <TextInput style={styles.cardInput} placeholder="Card Number (e.g. 4242 4242 ...)" keyboardType="number-pad" maxLength={19} />
              <View style={styles.inputRow}>
                <TextInput style={[styles.cardInput, { flex: 1, marginRight: 10 }]} placeholder="MM/YY" maxLength={5} />
                <TextInput style={[styles.cardInput, { flex: 1 }]} placeholder="CVC" keyboardType="number-pad" maxLength={3} secureTextEntry />
              </View>
            </View>
          </View>
          <View style={styles.orderSummarySection}>
            <Text style={styles.checkoutSectionTitle}>Order Summary</Text>
            <View style={styles.summaryRow}><Text style={styles.summaryText}>Subtotal:</Text><Text style={styles.summaryText}>${cartTotal}</Text></View>
            <View style={styles.summaryRow}><Text style={styles.summaryText}>Delivery:</Text><Text style={styles.summaryText}>$5.00</Text></View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}><Text style={styles.summaryTotalText}>Total to Pay:</Text><Text style={styles.summaryTotalPrice}>${(parseFloat(cartTotal) + 5).toFixed(2)}</Text></View>
          </View>
        </ScrollView>
      )}
      {!isFetchingUser && (
        <View style={styles.placeOrderFooter}>
          <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder}>
            <Text style={styles.placeOrderBtnText}>PLACE ORDER</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  checkoutContainer: { flex: 1, backgroundColor: '#F9F9F9' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  checkoutScroll: { padding: 15, paddingBottom: 40 },
  checkoutSection: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  checkoutSectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  checkoutInput: { backgroundColor: '#F5F5F5', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12, fontSize: 15, marginBottom: 10, color: '#333' },
  cardUI: { backgroundColor: '#1C1C1C', borderRadius: 12, padding: 15 },
  cardInput: { backgroundColor: '#333', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12, fontSize: 15, marginBottom: 10, color: '#fff' },
  orderSummarySection: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 30 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryText: { fontSize: 15, color: '#666' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 10 },
  summaryTotalText: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  summaryTotalPrice: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  placeOrderFooter: { backgroundColor: '#fff', padding: 20, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  placeOrderBtn: { backgroundColor: '#1C1C1C', paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  placeOrderBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
});
