import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';

import Login from "./components/login";
import Auth from "./components/Auth";


export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
          <Auth />
          <Text>Hello world!</Text>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});