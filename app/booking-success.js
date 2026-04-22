import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

export default function BookingSuccess() {
  const { service, provider, price } = useLocalSearchParams();
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

      {/* 🔥 Background */}
      <Animated.View style={[styles.gradientWrapper, animatedStyle]}>
        <LinearGradient
         colors={['#FFFFFF', '#9370DB']}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* ✅ Success Message */}
      <Text style={styles.title}>🎉 Booking Successful</Text>

      {/* 📦 Details */}
      <View style={styles.card}>
        <Text style={styles.text}>Service: {service}</Text>
        <Text style={styles.text}>Provider: {provider}</Text>
        <Text style={styles.text}>Price: {price}</Text>
      </View>

      {/* 🔥 Go Home Button */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>

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
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 14,
    marginBottom: 30,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
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