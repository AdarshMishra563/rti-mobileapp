import { useContext, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import { UserContext } from '../screens/UserContext'; 

const sources = [
  { name: 'BBC News', image: require('../Assets/Ellipse.png') },
  { name: 'CNN', image: require('../Assets/Ellipse.png') },
  { name: 'VICE', image: require('../Assets/Ellipse.png') },
  { name: 'NDTV', image: require('../Assets/Ellipse.png') },
  { name: 'ABP News', image: require('../Assets/Ellipse.png') },
  { name: 'India Today', image: require('../Assets/Ellipse.png') },
];

export default function NewsSourceScreen({ navigation }) {
  const [followedSources, setFollowedSources] = useState([]);
  const [search, setSearch] = useState('');
  const { incrementFollowing } = useContext(UserContext);

  const toggleFollow = (sourceName) => {
    setFollowedSources((prev) => {
      if (prev.includes(sourceName)) {
        return prev.filter((name) => name !== sourceName);
      } else {
        incrementFollowing();
        return [...prev, sourceName];
      }
    });
  };

  const filteredSources = sources.filter((src) =>
    src.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your News Sources</Text>

      {/* 🔍 Search Bar */}
      <TextInput
        placeholder="Search News Sources"
        style={styles.searchBar}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredSources}
        numColumns={2}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const isFollowed = followedSources.includes(item.name);
          return (
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text>{item.name}</Text>
              <TouchableOpacity
                style={[styles.follow, isFollowed && styles.following]}
                onPress={() => toggleFollow(item.name)}
              >
                <Text style={{ color: isFollowed ? '#fff' : '#000' }}>
                  {isFollowed ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('FullNews', {
            followedSources: followedSources,
          })
        }
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },

  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },

  card: {
    alignItems: 'center',
    margin: 10,
    width: 120,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  image: { width: 50, height: 50, marginBottom: 10 },
  follow: {
    backgroundColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 4,
    marginTop: 8,
  },
  following: {
    backgroundColor: '#007bff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
