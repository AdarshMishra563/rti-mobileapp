// // App.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from './src/AppNavigator/Navigation';
// import { UserProvider } from './src/screens/UserContext'; // if using context

// export default function App() {
//   return (
//     <UserProvider>
//       <NavigationContainer> {/* ✅ Only one here */}
//         <AppNavigator />
//       </NavigationContainer>
//     </UserProvider>
//   );
// }
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/AppNavigator/Navigation';
import { UserProvider } from './src/screens/UserContext'; // ✅ Import the provider
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
    <UserProvider> {/* ✅ Wrap entire app inside the provider */}
      <StatusBar style="auto" />
      <AppNavigator />
    </UserProvider></SafeAreaProvider>
  );
}
