//Function for retrieving definition of a word through https://dictionaryapi.com/ API (Merriam-Webster) for the modals
//Extract useful information from API response, if word isn't found return the suggestions.
import {API_KEY} from '@env';

//Remove : and any numbers after it to get the word only from the API
//Can't use passed in searchWord, because the API searches up plain words only with multiple variations of the same word
//E.g. API returns "conserve:1"
export const wordTrimmer = (str: String) => {
    const newString = str.replace(/:[\d]+/,'');
    return newString;
}

const GetWordDef = async (word: String) => {
    const key = process.env.API_KEY;

    try {
        const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${key}`);
        const json = await response.json();
        if (json[0].meta){
            //Check audio file name to assign the subdirectory for the API link the sound file
            const audioName = json[0].hwi.prs[0].sound.audio;
            let subDirectory = '';
            if (audioName.slice(0,3) === 'bix'){
                subDirectory = 'bix';
            } else if (audioName.slice(0,2) === 'gg') {
                subDirectory = 'gg';
            } else if (!!audioName.match(/^\d|^[_.,:!?]/)){ //!! converts the regex return to bool, match whether first string position is digit or punctuation
                subDirectory = 'number';
            } else {
                subDirectory = audioName[0];
            }
            const audioLink = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subDirectory}/${audioName}.mp3`;
            const trimmedWord = wordTrimmer(json[0].meta.id);
            const result = {word: trimmedWord, definition: json[0].shortdef, audio: audioLink};
            return result;
        }
        else {
            const result = {suggestions: json};
            return result;
        }  
    } catch (e) {
        console.log(e);
        const result = {error: 'Unable to define ' + word};
        return result;
    }
};

export default GetWordDef;
