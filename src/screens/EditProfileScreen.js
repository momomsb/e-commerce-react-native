import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getUserById, updateUserDetails } from '../database/database';

export default function EditProfileScreen({ route, navigation }) {
  const { userId } = route.params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserById(userId);
      if (userData) {
        setName(userData.name || 'User');
        setEmail(userData.email || '');
        setPassword(userData.password || '');
      }
      setLoading(false);
    };
    fetchUser();
  }, [userId]);

  const handleSave = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir l\'email et le mot de passe.');
      return;
    }
    
    setSaving(true);
    const res = await updateUserDetails(userId, email, password);
    setSaving(false);

    if (res.success) {
      Alert.alert('Succès', 'Profil mis à jour avec succès !');
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
          <Text style={styles.headerTitle}>Paramètres du compte</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.profileHeaderCard}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{name ? name.charAt(0).toUpperCase() : 'B'}</Text>
              <View style={styles.editAvatarBadge}>
                <Ionicons name="camera" size={14} color="#fff" />
              </View>
            </View>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileEmail}>{email}</Text>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Détails de sécurité</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Adresse Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholderTextColor="#aaa"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Mot de passe</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#aaa"
                />
              </View>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#888" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.warningBox}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#4caf50" />
            <Text style={styles.warningText}>
              Vos données sont chiffrées et sauvegardées en toute sécurité sur votre appareil via SQLite.
            </Text>
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
                <Ionicons name="save-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.saveBtnText}>Enregistrer les modifications</Text>
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
  profileHeaderCard: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  avatarText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  editAvatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#DB4437', // A nice accent color
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F8F9FA',
  },
  profileName: { fontSize: 24, fontWeight: 'bold', color: '#111', marginBottom: 4 },
  profileEmail: { fontSize: 14, color: '#777' },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 20,
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
    padding: 0,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  warningText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 13,
    color: '#2e7d32',
    lineHeight: 18,
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
