import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const App = () => (
  <View style = {styles.background}>
      <View style = {styles.titleContainer}>
        <Text style = {styles.title}>Dictionary App</Text>
      </View>
      <View style = {styles.newWordContainer}>
      </View>
      <View style = {styles.searchContainer}>
      </View>
      <View style = {styles.revisionContainer}>
      </View>
      <View style = {styles.toolbarContainer}>
      </View>
  </View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000000'
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue'
  },
  title: {
    fontSize: 30,
    fontFamily: 'roboto_bold',
    color: '#FFFAFF'
  },
  newWordContainer: {
    flex: 2,
    backgroundColor: '#D8315B'
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
  }
});

export default App;