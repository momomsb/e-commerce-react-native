import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { loginUser } from '../../database/database';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const res = await loginUser(email, password);
    if (res.success) {
      // Pass user ID or details to profile
      navigation.replace('Profile', { userId: res.user.id });
    } else {
      Alert.alert('Erreur', res.error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.logoText}>QUICKBUY</Text>
          <Text style={styles.title}>Welcome to Login</Text>
          <Text style={styles.subtitle}>Please enter below details to sign in to your account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              placeholderTextColor="#888"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInBtn} onPress={handleSignIn}>
            <Text style={styles.signInBtnText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Or Login with</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={[styles.socialBtn, styles.googleBtn]}>
              <Text style={styles.googleBtnText}>G Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Didn't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
    letterSpacing: 2,
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    marginTop: 30,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 16,
    height: 50,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#000',
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 13,
  },
  signInBtn: {
    backgroundColor: '#000',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 30,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#888',
    fontSize: 12,
  },
  socialButtonsContainer: {
    marginBottom: 30,
  },
  socialBtn: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleBtnText: {
    color: '#DB4437',
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signupText: {
    color: '#666',
    fontSize: 14,
  },
  signupLink: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
  },
});
