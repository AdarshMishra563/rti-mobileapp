import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function RTIExpressForm() {
  const [form, setForm] = useState({
    name: '',
    dob: '',
    gender: '',
    contactNumber: '',
    email: '',
    address: '',
    aadhar: '',
    designation: '',
    region: '',
    previousExperience: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.name) newErrors.name = 'Required';
    if (!form.dob) newErrors.dob = 'Required';
    if (!form.gender) newErrors.gender = 'Required';
    if (!form.contactNumber.match(/^\d{10}$/)) newErrors.contactNumber = 'Invalid contact number';
    if (!form.email.includes('@')) newErrors.email = 'Invalid email';
    if (!form.aadhar.match(/^\d{12}$/)) newErrors.aadhar = 'Aadhar must be 12 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log('Submitted Form:', form);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>RTI Express Registration</Text>
        <Text style={styles.subtitle}>Fill in the details carefully</Text>

        <LabeledInput
          label="Name"
          placeholder="Enter full name"
          icon={<Ionicons name="person-outline" size={20} color="#666" />}
          value={form.name}
          onChangeText={(val) => handleChange('name', val)}
          error={errors.name}
        />

        <LabeledInput
          label="Date of Birth"
          placeholder="DD/MM/YYYY"
          icon={<Ionicons name="calendar-outline" size={20} color="#666" />}
          value={form.dob}
          onChangeText={(val) => handleChange('dob', val)}
          error={errors.dob}
        />

        <LabeledInput
          label="Gender"
          placeholder="Male / Female / Other"
          icon={<Ionicons name="transgender-outline" size={20} color="#666" />}
          value={form.gender}
          onChangeText={(val) => handleChange('gender', val)}
          error={errors.gender}
        />

        <LabeledInput
          label="Contact Number"
          placeholder="10-digit number"
          icon={<Ionicons name="call-outline" size={20} color="#666" />}
          keyboardType="phone-pad"
          value={form.contactNumber}
          onChangeText={(val) => handleChange('contactNumber', val)}
          error={errors.contactNumber}
        />

        <LabeledInput
          label="Email Address"
          placeholder="Enter email"
          icon={<FontAwesome name="envelope" size={20} color="#666" />}
          keyboardType="email-address"
          value={form.email}
          onChangeText={(val) => handleChange('email', val)}
          error={errors.email}
        />

        <LabeledInput
          label="Address"
          placeholder="Enter address"
          icon={<Ionicons name="home-outline" size={20} color="#666" />}
          value={form.address}
          onChangeText={(val) => handleChange('address', val)}
        />

        <LabeledInput
          label="Aadhar Number"
          placeholder="12-digit Aadhar number"
          icon={<Ionicons name="card-outline" size={20} color="#666" />}
          keyboardType="numeric"
          value={form.aadhar}
          onChangeText={(val) => handleChange('aadhar', val)}
          error={errors.aadhar}
        />

        <LabeledInput
          label="Designation (/DISTRICT/CONSTITUENCY/MANDAL)"
          placeholder="e.g. District President"
          icon={<Ionicons name="briefcase-outline" size={20} color="#666" />}
          value={form.designation}
          onChangeText={(val) => handleChange('designation', val)}
        />

        <LabeledInput
          label="Region/Area"
          placeholder="Your local area or constituency"
          icon={<Ionicons name="location-outline" size={20} color="#666" />}
          value={form.region}
          onChangeText={(val) => handleChange('region', val)}
        />

        <LabeledInput
          label="Previous Experience (if any)"
          placeholder="Mention experience"
          icon={<Ionicons name="document-text-outline" size={20} color="#666" />}
          value={form.previousExperience}
          onChangeText={(val) => handleChange('previousExperience', val)}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
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
  container: {
    padding: 20,
    paddingTop: 80,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0077B6',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    fontWeight: '600',
    color: '#000',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 14,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#0077B6',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
