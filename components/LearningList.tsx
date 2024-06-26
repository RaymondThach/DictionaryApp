//List component containing all words saved by user, each word can be clicked on and accesses database for the saved data to be
//displayed in the shared modal component

import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Modal, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getDBConnection, getWord, deleteWord, deleteAll} from '../services/db';
import SortBy from '../utils/SortBy';

const LearningList = ({allWords, setShowingModal, setResults, setModalColor, resetList, setOnLearningList}: any) => {
    //State for deleting a word from Learning List
    const [delWord, setDelWord] = useState(String);
    //State for showing confirmation box
    const [confirmation, setConfirmation] = useState(Boolean);
    //State for how the list is to be sorted alphabetically and the relative icon shown, it renders sort A to Z by default hence True initially.
    const [sortAZ, setSortAZ] = useState(true);
    //State sorting the list numerically and the relative icon shown
    const [sortNum, setSortNum] = useState(Boolean);
    //State for confirmation box to distinguish between deleting a word and whole list
    const [delList, setDelList] = useState(Boolean);
    
    //Retrieve the row containing the word from the database then open the modal
    const getWordFromTable = async (word: string) => {
      const db = await getDBConnection();
      const wordData = await getWord(db, word);
      setResults(wordData);
      setShowingModal(true);
    };
    
    //Delete row (word) from table when "YES" button is selected in confirmation box, refresh the list and close the confirmation box
    const delFromTable = async (word: String) => {
      const db = await getDBConnection();
      await deleteWord(db, delWord);
      resetList();
      setConfirmation(false);
    };

    //Delete all words from the table, refresh list, reset delList and close confirmation box
    const deleteAllFromTable = async () => {
      const db = await getDBConnection(); 
      await deleteAll(db);
      resetList();
      setDelList(false);
      setConfirmation(false);
    };

    return  <View>
              <Text style = {styles.subtitle}>Learning List</Text>
              { allWords.length > 0 
              ? 
              <>
              <ScrollView style={styles.listContainer}>
              {
                allWords.map((item: {word: String}, i: number) => 
                  <View key = {i} style = {styles.listRow}>
                    <Text style = {styles.word} onPress = {() => {getWordFromTable(item.word.toString()); setModalColor('#0A2463'); setOnLearningList(true);}}>{item.word}</Text>
                    <Icon name = {'trash'} style = {styles.delButton} onPress = {() => {setDelWord(item.word.toString()); setConfirmation(true);}}/>
                  </View>
                )
              }
              </ScrollView>
              <View style={styles.buttonContainer}>
                <View style={styles.sortContainer}>
                  {
                    sortAZ 
                    ? <Icon name = {'sort-alpha-up'} style = {styles.sortButtons} onPress = {() => {setSortAZ(!sortAZ); SortBy(allWords, 'Z-A', 'word');}}/>
                    : <Icon name = {'sort-alpha-down'} style = {styles.sortButtons} onPress ={() => {setSortAZ(!sortAZ); SortBy(allWords, 'A-Z', 'word');}}/>
                  }
                  {
                    sortNum
                    ? <Icon name = {'sort-numeric-up'} style = {styles.sortButtons} onPress = {() => {setSortNum(!sortNum); SortBy(allWords, '9-1', 'id');}}/>
                    : <Icon name = {'sort-numeric-down'} style = {styles.sortButtons} onPress = {() => {setSortNum(!sortNum); SortBy(allWords, '1-9', 'id');}}/>
                  }
                  
                </View>
                <View>
                  <Icon.Button name = {'trash-alt'} borderRadius = {15} backgroundColor = {'#1E1B18'} onPress = {() => {setDelList(true); setConfirmation(true);}}>
                    <Text style = {styles.subtitle}>Clear List</Text>
                  </Icon.Button>
                </View>
              </View>
              </>
              : <ScrollView style={styles.listContainer}>
                  <Text style={styles.message}>No words saved yet</Text>
                </ScrollView>
              }
              <Modal transparent = {true} visible={confirmation}>
                <View style = {styles.modalLayer}>
                  <View style = {styles.confirmationBox}>
                    <View style = {styles.closeContainer}>
                      <Icon name='times' color = {'#0A2463'} size = {20} onPress = {() => {setConfirmation(false); setDelList(false);}}></Icon>
                    </View>
                    <View style={styles.contentContainer}>
                      {
                        delList
                        ? <Text style = {styles.message}>Clear the Learning List?</Text>
                        : <Text style = {styles.message}>Remove the word "{delWord}" from Learning List?</Text>
                      }
                      <View style = {styles.iconContainer}>
                        <Button color = {'#0A2463'} title = 'No' onPress = {() => {setConfirmation(false); setDelList(false);}}/>
                        <Button color = {'#0A2463'} title ='Yes' onPress = {async () => {delList? await deleteAllFromTable() : await delFromTable(delWord);}}/>
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: '2%',
      paddingBottom: '2%'
    },
    listContainer: {
        width: '100%',
        height: '80%',
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
    sortButtons: {
      color: '#FFFAFF',
      fontSize: 25,
      paddingRight: '5%',
      paddingTop: '1%'
    },
    sortContainer: {
      flexDirection: 'row',
    }
  });

export default LearningList; 