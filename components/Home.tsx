//View and stylesheet for the Home screen containing the main components
//First view to render on application start

import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NewWord from './NewWord';
import WordModal from './WordModal';

const Home = () => {
  //State variable for showing the modal for a word
  const [showingModal, setShowingModal] = useState(false);
  //State variable for setting the color of the modal for a word
  const [modalColor, setModalColor] = useState(String);
  //State for showing the New Word
  const [newWord, setNewWord] = useState(String);

  //State variable for the JSON from GetWordDef()
  const [results, setResults] = useState(JSON);

  return <View style = {styles.background}>
            { showingModal
                ? <View style = {styles.modal}>
                    <WordModal setShowingModal = {setShowingModal} modalColor = {modalColor} newWord = {newWord} results = {results}/>
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
              </View>
              <View style = {styles.revisionContainer}>
              </View>
              <View style = {styles.toolbarContainer}>
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
    backgroundColor: '000000',
    height: '27%'
  },
  searchContainer: {
    height: '27%',
    backgroundColor: '#3E92CC'
  },
  revisionContainer: {
    height: '30%',
    backgroundColor: '#0A2463'
  },
  toolbarContainer: {
    flex: 1,
    backgroundColor: '#000000'
  },
});

export default Home;