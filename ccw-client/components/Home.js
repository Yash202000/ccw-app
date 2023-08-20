import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator ,Linking} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://192.168.1.40:3000/api/post');
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/place/${latitude},${longitude}`;
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => openGoogleMaps(item.latitude, item.longitude)}
      >
        <Text style={styles.buttonText}>Open in Maps</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  return (
   <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreatePost')}
        >
          <Ionicons name="add-circle-outline" size={32} color="#3498db" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postContent: {
    marginBottom: 10,
  },
  mapButton: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  addButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
});

export default Home;
