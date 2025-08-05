import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function JoinRTIScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Join RTI Express</Text>
        <View style={{ width: 24 }} />
      </View>

      <TouchableOpacity 
        style={styles.option}
        onPress={() => navigation.navigate('RTIExpressForm')}
      >
        <Ionicons name="notifications-outline" size={24} color="#000" />
        <Text style={styles.optionText}>Join as Reporter</Text>
        <Ionicons name="chevron-forward" size={24} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.option}
        onPress={() => navigation.navigate('RTIActivistForm')}
      >
        <Ionicons name="lock-closed-outline" size={24} color="#000" />
        <Text style={styles.optionText}>Join as Activist</Text>
        <Ionicons name="chevron-forward" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding: 20, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  optionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
});
