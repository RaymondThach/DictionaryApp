//Modal (popup window) containing the details of a word. Used for New Word, Search, Save and Revision List components.
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const WordModal = ({setShowingModal, modalColor, newWord, results}: any) => {
    
    useEffect(() => {
        console.log(results);
    }, []);

    return  <View style={[styles.container, {borderColor: modalColor}]}>
                
                {   
                    results 
                    ?   <> 
                        { results.id
                            ?   <>
                                    <View style={styles.topBar}>
                                        <Icon name='times' color = {modalColor} size = {styles.topBar.fontSize} onPress = {() => setShowingModal(false)}></Icon>
                                        <Icon name='volume-up' color = {modalColor} size = {styles.topBar.fontSize}></Icon>
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
                                                <Icon name='times' color = {modalColor} size = {styles.topBar.fontSize} onPress = {() => setShowingModal(false)}></Icon>
                                            </View>
                                            <View style={styles.loaded}>
                                                <Text style={[styles.title, {color: modalColor}]}>Did you mean:</Text>
                                                <Text style={styles.text}>{results.suggestions.map((word: string) => '- ' + word + '\n')}</Text>
                                            </View>
                                        </>
                                    :   <>
                                            <View style={styles.topBar}>
                                                <Icon name='times' color = {modalColor} size = {styles.topBar.fontSize} onPress = {() => setShowingModal(false)}></Icon>
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
});


export default WordModal;