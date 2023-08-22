import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HelpAndSupport = () => {
  const faqs = [
    {
      question: 'How do I report an illegal garbage dumping incident?',
      answer: 'To report an incident, open the Clean City Watch app, navigate to the "Report" section, and provide details about the location and situation. You can also attach photos as evidence.',
    },
    {
      question: 'Is the app available for both Android and iOS devices?',
      answer: 'Yes, the Clean City Watch app is available for both Android and iOS devices. You can download it from the respective app stores.',
    },
    {
      question: 'Can I track the status of my reported incidents?',
      answer: "Yes, you can track the status of your reported incidents by going to the 'My Reports' section in the app. You'll receive updates as authorities address the issues.",
    }
    // Add more FAQs here...
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Help and Support</Text>
      </View>
      <View style={styles.content}>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{faq.question}</Text>
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
          </View>
        ))}
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
  faqItem: {
    marginBottom: 20,
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  faqAnswer: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default HelpAndSupport;
