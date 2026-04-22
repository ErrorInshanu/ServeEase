import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

export default function Categories() {
    const router = useRouter();

    // 🔥 animation value
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

            {/* 🔥 Animated Gradient Background */}
            <Animated.View style={[styles.gradientWrapper, animatedStyle]}>
                <LinearGradient
                   colors={['#FFFFFF', '#9370DB']}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>

            {/* 🔥 Title */}
            <Text style={styles.title}>Select Category</Text>

            {/* 🏠 Home Services */}
<TouchableOpacity style={styles.card}
  onPress={() => router.push({
    pathname: "/services",
    params: { category: "Home Services" }
  })}
>
  <Text style={styles.cardText}>🏠 Home Services</Text>
</TouchableOpacity>

{/* 🚗 Vehicle Services */}
<TouchableOpacity style={styles.card}
  onPress={() => router.push({
    pathname: "/services",
    params: { category: "Vehicle Services" }
  })}
>
  <Text style={styles.cardText}>🚗 Vehicle Services</Text>
</TouchableOpacity>

{/* 🧊 Appliance Services */}
<TouchableOpacity style={styles.card}
  onPress={() => router.push({
    pathname: "/services",
    params: { category: "Appliance Services" }
  })}
>
  <Text style={styles.cardText}>🧊 Appliance Services</Text>
</TouchableOpacity>

{/* 💄 Personal Services */}
<TouchableOpacity style={styles.card}
  onPress={() => router.push({
    pathname: "/services",
    params: { category: "Personal Services" }
  })}
>
  <Text style={styles.cardText}>💄 Personal Services</Text>
</TouchableOpacity>

{/* 📦 Moving & Packing */}
<TouchableOpacity style={styles.card}
  onPress={() => router.push({
    pathname: "/services",
    params: { category: "Moving & Packing" }
  })}
>
  <Text style={styles.cardText}>📦 Moving & Packing</Text>
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