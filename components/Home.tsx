//View and stylesheet for the Home screen containing the main components
//First view to render on application start

import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';
import NewWord from './NewWord';
import WordModal from './WordModal';
import {getDBConnection, createTable, getAllWords, getAll} from '../services/db';
import SearchWord from './SearchWord';
import LearningList from './LearningList';

const Home = () => {
  //State variable for showing the modal for a word
  const [showingModal, setShowingModal] = useState(false);
  //State variable for setting the color of the modal for a word
  const [modalColor, setModalColor] = useState(String);
  //State for showing the New Word
  const [newWord, setNewWord] = useState(String);
  //State variable for the JSON from GetWordDef()
  const [results, setResults] = useState(JSON);
  //State variable for getting a list of words from database for the Learning List 
  const [allWords, setAllWords] = useState(Object);

  //Establish connection to database and create LearningWords table if it doesn't exist
  const connectDB = async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      await getAllWords(db).then((res: string[]) => setAllWords(res));
      console.log(allWords);
    } catch (error) {
      console.log(error);
    }
  };

  //Check database and retrieve list of saved words on startup
  useEffect(() => {
    connectDB();
  }, [])
  
  //Fetch the updated list when words are added or deleted
  const resetList = async () => {
    const db = await getDBConnection();
    await getAllWords(db).then((res: string[]) => setAllWords(res));
  };

  return <View style = {styles.background}>
            { showingModal
                ? <View style = {styles.modal}>
                    <WordModal setShowingModal = {setShowingModal} modalColor = {modalColor} results = {results} setResults = {setResults} resetList = {resetList}/>
                  </View>
                : null
            }
            <View style = {styles.foreground}>
              <View style = {styles.titleContainer}>
                <Text style = {styles.title}>Dictionary App</Text>
              </View>
              <View style = {styles.newWordContainer}>
                <NewWord setShowingModal = {setShowingModal} setModalColor = {setModalColor} setNewWord = {setNewWord} newWord = {newWord} setResults= {setResults}/>
              </View>
              <View style = {styles.searchContainer}>
                <SearchWord setResults = {setResults} setShowingModal = {setShowingModal} setModalColor = {setModalColor}/>
              </View>
              <View style = {styles.learningContainer}>
                <LearningList allWords = {allWords} setResults = {setResults} setShowingModal ={setShowingModal} setModalColor = {setModalColor} setAllWords = {setAllWords} resetList= {resetList}/>
              </View>
            </View>
        </View>
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000000',
  },
  foreground: {
    flex: 1,
    paddingLeft: '11%',
    paddingRight: '11%',
  },
  modal: {
    zIndex: 1,
    position: 'absolute',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    paddingLeft: '9%',
    paddingRight: '9%',
    paddingTop: '25%',
    paddingBottom: '25%',
    
  },
  titleContainer: {
    height: '8%',
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
    backgroundColor: '#000000',
    height: '21%'
  },
  searchContainer: {
    height: '21%',
    backgroundColor: '#000000'
  },
  learningContainer: {
    flex: 1,
  }, 
});

export default Home;