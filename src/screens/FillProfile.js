// screens/FillProfile.js

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function FillProfile({ navigation }) {
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    if (!email || !phone) {
      alert('Email and Phone Number are required.');
      return;
    }

    navigation.navigate('ProfilePreview', {
      image,
      username,
      fullName,
      email,
      phone,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Fill your Profile</Text>

      {/* Upload circle */}
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderCircle}>
            <Feather name="camera" size={28} color="#888" />
          </View>
        )}
      </TouchableOpacity>

      <Input label="Username" value={username} onChangeText={setUsername} icon="person-outline" />
      <Input label="Full Name" value={fullName} onChangeText={setFullName} icon="person" />
      <Input label="Email Address*" value={email} onChangeText={setEmail} icon="mail-outline" />
      <Input label="Phone Number*" value={phone} onChangeText={setPhone} icon="call-outline" />

      <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
        <Text style={styles.nextBtnText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

function Input({ label, value, onChangeText, icon }) {
  return (
    <View style={styles.inputWrapper}>
      <Ionicons name={icon} size={20} color="#888" style={styles.icon} />
      <TextInput
        placeholder={label}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 30, alignSelf: 'center' },
  imageContainer: { alignSelf: 'center', marginBottom: 30 },
  placeholderCircle: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center',
  },
  profileImage: { width: 120, height: 120, borderRadius: 60 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#f9f9f9', borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 12,
    marginBottom: 15, elevation: 1,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16 },
  nextBtn: {
    marginTop: 20, backgroundColor: '#007bff',
    paddingVertical: 14, alignItems: 'center',
    borderRadius: 10,
  },
  nextBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
