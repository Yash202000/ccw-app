import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios'; // Import Axios for API calls
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../consts/consts';

const RateUs = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Please provide a rating', 'Please select a rating before submitting.');
    } else {
      const authorId = await AsyncStorage.getItem('user_id');
      try {
        const response = await axios.post(`${API_URL}/api/feedback`, {
          rating: rating,
          feedback :feedback,
          authorId: Number(authorId), // Replace with the actual authorId
        });

        if (response.status === 201) {
          Alert.alert('Thank you!', 'Your rating and feedback have been submitted.');
          setRating(0);
          setFeedback('');
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);
        Alert.alert('Error', 'An error occurred while submitting feedback.');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rate Us</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Rate Your Experience</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity
              key={num}
              style={[styles.ratingButton, rating === num && styles.selectedRatingButton]}
              onPress={() => handleRating(num)}
            >
              <Text style={styles.ratingText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.subtitle}>Provide Feedback</Text>
        <TextInput
          style={styles.feedbackInput}
          placeholder="Enter your feedback here..."
          multiline
          value={feedback}
          onChangeText={(text) => setFeedback(text)}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  ratingButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedRatingButton: {
    backgroundColor: '#3498db',
  },
  ratingText: {
    fontSize: 18,
    color: '#333',
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    height: 120,
  },
  submitButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RateUs;
