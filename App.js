import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

// Import Database Initializer
import { initDB } from './src/database/database';

// Import Screens
import SignInScreen from './src/screens/auth/SignInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import MailVerificationScreen from './src/screens/auth/MailVerificationScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import ShippingAddressScreen from './src/screens/profile/ShippingAddressScreen';
import EditProfileScreen from './src/screens/profile/EditProfileScreen';

// Import Onboarding Screens
import SplashScreen from './src/screens/onboarding/SplashScreen';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const setup = async () => {
      try {
        await initDB();
        setDbInitialized(true);
      } catch (e) {
        console.error("Database initialization failed", e);
      }
    };
    setup();
  }, []);

  if (!dbInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MailVerification" component={MailVerificationScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ShippingAddress" component={ShippingAddressScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});
