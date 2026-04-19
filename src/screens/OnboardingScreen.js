import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Search Your Favorite Product',
    description: 'Explore our vast catalogue to find the best materials for your needs in everyday short time.',
    iconName: 'search-outline',
  },
  {
    id: '2',
    title: 'Shopping And Add to Cart Product',
    description: 'Select your preferred products and easily add them to your cart for a seamless shopping experience.',
    iconName: 'cart-outline',
  },
  {
    id: '3',
    title: 'Secure Online Payment Option',
    description: 'Proceed to checkout with our secure and encrypted payment gateways for a safe transaction.',
    iconName: 'card-outline',
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // Navigate to SignIn
  const handleSkip = () => {
    navigation.replace('SignIn');
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleSkip();
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slideContainer}>
        <View style={styles.imagePlaceholder}>
          <Ionicons name={item.iconName} size={100} color="#333" />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={slides}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index.toString()}
              style={[
                styles.dot,
                currentIndex === index ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity 
          style={styles.actionBtn} 
          onPress={handleNext}
        >
          <Text style={styles.actionBtnText}>
            {currentIndex === slides.length - 1 ? 'Start' : 'Skip'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slideContainer: {
    width,
    alignItems: 'center',
    padding: 24,
    paddingTop: 80,
  },
  imagePlaceholder: {
    width: 250,
    height: 300,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    // Add subtle shadow and border layout similar to ZOYOTA mockups
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 30,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: '#000',
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#ccc',
  },
  actionBtn: {
    width: '100%',
    backgroundColor: '#000',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
