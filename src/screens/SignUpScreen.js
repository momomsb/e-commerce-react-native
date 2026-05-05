import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../database/database';

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .required('Le nom est obligatoire'),
  email: Yup.string()
    .email('Adresse email invalide')
    .required("L'email est obligatoire"),
  password: Yup.string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .required('Le mot de passe est obligatoire'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
    .required('La confirmation du mot de passe est obligatoire'),
  ville: Yup.string()
    .required('La ville est obligatoire'),
  avenue: Yup.string(),
  telephone: Yup.string()
    .matches(/^[0-9+\-\s]+$/, 'Numéro de téléphone invalide')
    .min(8, 'Le numéro doit contenir au moins 8 chiffres')
    .required('Le téléphone est obligatoire'),
});

export default function SignUpScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async (values, { setFieldError, setSubmitting }) => {
    const { name, email, password, ville, avenue, telephone } = values;
    const res = await registerUser(name, email, password, ville, avenue, telephone);
    if (res.success) {
      navigation.navigate('MailVerification', { email });
    } else {
      if (res.error.includes('email')) {
        setFieldError('email', res.error);
      } else {
        Alert.alert('Erreur', res.error);
      }
      setSubmitting(false);
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

          <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '', ville: '', avenue: '', telephone: '' }}
            validationSchema={SignUpSchema}
            onSubmit={handleSignUp}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.form}>
                <Text style={styles.sectionHeader}>Personal Info</Text>
                <View style={[styles.inputContainer, touched.name && errors.name && styles.inputError]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#888"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                  />
                </View>
                {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                <View style={[styles.inputContainer, touched.email && errors.email && styles.inputError]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                </View>
                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <View style={[styles.inputContainer, touched.password && errors.password && styles.inputError]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry={!showPassword}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
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
                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <View style={[styles.inputContainer, touched.confirmPassword && errors.confirmPassword && styles.inputError]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#888"
                    secureTextEntry={!showConfirmPassword}
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                  />
                  <TouchableOpacity 
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.iconContainer}
                  >
                    <Ionicons 
                      name={showConfirmPassword ? 'eye-off' : 'eye'} 
                      size={24} 
                      color="#888" 
                    />
                  </TouchableOpacity>
                </View>
                {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                <Text style={styles.sectionHeader}>Shipping Address</Text>
                <View style={[styles.inputContainer, touched.ville && errors.ville && styles.inputError]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Ville (e.g. Paris)"
                    placeholderTextColor="#888"
                    value={values.ville}
                    onChangeText={handleChange('ville')}
                    onBlur={handleBlur('ville')}
                  />
                </View>
                {touched.ville && errors.ville && <Text style={styles.errorText}>{errors.ville}</Text>}

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Avenue / Street (Optional)"
                    placeholderTextColor="#888"
                    value={values.avenue}
                    onChangeText={handleChange('avenue')}
                    onBlur={handleBlur('avenue')}
                  />
                </View>

                <View style={[styles.inputContainer, touched.telephone && errors.telephone && styles.inputError]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Téléphone"
                    placeholderTextColor="#888"
                    keyboardType="phone-pad"
                    value={values.telephone}
                    onChangeText={handleChange('telephone')}
                    onBlur={handleBlur('telephone')}
                  />
                </View>
                {touched.telephone && errors.telephone && <Text style={styles.errorText}>{errors.telephone}</Text>}

                <TouchableOpacity style={styles.signUpBtn} onPress={handleSubmit}>
                  <Text style={styles.signUpBtnText}>SIGN UP</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>

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
  inputContainer: { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, marginBottom: 4, height: 50, flexDirection: 'row', alignItems: 'center' },
  inputError: { borderColor: '#e74c3c' },
  input: { flex: 1, paddingHorizontal: 16, fontSize: 14, color: '#000' },
  iconContainer: { padding: 10 },
  errorText: { color: '#e74c3c', fontSize: 12, marginBottom: 10, marginLeft: 4 },
  signUpBtn: { backgroundColor: '#000', height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  signUpBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  footer: { marginTop: 30, alignItems: 'center' },
  loginContainer: { flexDirection: 'row' },
  loginText: { color: '#666', fontSize: 14 },
  loginLink: { color: '#000', fontWeight: '700', fontSize: 14 }
});
