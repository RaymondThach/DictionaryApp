import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NewWord = () => {
    return  <View>
                <Text style = {[styles.subtitle, {color: '#D8315B'}]}>New Word</Text>
                <Text style = {styles.newWord}>Testing Text</Text>
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