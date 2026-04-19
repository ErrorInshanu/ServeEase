import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/');
  };

  return (
    <View style={styles.container}>

      {/* 🔥 Gradient Header */}
      <LinearGradient
        colors={['#4CAF50', '#0D0D0D']}
        style={styles.header}
      >
        <Text style={styles.title}>ServeEase</Text>

        {/* 🔥 Underline */}
        <View style={styles.underline} />
      </LinearGradient>

      {/* 🔥 Content */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>Find trusted services instantly</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/categories')}
        >
          <Text style={styles.primaryText}>Explore Services</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <LinearGradient
  colors={['transparent', '#4CAF50']}
  style={styles.bottomGradient}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    width: '100%',
    paddingTop: 70,
    paddingBottom: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  underline: {
    marginTop: 6,
    width: 80,
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '80%',
    marginBottom: 20,
  },
  primaryText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#ff4d4d',
    paddingVertical: 12,
    borderRadius: 12,
    width: '80%',
  },
  logoutText: {
    color: '#ff4d4d',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 120,
  },
});