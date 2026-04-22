import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

export default function Bookings() {

  const [bookings, setBookings] = useState([]);

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

  // ✅ Load bookings from AsyncStorage
  useFocusEffect(
    useCallback(() => {
      const loadBookings = async () => {
        try {
          const data = await AsyncStorage.getItem("bookings");
          if (data) {
            setBookings(JSON.parse(data));
          } else {
            setBookings([]);
          }
        } catch (e) {
          console.log("Error loading bookings", e);
        }
      };

      loadBookings();
    }, [])
  );

  return (
    <View style={styles.container}>

      {/* 🔥 Background */}
      <Animated.View style={[styles.gradientWrapper, animatedStyle]}>
        <LinearGradient
        colors={['#FFFFFF', '#9370DB']}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* 🔥 Title */}
      <Text style={styles.title}>My Bookings</Text>

      {/* 🔥 Booking List */}
      {bookings.length === 0 ? (
        <Text style={{ color: '#aaa', textAlign: 'center' }}>
          No bookings yet
        </Text>
      ) : (
        bookings.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.name}>{item.service}</Text>
              <Text style={styles.info}>Provider: {item.provider}</Text>
              <Text style={styles.info}>Price: {item.price}</Text>
              <Text style={styles.status}>Status: Booked ✅</Text>
          
              {/* 🔥 Cancel Button */}
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={async () => {
                  try {
                    const updated = bookings.filter((_, i) => i !== index);
                    setBookings(updated);
                    await AsyncStorage.setItem("bookings", JSON.stringify(updated));
                  } catch (e) {
                    console.log("Error deleting booking", e);
                  }
                }}
              >
                <Text style={styles.cancelText}>Cancel Booking</Text>
              </TouchableOpacity>
          
            </View>
          ))
      )}

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
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 14,
    marginBottom: 18,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
  },
  info: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },
  status: {
    color: '#4CAF50',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#ff4d4d33', // light red background
  },
  
  cancelText: {
    color: '#ff4d4d',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
});