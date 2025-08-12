// screens/ProfilePreview.js

import { Ionicons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { UserContext } from './UserContext';

export default function ProfilePreview({ route }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { userData, userPosts } = useContext(UserContext);

  const [profile, setProfile] = useState({
    image: null,
    username: '',
    fullName: '',
    email: '',
    phone: '',
    website: '',
    bio: 'Write about you...',
    followers: 0,
    following: 0,
  });

  const [activeTab, setActiveTab] = useState('Recent');

  // Fetch profile from API
  const fetchProfile = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODkyZTAwNmY2YmM3ZGYyMWFkYmEwYjkiLCJpYXQiOjE3NTQ0NTYwNzB9.aE3nuOHI1ZbFKOVtRdTRW0-84jXhTYqYIP_eL1ENTx0';
      if (!token) {
        Alert.alert('Error', 'No token found. Please log in again.');
        return;
      }

      const res = await fetch('http://34.100.231.173:3000/api/v1/profile/fetchprofile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error('API Error:', errData);
        Alert.alert('Error', errData.message || 'Failed to fetch profile');
        return;
      }

      const data = await res.json();
      console.log('Fetched profile:', data);

      if (data.user) {
        setProfile((prev) => ({
          ...prev,
          username: data.user.userName || '',
          fullName: data.user.fullName || '',
          email: data.user.email || '',
          phone: data.user.phone ? String(data.user.phone) : '',
        }));
      }
    } catch (error) {
      console.error('Network error:', error);
      Alert.alert('Error', 'Unable to fetch profile. Please try again.');
    }
  };

  useEffect(() => {
    if (isFocused) {
      if (route.params) {
        setProfile((prev) => ({ ...prev, ...route.params }));
      } else if (userData) {
        setProfile((prev) => ({ ...prev, ...userData }));
      }
      fetchProfile();
    }
  }, [isFocused, route.params, userData]);

  const myPosts = userPosts;

  const recentNews = [
    {
      id: '1',
      category: 'NFTs',
      title: 'Minting Your First NFT: A Beginner’s Guide',
      author: profile.fullName,
      time: '15m ago',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: '2',
      category: 'Business',
      title: '5 Things to Know Before the Stock Market Opens',
      author: profile.fullName,
      time: '1h ago',
      image: 'https://via.placeholder.com/100',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.newsCard}>
      <Image source={{ uri: item.image }} style={styles.newsImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.newsCategory}>{item.category}</Text>
        <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.newsMeta}>{item.author} • {item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.profileTitle}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Setting', { ...profile })}>
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={profile.image ? { uri: profile.image } : require('../Assets/image1.png')}
          style={styles.profilePic}
        />
        <Text style={styles.name}>{profile.fullName || 'Your Name'}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>

        <View style={styles.stats}>
          <View>
            <Text style={styles.count}>{profile.followers}</Text>
            <Text>Followers</Text>
          </View>
          <View>
            <Text style={styles.count}>{profile.following}</Text>
            <Text>Following</Text>
          </View>
          <TouchableOpacity onPress={() => setActiveTab('News')}>
            <Text style={styles.count}>{myPosts.length}</Text>
            <Text>News</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('EditProfile', { ...profile })}
          >
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (profile.website) {
                const url = profile.website.startsWith('http')
                  ? profile.website
                  : `https://${profile.website}`;
                Linking.openURL(url).catch(() => alert('Invalid URL'));
              } else {
                alert('No website link provided.');
              }
            }}
          >
            <Text style={styles.buttonText}>Website</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabRow}>
        <TouchableOpacity onPress={() => setActiveTab('News')}>
          <Text style={[styles.tab, activeTab === 'News' && styles.tabActive]}>News</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Recent')}>
          <Text style={[styles.tab, activeTab === 'Recent' && styles.tabActive]}>Recent</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Recent' && (
        <FlatList
          data={recentNews}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      )}

      {activeTab === 'News' && (
        <FlatList
          data={[...myPosts].reverse()}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      )}

      <View style={styles.bottomTab}>
        <TouchableOpacity onPress={() => navigation.navigate('FullNews')}>
          <Ionicons name="home" size={24} color="#5956E9" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
          <Ionicons name="search" size={24} color="#aaa" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Bookmark')}>
          <Ionicons name="bookmark" size={24} color="#aaa" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfilePreview')}>
          <Ionicons name="person" size={24} color="#aaa" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddPostScreen')}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileTitle: { fontSize: 18, fontWeight: '600' },
  profileSection: { alignItems: 'center', paddingHorizontal: 20 },
  profilePic: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  bio: { textAlign: 'center', marginVertical: 5, color: '#555' },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 15,
  },
  count: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  btnRow: { flexDirection: 'row', gap: 10 },
  btn: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnText: { color: '#fff', fontWeight: '600' },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  tab: { fontSize: 16, color: '#888' },
  tabActive: {
    color: '#000',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: '#007bff',
  },
  newsCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
  },
  newsImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  newsCategory: { fontSize: 12, color: '#888' },
  newsTitle: { fontSize: 14, fontWeight: 'bold', marginVertical: 4 },
  newsMeta: { fontSize: 12, color: '#555' },
  bottomTab: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
