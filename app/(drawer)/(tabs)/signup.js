import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 🔥 New fields
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleSignup = async () => {
    console.log("button clicked");

    // ✅ basic validation
    if (!name || !email || !password) {
      alert("Please fill required fields");
      return;
    }

    try {
      const res = await fetch('https://serveease-backend-f058.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,

          // 🔥 sending extra fields (safe)
          phone,
          age,
          gender,
        }),
      });

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      await AsyncStorage.setItem('token', data.token);

await AsyncStorage.setItem('user', JSON.stringify({
  name,
  email,
  phone,
  age,
  gender
}));

alert("Signup successful 🎉");

      // reset fields
      setName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setAge('');
      setGender('');

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Signup</Text>

        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        {/* 🔥 New Inputs */}

        <TextInput
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="phone-pad"
        />

        <TextInput
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          style={styles.input}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  box: {
    width: '85%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});