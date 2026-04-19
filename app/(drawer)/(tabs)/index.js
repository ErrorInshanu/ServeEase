import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const router = useRouter();

useEffect(() => {
  checkLogin();
}, []);

const checkLogin = async () => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    console.log("User already logged in");
    router.replace('/home'); // we will create this
  }
};


const handleLogin = async () => {
  console.log("login clicked");

  try {
    const res = await fetch('https://serveease-backend-f058.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    console.log("response:", data);

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // ✅ SAVE TOKEN
    await AsyncStorage.setItem('token', data.token);

    alert("Login successful 🎉");

    // ✅ NAVIGATE
    router.replace('/home');

  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};



  return (
    <View style={styles.container}>
<Image
  source={require('../../../assets/images/service2.png')}
  style={{ width: 350, height: 250, marginBottom: 120,alignItems: 'center' }}
  resizeMode="contain"
/>
      <Text style={styles.title}>Welcome </Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

<TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

  
<TouchableOpacity onPress={() => router.push('/signup')}>
  <Text style={{ textAlign: 'center', marginTop: 15 }}>
    Don’t have an account? 
    <Text style={{ color: '#4CAF50', fontWeight: 'bold' }}>
      {' '}Sign up
    </Text>
  </Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#555',
  },
});