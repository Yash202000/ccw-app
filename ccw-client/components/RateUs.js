import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icons

const RateUs = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Please provide a rating', 'Please select a rating before submitting.');
    } else {
      // Send the rating and feedback to your backend or perform any other necessary actions
      Alert.alert('Thank you!', 'Your rating and feedback have been submitted.');
      setRating(0);
      setFeedback('');
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
