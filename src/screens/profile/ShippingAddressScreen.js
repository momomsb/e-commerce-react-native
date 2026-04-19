import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getUserById, updateUserAddress } from '../../database/database';

export default function ShippingAddressScreen({ route, navigation }) {
  const { userId } = route.params;

  const [name, setName] = useState('');
  const [ville, setVille] = useState('');
  const [avenue, setAvenue] = useState('');
  const [telephone, setTelephone] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserById(userId);
      if (userData) {
        setName(userData.name || 'User');
        setVille(userData.ville || '');
        setAvenue(userData.avenue || '');
        setTelephone(userData.telephone || '');
      }
      setLoading(false);
    };
    fetchUser();
  }, [userId]);

  const handleSave = async () => {
    setSaving(true);
    const res = await updateUserAddress(userId, ville, avenue, telephone);
    setSaving(false);

    if (res.success) {
      Alert.alert('Succès', 'Adresse de livraison mise à jour !');
      navigation.goBack();
    } else {
      Alert.alert('Erreur', res.error);
    }
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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Adresse de livraison</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.infoCard}>
            <View style={styles.iconCircle}>
              <Ionicons name="cube-outline" size={32} color="#000" />
            </View>
            <View style={styles.infoTexts}>
              <Text style={styles.infoNameText}>Bonjour, {name}</Text>
              <Text style={styles.infoDescText}>Vérifiez que vos informations sont exactes pour assurer la bonne livraison de vos commandes Boutique.</Text>
            </View>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Détails de livraison</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="business-outline" size={20} color="#888" style={styles.inputIcon} />
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Ville</Text>
                <TextInput
                  style={styles.input}
                  value={ville}
                  onChangeText={setVille}
                  placeholder="Ex: Rabat"
                  placeholderTextColor="#aaa"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="map-outline" size={20} color="#888" style={styles.inputIcon} />
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Avenue / Rue</Text>
                <TextInput
                  style={styles.input}
                  value={avenue}
                  onChangeText={setAvenue}
                  placeholder="Ex: Av Zaraktouni"
                  placeholderTextColor="#aaa"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color="#888" style={styles.inputIcon} />
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Téléphone</Text>
                <TextInput
                  style={styles.input}
                  value={telephone}
                  onChangeText={setTelephone}
                  placeholder="Ex: +212 06 12 34 56 78"
                  placeholderTextColor="#aaa"
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="checkmark-circle-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.saveBtnText}>Enregistrer l'adresse</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  centered: { justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 10,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#111' },
  content: { padding: 24, paddingBottom: 40 },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#e3f2fd',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#bbdefb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoTexts: { flex: 1 },
  infoNameText: { fontSize: 18, fontWeight: 'bold', color: '#1565c0', marginBottom: 4 },
  infoDescText: { fontSize: 13, color: '#1976d2', lineHeight: 18 },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  inputIcon: { marginRight: 16 },
  inputWrapper: { flex: 1 },
  label: { fontSize: 12, fontWeight: '600', color: '#888', marginBottom: 4 },
  input: {
    fontSize: 15,
    color: '#111',
    fontWeight: '500',
    padding: 0, // removes default android padding
  },
  saveBtn: {
    flexDirection: 'row',
    backgroundColor: '#000',
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
});
