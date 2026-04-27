import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

export default function Profile() {

    const [image, setImage] = useState(null);
    const [user, setUser] = useState(null);

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

    // ✅ Load user data
    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await AsyncStorage.getItem("user");
                if (data) {
                    setUser(JSON.parse(data));
                }
            } catch (e) {
                console.log("Error loading user", e);
            }
        };

        loadUser();
    }, []);

    // ✅ Pick image
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>

            {/* 🔥 Background */}
            <Animated.View style={[styles.gradientWrapper, animatedStyle]}>
                <LinearGradient
                    colors={['#0D0D0D', '#4CAF50']}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>

            {/* 🔥 Title */}
            <Text style={styles.title}>My Profile</Text>

            {/* 🔥 Profile Image */}
            <View style={styles.imageWrapper}>
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={
                            image
                                ? { uri: image }
                                : require('../../../assets/images/service2.png')
                        }
                        style={styles.profileImage}
                    />
                </TouchableOpacity>

                {/* 🔥 Plus Button */}
                <TouchableOpacity style={styles.plusButton} onPress={pickImage}>
                    <Text style={styles.plusText}>+</Text>
                </TouchableOpacity>
            </View>

            {/* 🔥 Profile Info */}
            <View style={styles.card}>
                {user ? (
                    <>
                        <Text style={styles.text}>Name: {user.name}</Text>
                        <Text style={styles.text}>Email: {user.email}</Text>
                        <Text style={styles.text}>Phone: {user.phone}</Text>
                        <Text style={styles.text}>Gender: {user.gender}</Text>
                        <Text style={styles.text}>Age: {user.age}</Text>

                        {/* 🔥 Update Button */}
                        <TouchableOpacity style={styles.updateButton} onPress={pickImage}>
                            <Text style={styles.updateText}>Update Profile Picture</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <Text style={styles.text}>No user data found</Text>
                )}
            </View>

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
        marginBottom: 20,
        textAlign: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#4CAF50',
    },
    card: {
        backgroundColor: '#1E1E1E',
        padding: 20,
        borderRadius: 14,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    updateButton: {
        marginTop: 15,
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 10,
    },
    updateText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
    }, imageWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    plusButton: {
        position: 'absolute',
        bottom: 5,
        right: 110, // adjust if needed
        backgroundColor: '#4CAF50',
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },

    plusText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});