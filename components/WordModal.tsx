//Modal (popup window) containing the details of a word. Used for New Word, Search, Save and Revision List components.

import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const WordModal = ({setShowingModal}: any) => {

    return  <View style={styles.container}>
                <Text>Modal</Text>
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
});


export default WordModal;