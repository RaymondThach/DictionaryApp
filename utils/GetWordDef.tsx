//Function for retrieving definition of a word through https://dictionaryapi.com/ API (Merriam-Webster) for the modals
import {API_KEY} from '@env';

const GetWordDef = async (searchWord: String) => {
    const key = process.env.API_KEY;
    const word = searchWord;

    try {
        //console.log(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${key}`);
        const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${key}`);
        const json = await response.json();
        //console.log(json);
        return json;
    } catch (e) {
        console.log(e);
        return 'Unable to define ' + word;
    }
};

export default GetWordDef;