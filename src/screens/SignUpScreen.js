import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { registerUser } from '../database/database';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [ville, setVille] = useState('');
  const [avenue, setAvenue] = useState('');
  const [telephone, setTelephone] = useState('');

  const handleSignUp = async () => {
    if (!name || !email || !password || !ville || !telephone) {
      Alert.alert('Erreur', 'Veuillez remplir les champs obligatoires (Nom, Email, Mot de passe, Ville, Téléphone).');
      return;
    }

    const res = await registerUser(name, email, password, ville, avenue, telephone);
    if (res.success) {
      navigation.navigate('MailVerification', { email });
    } else {
      Alert.alert('Erreur', res.error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>{'< Back'}</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.logoText}>QUICKBUY</Text>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Please fill in your details and shipping info</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.sectionHeader}>Personal Info</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.iconContainer}
              >
                <Ionicons 
                  name={showPassword ? 'eye-off' : 'eye'} 
                  size={24} 
                  color="#888" 
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionHeader}>Shipping Address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Ville (e.g. Paris)"
                placeholderTextColor="#888"
                value={ville}
                onChangeText={setVille}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Avenue / Street (Optional)"
                placeholderTextColor="#888"
                value={avenue}
                onChangeText={setAvenue}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Téléphone"
                placeholderTextColor="#888"
                keyboardType="phone-pad"
                value={telephone}
                onChangeText={setTelephone}
              />
            </View>

            <TouchableOpacity style={styles.signUpBtn} onPress={handleSignUp}>
              <Text style={styles.signUpBtnText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 24, paddingBottom: 40 },
  backButton: { marginTop: 10, marginBottom: 20, alignSelf: 'flex-start' },
  backButtonText: { fontSize: 16, color: '#000' },
  header: { alignItems: 'center', marginTop: 10 },
  logoText: { fontSize: 28, fontWeight: 'bold', fontStyle: 'italic', letterSpacing: 2, marginBottom: 30 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8, color: '#000' },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center' },
  form: { marginTop: 20 },
  sectionHeader: { fontSize: 16, fontWeight: '600', color: '#000', marginBottom: 10, marginTop: 10 },
  inputContainer: { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, marginBottom: 14, height: 50, flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, paddingHorizontal: 16, fontSize: 14, color: '#000' },
  iconContainer: { padding: 10 },
  signUpBtn: { backgroundColor: '#000', height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  signUpBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  footer: { marginTop: 30, alignItems: 'center' },
  loginContainer: { flexDirection: 'row' },
  loginText: { color: '#666', fontSize: 14 },
  loginLink: { color: '#000', fontWeight: '700', fontSize: 14 }
});
