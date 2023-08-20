// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import CreatePost from './components/CreatePost';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        

        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerTitle: 'CCW', // Set the custom header title
            headerLeft: () => (
              <Ionicons.Button
                name="md-menu"
                size={32}
                backgroundColor="transparent"
                onPress={() => navigation.toggleDrawer()} // Open the drawer navigation
              />
            ),
          })}
        />

        <Stack.Screen
            name="CreatePost"
            component={CreatePost}
            options={({ navigation }) => ({
              headerTitle: 'CCW', // Set the custom header title
              headerLeft: () => (
                <Ionicons.Button
                  name="md-menu"
                  size={32}
                  backgroundColor="transparent"
                  onPress={() => navigation.toggleDrawer()} // Open the drawer navigation
                />
              ),
            })}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

