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
import { servicesData } from "./servicesdata";

export default function Services() {
    const router = useRouter();
  const { category } = useLocalSearchParams();

  const services = servicesData[category] || [];

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
          colors={['#0D0D0D', '#4CAF50']}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* 🔥 Title */}
      <Text style={styles.title}>{category}</Text>

      {/* 🔥 Services List */}
      {services.map((item) => (
       <TouchableOpacity 
       key={item.id} 
       style={styles.card}
       onPress={() => router.push({
         pathname: "/service-detail",
         params: { 
           service: item.name,
           category: category
         }
       })}
     >
          <Text style={styles.cardText}>{item.name}</Text>
        </TouchableOpacity>
      ))}

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
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});