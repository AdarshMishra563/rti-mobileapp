import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function OTPScreen({ route, navigation }) {
  const [code, setCode] = useState('');
  const { confirmation } = route.params;

  const handleVerify = async () => {
    try {
      const result = await confirmation.confirm(code);
      const isNewUser = result?.additionalUserInfo?.isNewUser;

      if (isNewUser) {
        navigation.replace('StateSelections'); // Or onboarding
      } else {
        navigation.replace('StateSelections'); // Existing users too
      }
    } catch (err) {
      Alert.alert('Invalid OTP', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
        <TextInput
        placeholderTextColor='gray'
        style={styles.input}
        placeholder="Enter 6-digit OTP"
        keyboardType="numeric"
        maxLength={6}
        value={code}
        onChangeText={setCode}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
      input: {
    color:"black",
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2F6BFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
