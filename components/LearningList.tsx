//List component containing all words saved by user, each word can be clicked on and accesses database for the saved data to be
//displayed in the shared modal component

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Modal, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getDBConnection, getWord, deleteWord} from '../services/db';


const LearningList = ({allWords, setShowingModal, setResults, setModalColor, resetList}: any) => {

    //State for deleting a word from Learning List
    const [delWord, setDelWord] = useState(String);
    // //State for showing confirmation box
    const [confirmation, setConfirmation] = useState(Boolean);
    
    //Retrieve the row containing the word from the database then open the modal
    const getWordFromTable = async (word: string) => {
      const db = await getDBConnection();
      const wordData = await getWord(db, word);
      setResults(wordData);
      setShowingModal(true);
    };
    
    const delFromTable = async (word: String) => {
      const db = await getDBConnection();
      await deleteWord(db, delWord);
    };

    return  <View>
              <Text style = {styles.subtitle}>Learning List</Text>
              { allWords.length > 0 
              ? <ScrollView style={styles.listContainer}>
              {
                allWords.map((item: {word: String}, i: number) => 
                  <View key = {i} style = {styles.listRow}>
                    <Text style = {styles.word} onPress = {() => {getWordFromTable(item.word.toString()); setModalColor('#0A2463');}}>{item.word}</Text>
                    <Icon name = {'trash'} style = {styles.delButton} onPress = {() => {setDelWord(item.word.toString()); setConfirmation(true);}}/>
                  </View>
                )
              }
              
              </ScrollView>
              : null
              }
              <Modal transparent = {true} visible={confirmation}>
                <View style = {styles.modalLayer}>
                  <View style = {styles.confirmationBox}>
                    <View style = {styles.closeContainer}>
                      <Icon name='times' color = {'#0A2463'} size = {20} onPress = {() => setConfirmation(false)}></Icon>
                    </View>
                    <View style={styles.contentContainer}>
                      <Text style = {styles.message}>Remove the word "{delWord}" from Learning List?</Text>
                      <View style = {styles.iconContainer}>
                        <Button color = {'#0A2463'} title = 'No' onPress = {() => setConfirmation(false)}/>
                        <Button color = {'#0A2463'} title ='Yes' onPress = {async () => {await delFromTable(delWord); resetList(); setConfirmation(false);}}/>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
};

const styles = StyleSheet.create({
    subtitle: {
      fontSize: 20,
      fontFamily: 'roboto_bold',
      color: '#FFFAFF',
    },
    message: {
      fontSize: 20,
      fontFamily: 'roboto_bold',
      color: '#0A2463',
      textAlign: 'center'
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
    },
    listContainer: {
        width: '100%',
        height: '85%',
        backgroundColor: 'white',
        borderWidth: 5,
        borderRadius: 15,
        borderColor: '#0A2463',
    },
    word: {
      fontSize: 20,
      color: '#000000',
    },
    listRow: {
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '1%'
    },
    delButton: {
      fontSize: 20,
      color: '#0A2463'
    },
    modalLayer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    confirmationBox: {
      height: '30%',
      width: '90%',
      backgroundColor: '#FFFAFF',
      borderColor: '#0A2463',
      borderWidth: 5,
      borderRadius: 15,
    },
    closeContainer: {
      flexDirection: 'row-reverse',
      paddingTop: '1%',
      paddingBottom: '1%',
      paddingLeft: '2%',
      paddingRight: '2%',
    },
    contentContainer: {
      paddingTop: '5%',
      alignItems: 'center'
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '10%',
      width: '40%',
    },
  });

export default LearningList; 