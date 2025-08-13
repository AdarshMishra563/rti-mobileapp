import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useContext, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { UserContext } from './UserContext';

export default function AddPostScreen({ navigation }) {
  const [postImage, setPostImage] = useState(null);
  const [heading, setHeading] = useState('');
  const [tag, setTag] = useState('');
  const [category, setCategory] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [article, setArticle] = useState('');

  const { userData, userPosts, setUserPosts } = useContext(UserContext); 

  const pickPostImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setPostImage(result.assets[0].uri);
    }
  };

  const handlePostSubmit = () => {
    if (!postImage || !heading || !tag || !category || !videoLink || !article) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      image: postImage,
      title: heading,
      tag: tag,
      category: category,
      videoLink: videoLink,
      article: article,
      author: userData?.fullName || 'Anonymous',
      time: 'Just now',
    };

    setUserPosts([newPost, ...userPosts]); 
    Alert.alert('Success', 'Your post has been published!');
    navigation.navigate('ProfilePreview'); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create New Post</Text>

      <TouchableOpacity style={styles.imageBox} onPress={pickPostImage}>
        {postImage ? (
          <Image source={{ uri: postImage }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Feather name="camera" size={30} color="#aaa" />
            <Text style={styles.imageText}>Add Post Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Add Heading"
        value={heading}
        onChangeText={setHeading}
        style={styles.input}
      />

      <TextInput
        placeholder="Add Tag"
        value={tag}
        onChangeText={setTag}
        style={styles.input}
      />

      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <TextInput
        placeholder="Add Video Link"
        value={videoLink}
        onChangeText={setVideoLink}
        style={styles.input}
      />

      <TextInput
        placeholder="Write Articles"
        value={article}
        onChangeText={setArticle}
        style={[styles.input, styles.articleInput]}
        multiline
        numberOfLines={6}
      />

      <TouchableOpacity style={styles.postButton} onPress={handlePostSubmit}>
        <Text style={styles.postButtonText}>POST</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    alignItems: 'center',
  },
  imageText: {
    color: '#aaa',
    marginTop: 10,
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
  },
  articleInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
