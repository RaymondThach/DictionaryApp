//List component containing all words saved by user, each word can be clicked on and accesses database for the saved data to be
//displayed in the shared modal component

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getDBConnection, getWord} from '../services/db';


const LearningList = ({allWords, setShowingModal, setResults, setModalColor}: any) => {

    //State for selected word from Learning List
    const [selectedWord, setSelectedWord] = useState(String);
    // const [learningWords, setLearningWords] = useState(Object);
    

    //Retrieve the row containing the word from the database then open the modal
    const getWordFromTable = async () => {
        console.log(selectedWord);
        const db = await getDBConnection();
        const word = await getWord(db, selectedWord);
        await setResults(word);
        setShowingModal(true);
    };

    // useEffect(() => {
      
    // }, [learningWords]);

    // useEffect(() => {
      
    // }, [allWords]);

    //Retrieve data each time a different word is selected from the list
    // useEffect(()=> {
    //     if (selectedWord){
    //         getWordFromTable();
    //     }
    // }, [selectedWord]);

    return  <View>
              <Text style = {[styles.subtitle, {color: '#FFFAFF'}]}>Learning List</Text>

              { allWords.length > 0 
              ? <ScrollView style={styles.listContainer}>
              {
              
                allWords.map((item: {word: String}, i: number) => 
                  <Text key = {i} style = {styles.word}>{item.word}</Text>
                )
              }
              </ScrollView>
              : null
              
              }
              
                {/* <FlatList style = {styles.listContainer} data = {allWords} renderItem={({item}) => 
                      <Text style = {styles.listRow} onPress = {() => {setSelectedWord(item.word); setModalColor('#0A2463');}}>  
                        <Text style = {styles.word}>
                        <View style = {styles.delButton}>
                            <Icon name={'trash'}/>
                          </View>
                          <View style={styles.test}></View>
                          <Text>{item.word}</Text>
                          
                        </Text>
                      </Text>
                  }/> */}
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
      flex:1,
      padding: '1%',
      fontSize: 20,
      color: '#000000',
      backgroundColor: 'orange',
    },
    listRow: {
      flex:1,
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      backgroundColor: 'red',
    },
    delButton: {
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'blue',
      paddingLeft: '80%'
    },
    test: {
      flex: 1,
      padding: '100%'
    }
  });

export default LearningList; 