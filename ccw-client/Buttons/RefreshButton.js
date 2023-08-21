import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RefreshButton = ({ onPress }) => (
  <TouchableOpacity style={styles.addButton} onPress={onPress}>
    <Ionicons name="refresh" size={32} color="#3498db" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
});

export default RefreshButton;
