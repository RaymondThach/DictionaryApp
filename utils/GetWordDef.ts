//Function for retrieving definition of a word through https://dictionaryapi.com/ API (Merriam-Webster) for the modals
//Extract useful information from API response, if word isn't found return the suggestions.
import {API_KEY} from '@env';

//Remove : and any numbers/letters after it to get the word only from the API
//Can't use passed in searchWord, because the API searches up plain words only with multiple variations of the same word
//E.g. API returns "conserve:1" or "Prague:g"
export const wordTrimmer = (str: string) => {
    const newString = str.replace(/:.+/,'');
    return newString;
}

const GetWordDef = async (word: string) => {
    const key = process.env.API_KEY;

    try {
        const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${key}`);
        const json = await response.json();
        //Meta should always exist if there's no entry for the word in the API
        if (json[0].meta){
            //Placeholders for results returned by this function, what is displayed if they're missing.
            let trimmedWord = word;
            let audioLink = '';
            let def = 'No definition found.';
            //Trim the id (word) to return the plain word
            if (json[0].meta.id){
                trimmedWord = wordTrimmer(json[0].meta.id);
            }
            //Assure the definition is returned otherwise, use the placeholder
            if (json[0].shortdef){
                def = json[0].shortdef;
            }
            //Select category of the audio and form the link
            if (json[0].hwi.prs){
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
                audioLink = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subDirectory}/${audioName}.mp3`;
            }
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
