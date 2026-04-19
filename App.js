import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, Feather } from '@expo/vector-icons';

// Database
import { initDb, getFavorites, toggleFavoriteItem } from './src/database/database';

// Screens (Auth)
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MailVerificationScreen from './src/screens/MailVerificationScreen';

// Onboarding
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

// Main App Screens
import HomeScreen from './src/screens/HomeScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import SuccessScreen from './src/screens/SuccessScreen';

// Profile Screens
import ProfileScreen from './src/screens/ProfileScreen';
import ShippingAddressScreen from './src/screens/ShippingAddressScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  // GLOBAL STATES
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userId, setUserId] = useState(null);

  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phone: ''
  });

  const [isFetchingUser, setIsFetchingUser] = useState(false);

  // INIT DB
  useEffect(() => {
    const setup = async () => {
      try {
        const success = await initDb();
        if (success) {
          const favs = await getFavorites();
          setFavorites(favs);
        }
      } catch (e) {
        console.error("Database initialization failed", e);
      } finally {
        setDbInitialized(true);
      }
    };
    setup();
  }, []);

  const toggleFavorite = async (product) => {
    const newFavs = await toggleFavoriteItem(product, favorites);
    setFavorites(newFavs);
  };

  if (!dbInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // CART LOGIC
  const addToCart = (product, selectedSize) => {
    setCart(prev => [
      ...prev,
      { ...product, cartId: Math.random().toString(), selectedSize, quantity: 1 }
    ]);
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateCartQuantity = (cartId, delta) => {
    setCart(prev =>
      prev.map(item =>
        item.cartId === cartId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ).toFixed(2);

  // FETCH USER FOR CHECKOUT
  const fetchUserData = async () => {
    setIsFetchingUser(true);
    try {
      const response = await fetch('https://dummyjson.com/users/1');
      const userData = await response.json();
      setDeliveryInfo({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        address: userData.address?.address || '',
        city: userData.address?.city || '',
        phone: userData.phone || ''
      });
    } catch (error) {
      Alert.alert("Error", "Could not fetch user details.");
    } finally {
      setIsFetchingUser(false);
    }
  };

  const handlePlaceOrder = (navigation) => {
    if (!deliveryInfo.firstName || !deliveryInfo.address || !deliveryInfo.city) {
      Alert.alert('Missing Info', 'Please fill in your address.');
      return;
    }
    setCart([]);
    navigation.navigate('Success');
  };

  // === BOTTOM TAB NAVIGATOR ===
  function MainTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />;
            } else if (route.name === 'FavoritesTab') {
              return <Ionicons name={focused ? "heart" : "heart-outline"} size={size} color={color} />;
            } else if (route.name === 'CartTab') {
              return <Feather name="shopping-bag" size={size - 2} color={color} />;
            } else if (route.name === 'ProfileTab') {
              return <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#A0A0A0',
          tabBarItemStyle: {
            paddingVertical: 5,
          },
          tabBarStyle: {
            paddingTop: 5,
            minHeight: 60,
            borderTopWidth: 1,
            borderTopColor: '#F0F0F0',
            backgroundColor: '#fff',
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen name="Home" options={{ tabBarLabel: 'Home' }}>
          {(props) => (
            <HomeScreen
              {...props}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              cartCount={cart.length}
              navigateToProducts={(cat) => {
                setSelectedCategory(cat);
                props.navigation.navigate('Products');
              }}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="FavoritesTab"
          options={{
            tabBarLabel: 'Favorites',
            tabBarBadge: favorites.length > 0 ? favorites.length : undefined,
          }}
        >
          {(props) => (
            <FavoritesScreen
              {...props}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              navigateToProductDetail={(product) => {
                setSelectedProduct(product);
                props.navigation.navigate('ProductDetail');
              }}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="CartTab"
          options={{
            tabBarLabel: 'Cart',
            tabBarBadge: cart.length > 0 ? cart.length : undefined,
          }}
        >
          {(props) => (
            <CartScreen
              {...props}
              cart={cart}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
              cartTotal={cartTotal}
              navigateToCheckout={() => {
                fetchUserData();
                props.navigation.navigate('Checkout');
              }}
              navigateToScreen={(screen) => props.navigation.navigate(screen === 'Categories' ? 'Home' : screen)}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="ProfileTab" options={{ tabBarLabel: 'Profile' }}>
          {(props) => (
            <ProfileScreen
              {...props}
              route={{ ...props.route, params: { userId } }}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }

  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <StatusBar style="auto" />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Onboarding */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />

        {/* Auth */}
        <Stack.Screen name="SignIn">
          {(props) => (
            <SignInScreen
              {...props}
              onLoginSuccess={(id) => setUserId(id)}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MailVerification" component={MailVerificationScreen} />

        {/* Main App with Bottom Tabs */}
        <Stack.Screen name="Main" component={MainTabs} />

        {/* Screens accessible from tabs (pushed on top) */}
        <Stack.Screen name="Products">
          {(props) => (
            <ProductsScreen
              {...props}
              selectedCategory={selectedCategory}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              navigateToProductDetail={(product) => {
                setSelectedProduct(product);
                props.navigation.navigate("ProductDetail");
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="ProductDetail">
          {(props) => (
            <ProductDetailScreen
              {...props}
              selectedProduct={selectedProduct}
              selectedCategory={selectedCategory}
              navigateToScreen={(screen) => props.navigation.goBack()}
              addToCart={(size) => {
                addToCart(selectedProduct, size);
                props.navigation.navigate('Cart');
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Favorites">
          {(props) => (
            <FavoritesScreen
              {...props}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              navigateToProductDetail={(product) => {
                setSelectedProduct(product);
                props.navigation.navigate("ProductDetail");
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Cart">
          {(props) => (
            <CartScreen
              {...props}
              cart={cart}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
              cartTotal={cartTotal}
              navigateToCheckout={() => {
                fetchUserData();
                props.navigation.navigate("Checkout");
              }}
              navigateToScreen={(screen) => props.navigation.navigate(screen === 'Categories' ? 'Main' : screen)}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Checkout">
          {(props) => (
            <CheckoutScreen
              {...props}
              deliveryInfo={deliveryInfo}
              setDeliveryInfo={setDeliveryInfo}
              isFetchingUser={isFetchingUser}
              cartTotal={cartTotal}
              handlePlaceOrder={() => handlePlaceOrder(props.navigation)}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Success">
          {(props) => (
            <SuccessScreen
              {...props}
              navigateToScreen={(screen) => {
                props.navigation.navigate('Main');
              }}
            />
          )}
        </Stack.Screen>

        {/* Profile sub-screens */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ShippingAddress" component={ShippingAddressScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
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