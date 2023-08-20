import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const CreatePost = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const [cameraPermission, setCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('published', data.published);
      formData.append('latitude', data.latitude);
      formData.append('longitude', data.longitude);
      formData.append('authorId', data.authorId);
      if (selectedImage) {
        formData.append('file', {
          uri: selectedImage.uri,
          type: 'image/jpeg', // adjust the file type if needed
          name: 'image.jpg',
        });
      }

      const response = await axios.post('http://192.168.1.40:3000/api/post', formData, {
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
            style={styles.input}
            placeholder="Title"
            onChangeText={onChange}
            value={value}
          />
        )}
      />


      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ref={(ref) => setCamera(ref)}
        />
        <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
          <Text style={styles.cameraButtonText}>Take Picture</Text>
        </TouchableOpacity>
      </View>

      <Button title="Upload Image" onPress={openImagePicker} />

      {selectedImage && (
        <Image source={{ uri: selectedImage.uri }} style={styles.image} />
      )}

      <Button title="Publish" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (existing styles)
  
  
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },

  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '80%',
    height: '100%',
  },
  cameraButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 10,
    margin: 20,
    alignSelf: 'flex-end',
  },
  cameraButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CreatePost;
