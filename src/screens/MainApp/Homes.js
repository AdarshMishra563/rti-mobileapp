// src/screens/Home.js or homes.js

import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    // Automatically navigate to FullNews when Home is opened
    navigation.replace('FullNews'); // or navigation.navigate('FullNews');
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#2F6BFF" />
    </View>
  );
}
