import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PickupHistory = () => {
  const issues = [
    {
      id: 1,
      location: 'Near Park Avenue',
      status: 'In Progress',
    },
    {
      id: 2,
      location: 'Downtown Street',
      status: 'Pending',
    },
    {
      id: 3,
      location: 'City Center',
      status: 'Resolved',
    },
    // Add more static issue data here
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Issue Tracking</Text>
      </View>
      <View style={styles.content}>
        {issues.map((issue) => (
          <TouchableOpacity
            key={issue.id}
            style={styles.issueContainer}
            onPress={() => console.log(`View details of Issue ${issue.id}`)}
          >
            <Text style={styles.issueTitle}>{issue.location}</Text>
            <Text style={styles.issueStatus}>{issue.status}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* TODO: Add any additional components or actions */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  issueContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  issueTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  issueStatus: {
    fontSize: 16,
    color: '#3498db',
  },
  // Add any additional styles here
});

export default PickupHistory;
