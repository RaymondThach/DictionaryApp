//Modal (popup window) containing the details of a word. Used for New Word, Search, Save and Revision List components.
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import GetWordDef from '../utils/GetWordDef';
import Sound from 'react-native-sound';

const WordModal = ({setShowingModal, modalColor, results, setResults}: any) => {
    
    //Assign Sound resources to the audio link (resources to be cleared on modal close)
    if (results.audio) {
        var pronounce = new Sound(results.audio, '', (error: any) => {
            if (error) {
                console.log('failed to laod the sound', error);
                return;
            }
        });
    }
    
    //Set volume for audio file to 100% and loop to one on render
    useEffect(()=> {
        if (pronounce) {
            pronounce.setVolume(1);
            pronounce.setNumberOfLoops(0);
        } 
    }, []);

    //Re-render when a suggested word is selected
    useEffect(() => {
        console.log(results);
    }, [results]);

    return  <View style={[styles.container, {borderColor: modalColor}]}>
                
                {   
                    results 
                    ?   <> 
                        { results.id
                            ?   <>
                                    <View style={styles.topBar}>
                                        <Icon name='times' color = {modalColor} size = {styles.topBar.fontSize} onPress = {() => 
                                            {setShowingModal(false); {pronounce? pronounce.release() : null}}}></Icon>
                                        <Icon name='volume-up' color = {modalColor} size = {styles.topBar.fontSize} onPress = {() => pronounce.play()}></Icon>
                                    </View>
                                    <View style={styles.loaded}>
                                        <Text style={[styles.title, {color: modalColor}]}>{results.id}</Text>
                                        <Text style={[styles.subtitle, {color: modalColor}]}>Definition</Text>
                                        <Text style={styles.text}>{results.def.map((def: string) => '- ' + def + '\n')}</Text>
                                    </View>
                                </>
                            :   <>
                                {   results.suggestions
                                    ?   
                                        <>
                                            <View style={styles.topBar}>
                                                <Icon name='times' color = {modalColor} size = {styles.topBar.fontSize} onPress = {() => 
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
                                            <View style={styles.topBar}>
                                                <Icon name='times' color = {modalColor} size = {styles.topBar.fontSize} onPress = {() => 
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
                    :   <View style={styles.loading}><Text>Loading...</Text></View>
                }   
            </View>
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
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
        backgroundColor: 'pink',
        paddingLeft: '1%',
        paddingRight: '1%',
    },
    topBar: {
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
        color: 'black',
    },
    suggestions: {
        fontSize: 15,
        fontFamily: 'roboto_bold', 
        color: '#007FFF',
        textDecorationLine: 'underline'
    }
});

export default WordModal;