//View and stylesheet for New Word component rendered on Home view

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GetRandWord from '../utils/GetRandWord';



const NewWord = () => {
  
  //State for showing the New Word
  const [word, setWord] = useState(String);

  //Call the API once on render to get first new word
  useEffect(() => {
    GetRandWord().then((word) => {
      setWord(word);
    });
  }, []);

  return  <View>
              <Text style = {[styles.subtitle, {color: '#D8315B'}]}>New Word</Text>
              <Text style = {styles.newWord}>{word}</Text>
              <View style = {{flexDirection: 'row'}}>
                  <Text style = {[styles.icons]}></Text>
                  <Text style = {[styles.icons, {paddingLeft: '88%'}]}></Text>
              </View>
          </View>
};

const styles = StyleSheet.create({
    subtitle: {
      fontSize: 20,
      fontFamily: 'roboto_bold',
      color: '#D8315B'
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
      borderColor: '#D8315B',
    },
    icons: {
      fontFamily: 'fontawesome', 
      fontSize: 20,
      color: '#D8315B'
    }
  });

export default NewWord; 