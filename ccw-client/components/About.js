import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const AboutPage = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>About Clean City Watch</Text>
      </View>
      <View style={styles.content}>
        <Image
          source={require('../assets/favicon.png')} // Replace with your logo image
          style={styles.logo}
        />
        <Text style={styles.description}>
          The Clean City Watch project is an innovative solution to address the critical issue
          of illegal garbage dumping in urban areas. Our user-friendly mobile application empowers
          citizens to report and resolve instances of garbage dumping, leading to improved
          environmental impact, public health, and the overall quality of life in cities.
        </Text>
        <Text style={styles.description}>
          With the increasing challenges posed by improper waste disposal, the Clean City Watch
          app provides an efficient reporting mechanism that allows users to capture and submit
          information about illegal dumping incidents. This data is then used to optimize cleanup
          efforts and foster collaboration between communities and local authorities.
        </Text>
        <Text style={styles.description}>
          Our mission is to create cleaner, more sustainable cities by engaging citizens in the
          effort to combat garbage dumping. By utilizing modern technology, effective communication,
          and data accessibility, we aim to bridge the gap between residents and authorities,
          ultimately contributing to the improvement of urban environments.
        </Text>
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
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
});

export default AboutPage;
