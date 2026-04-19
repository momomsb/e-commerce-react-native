import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function MailVerificationScreen({ route, navigation }) {
  // We get the email passed from SignUpScreen
  const { email } = route.params || { email: 'your email' };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'< Back'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Mail Verification</Text>
        <Text style={styles.subtitle}>
          We have sent a verification email to
        </Text>
        <Text style={styles.emailText}>{email}</Text>
        <Text style={styles.subtitle}>
          Please check your inbox and verify your email to continue.
        </Text>

        <TouchableOpacity 
          style={styles.continueBtn} 
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.continueBtnText}>Continue to Sign In</Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the email? </Text>
          <TouchableOpacity onPress={() => alert('Verification email resent!')}>
            <Text style={styles.resendLink}>Resend Mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  backButton: {
    paddingVertical: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  emailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
  },
  continueBtn: {
    backgroundColor: '#000',
    height: 50,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  resendText: {
    color: '#666',
    fontSize: 14,
  },
  resendLink: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
  },
});
