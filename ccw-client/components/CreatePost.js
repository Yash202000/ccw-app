import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import axios from 'axios';
import { API_URL } from '../consts/consts';

import PickLocationOnMap from './PickLocationOnMap';

const CreatePost = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const [cameraPermission, setCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [isPickingLocation, setIsPickingLocation] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setCameraPermission(status === 'granted');
      getLocationAsync();
    })();
  }, []);

  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    const locationData = await Location.getCurrentPositionAsync({});
    console.log("automatic location ",locationData)
    setLocation(locationData);
    
  };

  const handleLocationToggle = () => {
    setIsPickingLocation(!isPickingLocation);
  };

  const handleLocationSelection = (selectedLocation) => {
    setLocation(selectedLocation);
    console.log(selectedLocation);
    setIsPickingLocation(true);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('published', 'true');
      formData.append('latitude', location.coords.latitude.toFixed(6));
      formData.append('longitude',location.coords.longitude.toFixed(6));
      formData.append('authorId', 9);
      console.log()
      console.log()
      console.log(data.title,data.content,data.published,data.latitude,data.longitude,data.authorId,selectedImage.uri);
      if (selectedImage) {
        formData.append('file', {
          uri: selectedImage.uri,
          type: 'image/jpeg', // adjust the file type if needed
          name: 'image.jpg',
        });
      }

      const response = await axios.post(`${API_URL}/api/post`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        // Post uploaded successfully, navigate back to Home and refresh the page
        navigation.navigate('Home', { refresh: true });
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result);
    }
  };

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setSelectedImage(photo);
    }
  };

  if (cameraPermission === null) {
    return <View />;
  }
  if (cameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Post</Text>
      <Controller
        control={control}
        name="title"
        rules={{ required: 'Title is required' }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            onChangeText={onChange}
            value={value}
            multiline
          />
        )}
      />
      <Controller
        control={control}
        name="content"
        rules={{ required: 'Content is required' }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.contentInput}
            placeholder="Content"
            onChangeText={onChange}
            value={value}
            multiline
          />
        )}
      />

      {/* Toggle bar */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Pick Location:</Text>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={handleLocationToggle}
        >
          <Text style={styles.toggleButtonText}>
            {isPickingLocation ? 'Manual' : 'Automatic'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Location selection */}
      {isPickingLocation && (
        <PickLocationOnMap onSelectLocation={handleLocationSelection} />
      )}

      
      {!isPickingLocation && (
        <TouchableOpacity style={styles.uploadButton} onPress={getLocationAsync}>
          <Text style={styles.buttonText}>Get Location</Text>
        </TouchableOpacity>

      )}

      {/* Image Upload */}
      <TouchableOpacity style={styles.uploadButton} onPress={openImagePicker}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>

      {/* Selected Image */}
      {selectedImage && (
        <Image source={{ uri: selectedImage.uri }} style={styles.image} />
      )}

      {/* Current Location */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Image Location:</Text>
        {location && (
          <Text style={styles.locationCoords}>
            Latitude: {location.coords.latitude.toFixed(6)}
          </Text>
        )}
        {location && (
          <Text style={styles.locationCoords}>
            Longitude: {
            location.coords.longitude.toFixed(6)}
          </Text>
        )}
      </View>

      {/* Publish Button */}
      <TouchableOpacity style={styles.publishButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Publish</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  titleInput: {
    fontSize: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  contentInput: {
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    height: 150,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  publishButton: {
    backgroundColor: '#27ae60',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  locationContainer: {
    marginVertical: 10,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationCoords: {
    fontSize: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleText: {
    fontSize: 16,
  },
  toggleButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreatePost;
