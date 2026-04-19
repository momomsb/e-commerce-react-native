import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getUserById } from '../database/database';

export default function ProfileScreen({ route, navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { userId } = route.params || {};

  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        if (userId) {
          const userData = await getUserById(userId);
          setUser(userData);
        }
        setLoading(false);
      };
      fetchUser();
    }, [userId])
  );

  const handleLogout = () => {
    navigation.replace('SignIn');
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Card Overlay */}
        <View style={styles.profileCard}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'B'}
            </Text>
          </View>
          <Text style={styles.userName}>{user ? user.name : 'QuickBuy User'}</Text>
          <Text style={styles.userEmail}>{user ? user.email : 'Explore the best products'}</Text>
          
          <View style={styles.addressBadge}>
            <Ionicons name="location" size={14} color="#666" style={{ marginRight: 4 }} />
            <Text style={styles.addressBadgeText}>
              {user?.ville ? `${user.ville}${user.avenue ? `, ${user.avenue}` : ''}` : 'Adresse non renseignée'}
            </Text>
          </View>
        </View>

        {/* Options List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dashboard</Text>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ShippingAddress', { userId })}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#e8f5e9' }]}>
                 <Ionicons name="location-outline" size={20} color="#43a047" />
              </View>
              <Text style={styles.menuItemText}>Shipping Address</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Setup</Text>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EditProfile', { userId })}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#f3e5f5' }]}>
                 <Ionicons name="settings-outline" size={20} color="#8e24aa" />
              </View>
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]} onPress={handleLogout}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#ffebee' }]}>
                 <Ionicons name="log-out-outline" size={20} color="#d32f2f" />
              </View>
              <Text style={[styles.menuItemText, { color: '#d32f2f' }]}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Lighter elegant gray
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#000', // Matches the QuickBuy black theme
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  addressBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addressBadgeText: {
    color: '#555',
    fontSize: 13,
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#999',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
