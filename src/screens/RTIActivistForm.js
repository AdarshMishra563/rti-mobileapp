import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function RTIActivistForm({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    dob: '',
    gender: '',
    contactNumber: '',
    email: '',
    address: '',
    aadhar: '',
    designation: 'MEMBER',
    region: '',
    previousExperience: '',
    media: null
  });

  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.name) newErrors.name = 'Required';
    if (!form.dob) newErrors.dob = 'Required';
    if (!form.gender) newErrors.gender = 'Required';
    if (!form.contactNumber.match(/^\d{10}$/)) newErrors.contactNumber = 'Invalid number';
    if (!form.email.includes('@')) newErrors.email = 'Invalid email';
    if (!form.aadhar.match(/^\d{12}$/)) newErrors.aadhar = 'Aadhar must be 12 digits';
    if (!form.media) newErrors.media = 'Image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5
    });

    if (!result.canceled) {
      let localUri = result.assets[0].uri;
      if (localUri.startsWith('content://')) {
        const fileInfo = await FileSystem.getInfoAsync(localUri);
        localUri = fileInfo.uri;
      }
      setForm({ ...form, media: localUri });
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('media', {
      uri: form.media,
      type: 'image/jpeg',
      name: 'photo.jpg'
    });
    formData.append('name', form.name);
    formData.append('DOB', form.dob);
    formData.append('gender', form.gender);
    formData.append('email', form.email);
    formData.append('phone', form.contactNumber);
    formData.append('address', form.address);
    formData.append('aadhar', form.aadhar);
    formData.append('location', form.region);
    formData.append('designation', form.designation);
    formData.append('experience', form.previousExperience);

    try {
      const res = await fetch('http://34.100.231.173:3000/api/v1/activist/application', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Error', JSON.stringify(data));
      } else {
        Alert.alert('Success', 'Application submitted successfully');
        navigation.navigate('PublishNewsScreen');
      }
    } catch (err) {
      Alert.alert('Network Error', err.message);
      console.log('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>RTI Activist Registration</Text>
        <Text style={styles.subtitle}>Fill your details below</Text>

        <TouchableOpacity style={styles.imagePicker} onPress={pickMedia}>
          <Text style={{ color: '#0077B6' }}>{form.media ? 'Change Image' : 'Pick Image'}</Text>
        </TouchableOpacity>
        {errors.media && <Text style={styles.error}>{errors.media}</Text>}

        <LabeledInput label="Name" placeholder="Enter your full name"
          icon={<Ionicons name="person-outline" size={20} color="#666" />}
          value={form.name} onChangeText={(val) => handleChange('name', val)} error={errors.name} />

        <LabeledInput label="Date of Birth" placeholder="DD/MM/YYYY"
          icon={<Ionicons name="calendar-outline" size={20} color="#666" />}
          value={form.dob} onChangeText={(val) => handleChange('dob', val)} error={errors.dob} />

        <LabeledInput label="Gender" placeholder="Enter your gender"
          icon={<Ionicons name="transgender-outline" size={20} color="#666" />}
          value={form.gender} onChangeText={(val) => handleChange('gender', val)} error={errors.gender} />

        <LabeledInput label="Contact Number" placeholder="Enter your phone number"
          icon={<Ionicons name="call-outline" size={20} color="#666" />} keyboardType="phone-pad"
          value={form.contactNumber} onChangeText={(val) => handleChange('contactNumber', val)}
          error={errors.contactNumber} />

        <LabeledInput label="Email Address" placeholder="Enter your email"
          icon={<FontAwesome name="envelope" size={20} color="#666" />} keyboardType="email-address"
          value={form.email} onChangeText={(val) => handleChange('email', val)} error={errors.email} />

        <LabeledInput label="Address" placeholder="Enter your address"
          icon={<Ionicons name="home-outline" size={20} color="#666" />}
          value={form.address} onChangeText={(val) => handleChange('address', val)} />

        <LabeledInput label="Aadhar Number" placeholder="12-digit Aadhar number"
          icon={<Ionicons name="card-outline" size={20} color="#666" />} keyboardType="numeric"
          value={form.aadhar} onChangeText={(val) => handleChange('aadhar', val)} error={errors.aadhar} />

        <LabeledInput label="Designation" placeholder="MEMBER"
          icon={<Ionicons name="briefcase-outline" size={20} color="#666" />}
          value={form.designation} editable={false} />

        <LabeledInput label="Region/Area" placeholder="Your region"
          icon={<Ionicons name="location-outline" size={20} color="#666" />}
          value={form.region} onChangeText={(val) => handleChange('region', val)} />

        <LabeledInput label="Previous Experience" placeholder="If any"
          icon={<Ionicons name="document-text-outline" size={20} color="#666" />}
          value={form.previousExperience} onChangeText={(val) => handleChange('previousExperience', val)} />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={uploading}>
          <Text style={styles.submitText}>{uploading ? 'Submitting...' : 'Submit'}</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ALoginScreen')}>
            <Text style={{ color: '#0077B6', fontWeight: 'bold', marginTop: 5 }}>Login here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const LabeledInput = ({
  label,
  placeholder,
  icon,
  value,
  onChangeText,
  error,
  keyboardType = 'default',
  secureTextEntry = false,
  editable = true,
}) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputRow}>
      {icon}
      <TextInput
        style={[styles.input, !editable && { backgroundColor: '#eee' }]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
    </View>
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 80, backgroundColor: '#fff', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0077B6', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#333', marginBottom: 20 },
  inputWrapper: { marginBottom: 16 },
  label: { marginBottom: 4, fontWeight: '600', color: '#000' },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, paddingHorizontal: 10, borderColor: '#ccc', borderRadius: 6 },
  input: { flex: 1, padding: 12, fontSize: 14 },
  error: { color: 'red', fontSize: 12, marginTop: 4 },
  submitButton: { backgroundColor: '#0077B6', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  submitText: { color: '#fff', fontWeight: 'bold' },
  imagePicker: { borderWidth: 1, borderColor: '#0077B6', padding: 10, borderRadius: 6, alignItems: 'center', marginBottom: 10 }
});
