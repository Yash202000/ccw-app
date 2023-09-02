import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator ,Linking,TextInput, Modal} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons ,MaterialCommunityIcons} from '@expo/vector-icons'; 
import axios from 'axios';
import { API_URL } from '../consts/consts';
import RefreshButton from '../Buttons/RefreshButton';
import Sidebar from './SideBar';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Drawer = createDrawerNavigator();


const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [showSearchIcon, setShowSearchIcon] = useState(false);
  const [isFilterVisible, setFilterVisible] = useState(false); // State to control filter options visibility
  const [selectedFilters, setSelectedFilters] = useState({
    city: false,
    title: false,
    content: true,
  });


  useEffect(async () => {
    fetchPosts();
  }, []);

  
  const handleRefresh = async ()=>{
    try {
      setLoading(true);
      fetchPosts()
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }

  }

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/post`);
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

  const handleSearchIconClick = async () => {
    console.log('Search Input:', searchText);
    let filterText = '';
    if(selectedFilters.city) filterText = `?city=${searchText}`;
    else if (selectedFilters.content) filterText = `?content=${searchText}`;
    else if (selectedFilters.title) filterText = `?title=${searchText}`
    

    try {
      console.log(filterText)
      const response = await axios.get(`${API_URL}api/post/filtered-posts?city=Pune`);
      console.log(`${API_URL}/api/post${filterText}`)
      console.log(response);
      console.log(response.body.content);
      setPosts(response.body.content);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
    

  };


  const handleFilterIconClick = () => {
    setFilterVisible(true); // Show the filter options container
  };

  const handleFilterApply = () => {
    // Apply filters based on selectedFilters object
    // Fetch posts with applied filters
    // fetchPosts();

    setFilterVisible(false); // Hide the filter options container after applying filters
  };

  const handleFilterClose = () => {
    setFilterVisible(false); // Hide the filter options container
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
      <View style={styles.searchContainer}>
       
       <TouchableOpacity onPress={handleFilterIconClick}>
          <MaterialCommunityIcons name="filter" size={24} color="#3498db" />
        </TouchableOpacity>

        <TextInput
          style={styles.searchInput}
          placeholder={`Search by ${selectedFilters.city ? 'city' : selectedFilters.title ? 'title' : 'content'}...`}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onFocus={() => setShowSearchIcon(true)}
          onBlur={() => setShowSearchIcon(false)}
        />
      
        <TouchableOpacity onPress={handleSearchIconClick}>
          <Ionicons name="search" size={24} color="#3498db" />
        </TouchableOpacity>

      </View>
      {isFilterVisible && (
  <View style={styles.filterContainer}>
    {/* Checkboxes for city, title, and upvotes */}
    <TouchableOpacity
      style={styles.closeIcon}
      onPress={() => setFilterVisible(false)}
    >
      <Ionicons name="close" size={24} color="#ccc" />
    </TouchableOpacity>

    <View style={styles.checkboxGroup}>
      <View style={styles.checkboxItem}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setSelectedFilters({ title: false, content: false, city: true })}
        >
          {selectedFilters.city ? (
            <Ionicons name="checkbox" size={24} color="#3498db" />
          ) : (
            <Ionicons name="checkbox-outline" size={24} color="#ccc" />
          )}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>City</Text>
      </View>

      <View style={styles.checkboxItem}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setSelectedFilters({ city: false, content: false, title:true })}
        >
          {selectedFilters.title ? (
            <Ionicons name="checkbox" size={24} color="#3498db" />
          ) : (
            <Ionicons name="checkbox-outline" size={24} color="#ccc" />
          )}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Title</Text>
      </View>
      <View style={styles.checkboxItem}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setSelectedFilters({ city: false,title: false, content: true })}
        >
          {selectedFilters.content ? (
            <Ionicons name="checkbox" size={24} color="#3498db" />
          ) : (
            <Ionicons name="checkbox-outline" size={24} color="#ccc" />
          )}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Content</Text>
      </View>
    </View>

    {/* Apply button */}
    <TouchableOpacity style={styles.applyIcon} onPress={handleFilterApply}>
      <Ionicons name="checkmark" size={24} color="#3498db" />
    </TouchableOpacity>
  </View>
)}
         
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Footer */}
      <View style={styles.footer}>
      <TouchableOpacity
          style={styles.mapButton}
          onPress={() => navigation.navigate('MapLeaflet')} // Replace 'MapLeaflet' with the correct screen name
        >
        <Ionicons name="map-outline" size={32} color="#3498db" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Createpost')}
        >
          <Ionicons name="add-circle-outline" size={32} color="#3498db" />
        </TouchableOpacity>
        <RefreshButton onPress={handleRefresh} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
  },
  searchIcon: {
    paddingLeft: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  closeIcon: {
    marginRight: 10,
  },
  applyIcon: {
    marginLeft: 10,
  },
  checkboxGroup: {
    flexDirection: 'row',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    marginRight: 5,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  filterButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
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
  mapButton: {
    backgroundColor: 'white', // Background color for the button
    borderRadius: 50, // Make it circular
    padding: 10, // Padding inside the button
    elevation: 5, // Add elevation (shadow) for Android
    marginLeft: 10, // Add margin to separate it from the 'Add' button
  },
  
});




const Home = ({ navigation }) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      initialRouteName="HomeScreen"
    >
      <Drawer.Screen 
      name="HomeScreen" 
      component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default Home;
