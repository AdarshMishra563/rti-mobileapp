import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const categories = [
  { icon: 'film', label: 'Bollywood' },
  { icon: 'building', label: 'Business' },
  { icon: 'landmark', label: 'National' },
  { icon: 'heartbeat', label: 'Health' },
  { icon: 'globe-americas', label: 'World' },
  { icon: 'theater-masks', label: 'Art & Culture' },
  { icon: 'music', label: 'Entertainment' },
  { icon: 'chart-line', label: 'Trending' },
  { icon: 'book', label: 'GK' },
  { icon: 'newspaper-outline', label: 'NewsToday' },
  { icon: 'laptop-code', label: 'Tech' },
  { icon: 'gamepad', label: 'Gaming' },
  { icon: 'camera', label: 'Photography' },
  { icon: 'plane', label: 'Travel' },
  { icon: 'utensils', label: 'Food' },
  { icon: 'heart', label: 'Lifestyle' },
  { icon: 'users', label: 'Community' },
  { icon: 'graduation-cap', label: 'Education' },
  { icon: 'briefcase', label: 'Career' },
  { icon: 'mobile-alt', label: 'Mobile' },
  { icon: 'tv', label: 'Television' },

];

export default function Categories() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Categories</Text>
        <View style={{ width: 24 }} /> {/* Dummy space to balance */}
      </View>

      {/* Category Grid */}
      <ScrollView contentContainerStyle={styles.grid}>
        {categories.map((cat, index) => {
          
          const isNewsToday = cat.icon === 'newspaper-outline';
          const isEducation = cat.label === 'Education';
          let onPress;
          if (isNewsToday) {
            onPress = () => navigation.navigate('NStartScreen');
          } else if (isEducation) {
            onPress = () => navigation.navigate('Bookmark');
          }
          return (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={onPress}
            >
              {isNewsToday ? (
                <Ionicons name="newspaper-outline" size={24} color="#000" />
              ) : (
                <FontAwesome5 name={cat.icon} size={24} color="#000" />
              )}
              <Text style={styles.label}>{cat.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Bottom Tab Dummy */}
      {/* <View style={styles.bottomTab}>
        <Ionicons name="home-outline" size={22} color="#aaa" />
        <Ionicons name="search-outline" size={22} color="#aaa" />
        <Ionicons name="bookmarks-outline" size={22} color="#aaa" />
        <Ionicons name="person-outline" size={22} color="#aaa" />
      </View>
    </View> */}
    <View style={styles.bottomTab}>
  <TouchableOpacity onPress={() => navigation.navigate('NStartScreen')} style={styles.tabItem}>
    <Ionicons name="newspaper-outline" size={24} color="#5956E9" />
    <Text style={styles.tabLabel}>News</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('MediaScreen')} style={styles.tabItem}>
    <Ionicons name="image-outline" size={24} color="#aaa" />
    <Text style={styles.tabLabel}>Media</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('Trending')} style={styles.tabItem}>
    <Ionicons name="flame-outline" size={24} color="#aaa" />
    <Text style={styles.tabLabel}>Trending</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('Career')} style={styles.tabItem}>
    <Ionicons name="briefcase-outline" size={24} color="#aaa" />
    <Text style={styles.tabLabel}>Career</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('TechScreen')} style={styles.tabItem}>
    <Ionicons name="hardware-chip-outline" size={24} color="#aaa" />
    <Text style={styles.tabLabel}>Tech</Text>
  </TouchableOpacity>

</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 50,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'space-between',
  },
  card: {
    width: '30%',
    aspectRatio: 1,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
    color: '#333',
  },
//   bottomTab: {
//     height: 60,
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },
// });
bottomTab: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  paddingVertical: 10,
  borderTopWidth: 1,
  borderColor: '#eee',
  backgroundColor: '#fff',
},

tabItem: {
  alignItems: 'center',
},

tabLabel: {
  fontSize: 12,
  color: '#333',
  marginTop: 2,
},
});
