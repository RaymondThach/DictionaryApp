//List component containing all words saved by user, each word can be clicked on and accesses database for the saved data to be
//displayed in the shared modal component

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getDBConnection, getWord} from '../services/db';


const LearningList = ({allWords, setShowingModal, setResults, setModalColor}: any) => {

    //State for selected word from Learning List
    const [selectedWord, setSelectedWord] = useState(String);

    //Retrieve the row containing the word from the database then open the modal
    const getWordFromTable = async () => {
        console.log(selectedWord);
        const db = await getDBConnection();
        const word = await getWord(db, selectedWord);
        await setResults(word);
        setShowingModal(true);
    };

    //Retrieve data each time a different word is selected from the list
    useEffect(()=> {
        if (selectedWord){
            getWordFromTable();
        }
    }, [selectedWord]);

    return  <View>
                <Text style = {[styles.subtitle, {color: '#FFFAFF'}]}>Learning List</Text>
                {/* <View style = {styles.buttonContainer}>
                    
                    <Icon.Button name = {'search'} color = '#0A2463' borderRadius = {15} backgroundColor={'#1E1B18'}>
                        
                    </Icon.Button>  
                </View> */}
                
                <FlatList style = {styles.listContainer} data = {allWords} renderItem={({item}) => 
                    <Text style = {styles.word} onPress = {() => {setSelectedWord(item.word); setModalColor('#0A2463');}}>{item.word}</Text>}/>
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
        borderColor: '#0A2463'
    },
    word: {
        padding: '1%',
        fontSize: 20,
        color: '#000000',
    }
  });

export default LearningList; 