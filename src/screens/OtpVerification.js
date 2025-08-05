// OtpVerification.js
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { getAuth, signInWithPhoneNumber } from 'firebase/auth';
import { app } from '../../config.js/firebase';

const auth = getAuth(app);

export default function OtpVerification({ route, navigation }) {
  const { value: phoneNumber } = route.params;
  const recaptchaVerifier = useRef(null);
  const [code, setCode] = useState('');
  const [verification, setVerification] = useState(null);
  const [error, setError] = useState('');

  const sendOTP = async () => {
    try {
      const confirmation = await signInWithPhoneNumber(auth, `+1${phoneNumber}`, recaptchaVerifier.current);
      setVerification(confirmation);
      Alert.alert('OTP sent!');
    } catch (err) {
      console.error('OTP error:', err);
      Alert.alert('Error sending OTP', err.message || 'Unexpected error');
    }
  };

  const confirmCode = async () => {
    try {
      await verification.confirm(code); // ✅ confirm the code
      Alert.alert('Phone verified!');
      navigation.navigate('ResetPassword', { phone: phoneNumber });
    } catch (err) {
      console.error('Verification error:', err);
      setError('Invalid OTP. Please try again.');
    }
  };

  useEffect(() => {
    sendOTP();
  }, []);

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
      />

      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Enter the OTP sent to +1{phoneNumber}</Text>

      <TextInput
        style={[styles.input, error && styles.errorInput]}
        placeholder="Enter OTP"
        keyboardType="number-pad"
        value={code}
        onChangeText={(text) => {
          setCode(text);
          setError('');
        }}
        maxLength={6}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={confirmCode}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#777', marginBottom: 30 },
  input: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 4,
  },
  errorInput: { borderColor: '#FF5A5F' },
  errorText: { color: '#FF5A5F', fontSize: 12, marginBottom: 10 },
  button: {
    backgroundColor: '#2F6BFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
