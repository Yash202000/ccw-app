import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Image} from 'react-native';
import { API_URL } from '../consts/consts'; // Import your API_URL

const ViewProfile = () => {
  const [profileData, setProfileData] = useState({
    id: null,
    firstName: null,
    LastName: null,
    phoneNumber: null,
    addressLine1: null,
    addressLine2: null,
    avatar: null,
    userId: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      const response = await fetch(`${API_URL}/api/profile/${user_id}`);
      const data = await response.json();
      console.log(data);
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleSave = async () => {
    console.log(profileData);
    try {
      // Send edited profile data to the server for update
      const response = await axios.post(`${API_URL}/api/profile/edit`,profileData);
      
      if (response.status === 202) {
        console.log('Profile updated successfully');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/favicon.png')}
          style={styles.profilePic}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={profileData.firstName || ''}
        onChangeText={(text) => setProfileData({ ...profileData, firstName: text })}
        editable={isEditing}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={profileData.LastName || ''}
        onChangeText={(text) => setProfileData({ ...profileData, LastName: text })}
        editable={isEditing}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={profileData.phoneNumber || ''}
        onChangeText={(text) => setProfileData({ ...profileData, phoneNumber: text })}
        editable={isEditing}
      />
      <TextInput
        style={styles.input}
        placeholder="Address Line 1"
        value={profileData.addressLine1 || ''}
        onChangeText={(text) => setProfileData({ ...profileData, addressLine1: text })}
        editable={isEditing}
      />
      <TextInput
        style={styles.input}
        placeholder="Address Line 2"
        value={profileData.addressLine2 || ''}
        onChangeText={(text) => setProfileData({ ...profileData, addressLine2: text })}
        editable={isEditing}
      />
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ViewProfile;
