import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const books = require('./assets/books.png');
const logo = require('./assets/logo.png');

const MainPage = () => {
  return (
    <View style={styles.container}>
    <Image source={logo} style={{ width: 200, height: 50 }} />
    <Image source={books} style={{ width: 200, height: 200 }} />
    <Text style= {{fontSize: 20}}>Welcome to your library!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainPage;