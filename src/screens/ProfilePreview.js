
import { Feather } from "@expo/vector-icons";
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
       <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={28} color="black" />
                </TouchableOpacity>
        <Text style={styles.profileTitle}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Setting', { ...profile })}>
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>

      <View style={styles.stats}>
        <Image
                source={profile.image ? { uri: profile.image } : require('../Assets/image1.png')}
                style={styles.profilePic}
              />
                <View style={styles.statsData}>
                  <Text style={styles.count}>{profile.followers}</Text>
                  <Text>Follower</Text>
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
        </View>

        <View style={styles.profileBottom}>
        <Text style={styles.name}>{profile.fullName || 'Your Name'}</Text>
        <View style={styles.btnRow}>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('EditProfile', { ...profile })}
          >
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
                      style={styles.btn}
                      onPress={() => navigation.navigate('EditProfile', { ...profile })}
                    >
                      <Text style={styles.btnText}>Bookmarks</Text>
                    </TouchableOpacity>
        </View>
        </View>
      <View style={styles.tabRow}>
        <TouchableOpacity onPress={() => setActiveTab('Pending')}>
          <Text style={[styles.tab, activeTab === 'Pending' && styles.tabActive]}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Approved')}>
          <Text style={[styles.tab, activeTab === 'Approved' && styles.tabActive]}>Approved</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Approved' && (
        <FlatList
          data={recentNews}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      )}

      {activeTab === 'Pending' && (
        <FlatList
          data={[...myPosts].reverse()}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      )}

      <View style={styles.tabBar}>
              <TouchableOpacity onPress={() => navigation.navigate('FullNews')} style={styles.tabItem}>
                <Ionicons name="home-outline" size={24} color="#aaa" />
                <Text style={styles.tabLabel}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('JoinRTIScreen')} style={styles.tabItem}>
                <Ionicons name="create-outline" size={24} color="#aaa" />
                <Text style={styles.tabLabel}>Join RTI</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('AddPostScreen')} style={styles.tabItem}>
                <Ionicons name="add-circle" size={28} color="#aaa" />
                <Text style={styles.tabLabel}>Add Post</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('EpaperScreen')} style={styles.tabItem}>
                <Ionicons name="book-outline" size={24} color="#aaa" />
                <Text style={styles.tabLabel}>E-Paper</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('ProfilePreview')} style={styles.tabItem}>
                <Ionicons name="person" size={24} color="#aaa" />
                <Text style={styles.tabLabel}>Profile</Text>
              </TouchableOpacity>
            </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: {
    padding: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: '',
  },
  profileTitle: { fontSize: 18, fontWeight: '600' },
  profileSection: { alignItems: 'center', paddingHorizontal: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 15},
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    marginTop: 2,
  },
profileBottom:{
paddingHorizontal: 20,
marginBottom: 15,
},
  count: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  btnRow: { flexDirection: 'row', gap: 20 },

 btn: {
   backgroundColor: '#007bff',
   paddingVertical: 8,
   borderRadius: 8,
   height: 45,
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
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
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    gap:'25',
  },
   tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderColor: '#eee',
      backgroundColor: '#fff',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
      tabItem: {
        alignItems: 'center',
      },
      tabLabel: {
        fontSize: 12,
        color: '#aaa',
        marginTop: 2,
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
