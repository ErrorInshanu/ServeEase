import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';

export default function ServiceDetail() {
  const { service, category } = useLocalSearchParams();
  const router = useRouter();
  // 🔥 animation
  const opacity = useSharedValue(0.6);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>

      {/* 🔥 Animated Background */}
      <Animated.View style={[styles.gradientWrapper, animatedStyle]}>
        <LinearGradient
         colors={['#FFFFFF', '#9370DB']}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* 🔥 Title */}
      <Text style={styles.title}>{service}</Text>

      {/* 🔥 Category */}
      <Text style={styles.category}>{category}</Text>

      {/* 🔥 Provider Card */}
      <ScrollView showsVerticalScrollIndicator={false}>

        {[
          { id: 1, name: "Rahul Sharma", phone: "9876543210", rating: "4.5", price: "₹300" },
          { id: 2, name: "Amit Verma", phone: "9123456780", rating: "4.2", price: "₹250" },
          { id: 3, name: "Suresh Yadav", phone: "9988776655", rating: "4.7", price: "₹350" },
        ].map((item) => (
          <View key={item.id} style={styles.card}>

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.info}>📞 {item.phone}</Text>
            <Text style={styles.info}>⭐ {item.rating}</Text>
            <Text style={styles.info}>💰 {item.price}</Text>

            {/* 🔥 Book Button per provider */}
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                try {
                  const newBooking = {
                    service: service,
                    provider: item.name,
                    price: item.price,
                  };
              
                  const existing = await AsyncStorage.getItem("bookings");
                  const bookings = existing ? JSON.parse(existing) : [];
              
                  bookings.push(newBooking);
              
                  await AsyncStorage.setItem("bookings", JSON.stringify(bookings));
              
                  router.push({
                    pathname: "/booking-success",
                    params: newBooking
                  });
              
                } catch (e) {
                  console.log("Error saving booking", e);
                }
              }}
            >
              <Text style={styles.buttonText}>Book Now</Text>
            </TouchableOpacity>

          </View>
        ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    padding: 20,
    justifyContent: 'center',
  },
  gradientWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  category: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 14,
    marginBottom: 30,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  info: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});