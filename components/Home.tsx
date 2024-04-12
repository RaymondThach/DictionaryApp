//View and stylesheet for the Home screen containing the main components
//First view to render on application start

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NewWord from './NewWord';

const Home = () => (
  <View style = {styles.background}>
    <View style = {styles.foreground}>
      <View style = {styles.titleContainer}>
        <Text style = {styles.title}>Dictionary App</Text>
      </View>
      <View style = {styles.newWordContainer}>
        <NewWord/>
      </View>
      <View style = {styles.searchContainer}>
      </View>
      <View style = {styles.revisionContainer}>
      </View>
      <View style = {styles.toolbarContainer}>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000000'
  },
  foreground: {
    flex: 1,
    paddingLeft: '11%',
    paddingRight: '11%',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  title: {
    fontSize: 30,
    fontFamily: 'roboto_bold',
    color: '#FFFAFF'
  },
  newWordContainer: {
    backgroundColor: 'white',
    height: '25%'
  },
  searchContainer: {
    flex: 3,
    backgroundColor: '#3E92CC'
  },
  revisionContainer: {
    flex: 4,
    backgroundColor: '#0A2463'
  },
  toolbarContainer: {
    flex: 5,
    backgroundColor: '#000000'
  },
});

export default Home;