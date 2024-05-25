//Modal (popup window) containing the details of a word. Used for New Word, Search, Save and Revision List components.
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import GetWordDef from '../utils/GetWordDef';
import Sound from 'react-native-sound';
import {insertWord, getDBConnection} from '../services/db';

const WordModal = ({setShowingModal, modalColor, results, setResults, resetList}: any) => {
    //State for the text input for user notes for a word
    const [notesInput, setNotesInput] = useState(String)

    const modalCol = modalColor; 
    //Assign Sound resources to the audio link (resources to be cleared on modal close)
    if (results.audio){
        var pronounce = new Sound(results.audio, '', (error: any) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
        });
    }
    

    //TODO: Revisit this to format the definition for storage and represented directly from the learning list when saved.
    //Convert array to a formatted string to store in database
    // const defToString = (arr: []) => {
    //     let string_definition = arr.join('\n- ')
    //     return string_definition;
    // };

    //Set volume for audio file to 100% and loop to one on render
    useEffect(()=> {
        if (pronounce) {
            pronounce.setVolume(1);
            pronounce.setNumberOfLoops(0);
        }
        if (results.notes) {
            setNotesInput(results.notes);
        }
    }, []);

    //Function for Save button to insert new word/update existing word with user's notes
    const insertNewWord = async (entries: string[]) => {
        try {
          const db = await getDBConnection();
          await insertWord(db, entries);
        } catch (error) {
          console.log(error);
        }
    };

    return  <View style={[styles.container, {borderColor: modalColor}]}>  
                {   
                    results 
                    ?   <> 
                        { results.word
                            ?   <>
                                    <View style={styles.iconContainer}>
                                        <Icon name='times' color = {modalColor} size = {styles.iconContainer.fontSize} onPress = {() => 
                                            {setShowingModal(false); {pronounce? pronounce.release() : null}}}></Icon>
                                        <Icon name='volume-up' color = {modalColor} size = {styles.iconContainer.fontSize} onPress = {() => {results.audio === ''? null : pronounce.play();}}></Icon>
                                    </View>
                                    <View style={styles.loaded}>
                                        <Text style={[styles.title, {color: modalColor}]}>{results.word}</Text>
                                        <Text style={[styles.subtitle, {color: modalColor}]}>Definition</Text>
                                        <Text style={styles.text}>
                                            { Array.isArray(results.definition)
                                            ? results.definition.map((def: string) => '- ' + def + '\n')
                                            : '- ' + results.definition }
                                        </Text>
                                    </View>
                                    <Text style={[styles.subtitle, {color: modalColor}]}>Your Notes:</Text>
                                    <View style = {styles.inputContainer}>
                                        <TextInput multiline= {true} style = {[styles.textInput, {borderColor: modalColor}]} onChangeText = {(input) => setNotesInput(input)}>
                                        {notesInput}</TextInput>
                                    </View>
                                    <View style={styles.iconContainer}>
                                        <Icon name = 'save' color = {modalColor} size = {styles.iconContainer.fontSize} solid onPress = {async() => 
                                            {await insertNewWord([results.word, results.definition.toString(), results.audio, notesInput]); resetList(); setShowingModal(false);}}></Icon>
                                    </View>
                                </>
                            :   <>
                                {   results.suggestions
                                    ?   
                                        <>
                                            <View style={styles.iconContainer}>
                                                <Icon name='times' color = {modalColor} size = {styles.iconContainer.fontSize} onPress = {() => 
                                                    {setShowingModal(false); {pronounce? pronounce.release() : null}}}></Icon>
                                            </View>
                                            <View style={styles.loaded}>
                                                <Text style={[styles.title, {color: modalColor}]}>Did you mean:</Text>
                                                <Text style={styles.text}>{results.suggestions.map((word: string) => { 
                                                    return <Text style = {styles.suggestions} onPress = {async () => 
                                                    {GetWordDef(word).then((res) => {setResults(res)});}}>{word + '\n'}</Text>})}</Text>
                                            </View>
                                        </>
                                    :   <>
                                            <View style={styles.iconContainer}>
                                                <Icon name='times' color = {modalColor} size = {styles.iconContainer.fontSize} onPress = {() => 
                                                    {setShowingModal(false); {pronounce? pronounce.release() : null}}}></Icon>
                                            </View>
                                            <View style={styles.loaded}>
                                                <Text style={[styles.title, {color: modalColor}]}>{results.error}</Text>
                                            </View>
                                        </>
                                }
                                </>
                        }
                        </>
                    :   
                    <>
                        <View style={styles.iconContainer}>
                            <Icon name='times' color = {modalColor} size = {styles.iconContainer.fontSize} onPress = {() => 
                                {setShowingModal(false); {pronounce? pronounce.release() : null}}}></Icon>
                        </View>
                        <View style={styles.loading}><Text>Loading...</Text></View></>
                }   
            </View>
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#FFFFFF',
        borderWidth: 5,
        borderRadius: 15,
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    loaded: {
        flex: 1,
        paddingLeft: '1%',
        paddingRight: '1%',
    },
    iconContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        paddingTop: '1%',
        paddingBottom: '1%',
        paddingLeft: '2%',
        paddingRight: '2%',
        fontSize: 24,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'roboto_bold',
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'roboto_bold',
    },
    text: {
        fontSize: 15,
        fontFamily: 'roboto_bold', 
        color: '#000000',
    },
    suggestions: {
        fontSize: 15,
        fontFamily: 'roboto_bold', 
        color: '#007FFF',
        textDecorationLine: 'underline'
    },
    inputContainer: {
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    textInput: {
        flex: 1,
        width: '90%',
        borderWidth: 5,
        borderRadius: 15,
        textAlignVertical: 'top',
        padding: '2%'
    }
});

export default WordModal;