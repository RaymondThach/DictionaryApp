//View and stylesheet for SearchWord component rendered on Home view

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import GetWordDef from '../utils/GetWordDef';

const SearchWord = ({setShowingModal, setResults, setModalColor}: any) => {

  //State for search box's user input
  const [searchWord, setSearchWord] = useState('');

  return  <View>
              <Text style = {[styles.subtitle, {color: '#3E92CC'}]}>Define</Text>
              <TextInput style = {styles.Search} placeholder='Enter a word' onChangeText={(text) => setSearchWord(text)}></TextInput>
              <View style = {styles.buttonContainer}>
                  <Icon.Button name = {'search'} color = '#3E92CC' borderRadius = {15} backgroundColor={'#1E1B18'}>
                      <Text style = {styles.subtitle} onPress={async () => {await GetWordDef(searchWord).then((res) => setResults(res)); setShowingModal(true); setModalColor('#3E92CC');}}>Search</Text>
                  </Icon.Button>  
              </View>
          </View>
};

const styles = StyleSheet.create({
    subtitle: {
      fontSize: 20,
      fontFamily: 'roboto_bold',
      color: '#3E92CC'
    },
    Search: {
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
      borderColor: '#3E92CC',
    },
    buttonContainer: {
      flexDirection: 'row-reverse',
      paddingTop: '2%',
      paddingBottom: '2%'
    }
  });

export default SearchWord; 