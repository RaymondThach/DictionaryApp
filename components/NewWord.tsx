//View and stylesheet for New Word component rendered on Home view

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GetRandWord from '../utils/GetRandWord';
import Icon from 'react-native-vector-icons/FontAwesome5';


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
              <View style = {styles.buttonContainer}>
                  <Icon.Button name = {'sync-alt'} color = '#D8315B' borderRadius = {15} backgroundColor={'#1E1B18'} onPress={async () => setWord(await GetRandWord())}>
                    <Text style = {styles.subtitle}>Refresh</Text>
                  </Icon.Button>  
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
    buttonContainer: {
      flexDirection: 'row-reverse',
      paddingTop: '2%',
      paddingBottom: '2%'
    }
  });

export default NewWord; 