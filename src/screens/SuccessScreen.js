import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SuccessScreen({ navigateToScreen }) {
  return (
    <View style={styles.successContainer}>
      <View style={styles.successTopDeco}>
         <View style={styles.decoCircle1} />
         <View style={styles.decoCircle2} />
      </View>
      <View style={styles.successContent}>
        <View style={styles.successIconCircle}>
          <Ionicons name="checkmark" size={70} color="#fff" />
        </View>
        <Text style={styles.successTitle}>Hooray! 🎉</Text>
        <Text style={styles.successSubtitle}>Your Order is in Delivery</Text>
        <Text style={styles.successText}>We are preparing your items. A confirmation email is being sent to you right now!</Text>
      </View>
      <View style={styles.placeOrderFooter}>
        <TouchableOpacity style={styles.continueShoppingBtnActive} onPress={() => navigateToScreen('Categories')}>
          <Text style={styles.continueShoppingBtnTextActive}>CONTINUE SHOPPING</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  successContainer: { flex: 1, backgroundColor: '#F0FFF4', justifyContent: 'space-between', overflow: 'hidden' },
  successTopDeco: { position: 'absolute', top: -80, right: -40 },
  decoCircle1: { width: 250, height: 250, borderRadius: 125, backgroundColor: '#38A169', opacity: 0.15, position: 'absolute', top: 20, right: 20 },
  decoCircle2: { width: 150, height: 150, borderRadius: 75, backgroundColor: '#48BB78', opacity: 0.25, position: 'absolute', top: 70, right: 70 },
  successContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, zIndex: 10 },
  successIconCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#38A169', justifyContent: 'center', alignItems: 'center', marginBottom: 30, shadowColor: '#38A169', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 15, elevation: 10 },
  successTitle: { fontSize: 34, fontWeight: '900', color: '#276749', marginBottom: 8 },
  successSubtitle: { fontSize: 18, fontWeight: '700', color: '#2F855A', marginBottom: 15 },
  successText: { fontSize: 16, color: '#4A5568', textAlign: 'center', lineHeight: 24 },
  placeOrderFooter: { padding: 20, paddingBottom: 40 },
  continueShoppingBtnActive: { backgroundColor: '#38A169', paddingVertical: 18, borderRadius: 16, alignItems: 'center', shadowColor: '#38A169', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 8 },
  continueShoppingBtnTextActive: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
});
