import React from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

const Login = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://192.168.1.40:3000/api/user/signin', {
        email: data.email,
        password: data.password,
      });

      if (response.status === 201) {
        // Save password to AsyncStorage on successful Login
        await AsyncStorage.setItem('savedPassword', data.password);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password is required', minLength: 6 }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
      <TouchableHighlight
          underlayColor="transparent"
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.linkText}>Sign Up</Text>
        </TouchableHighlight>
      
      <Button title="Login" onPress={handleSubmit(onSubmit)} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
