import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const CITY_URLS = {
  Mumbai: 'https://www.google.com/maps/search/?api=1&query=Mumbai',
  Bangalore: 'https://www.google.com/maps/search/?api=1&query=Bangalore',
  Kolkata: 'https://www.google.com/maps/search/?api=1&query=Kolkata',
  Chennai: 'https://www.google.com/maps/search/?api=1&query=Chennai',
  Hyderabad: 'https://www.google.com/maps/search/?api=1&query=Hyderabad',
  Delhi: 'https://www.google.com/maps/search/?api=1&query=Delhi',
  Pune: 'https://www.google.com/maps/search/?api=1&query=Pune',
  Ahmedabad: 'https://www.google.com/maps/search/?api=1&query=Ahmedabad',
};

const CITIES = Object.keys(CITY_URLS);

export default function LocationSearch() {
  const [query, setQuery] = useState('');

  const filteredCities = CITIES.filter(city =>
    city.toLowerCase().includes(query.toLowerCase())
  );

  const handleCitySelect = (city) => {
    const url = CITY_URLS[city];
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert("Can't open this URL");
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Location</Text>

      <TextInput
        style={styles.input}
        placeholder="Search a city..."
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filteredCities}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.cityItem} onPress={() => handleCitySelect(item)}>
            <Text style={styles.cityText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  cityItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cityText: { fontSize: 16 },
});
