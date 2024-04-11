import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const App = () => (
  <View style = {styles.background}>
    <View style = {styles.foreground}>
      <View style = {styles.titleContainer}>
        <Text style = {styles.title}>Dictionary App</Text>
      </View>
      <View style = {styles.newWordContainer}>
        <Text style = {[styles.subtitle, {color: '#D8315B'}]}>New Word</Text>
        <Text style = {styles.newWord}>Testing Text</Text>
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
    flex: 2,
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
  subtitle: {
    fontSize: 20,
    fontFamily: 'roboto_bold',
  },
  newWord: {
    fontSize: 24,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'roboto_bold',
    color: '#000000',
    backgroundColor: '#FFFAFF',
    borderWidth: 5,
    borderRadius: 15,
    width: '100%',
    height: '60%',
    borderColor: '#D8315B'
  }
});

export default App;