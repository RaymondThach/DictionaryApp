//Function for retrieving definition of a word through https://dictionaryapi.com/ API (Merriam-Webster) for the modals
import {API_KEY} from '@env';

const GetWordDef = async ({search_word}: any) => {
    const key = process.env.API_KEY;
    const word = search_word;

    try {
        const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${key}`);
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(e);
        return 'Unable to define ' + word;
    }
};

export default GetWordDef;