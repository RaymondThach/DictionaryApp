//Modal (popup window) containing the details of a word. Used for New Word, Search, Save and Revision List components.
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const WordModal = ({setShowingModal, modalColor, newWord, results}: any) => {
    
    // useEffect(()=> {
    // }, []);

    return  <View style={[styles.container, {borderColor: modalColor}]}>
                {   
                    results 
                    ? <Text style={styles.loading}>Loading...</Text>
                    : <Text>test</Text>
                }   
                <Icon name='times' onPress = {() => setShowingModal(false)}></Icon>
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
    }
});


export default WordModal;