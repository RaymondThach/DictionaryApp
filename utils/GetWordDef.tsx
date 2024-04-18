//Function for retrieving definition of a word through https://dictionaryapi.com/ API (Merriam-Webster) for the modals

const GetWordDef = async () => {
    const key = '02680b9e-3663-4411-a30e-67f430551695'
    const word = 'gas';
    const url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word  + '?key=' + key;

    try {
        const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/gas?key=02680b9e-3663-4411-a30e-67f430551695`);
        //const json = await response.json();
        console.log(response);
        return 'test';
    } catch (e) {
        console.log(e);
        return 'Unable to define ' + word;
    }
};

export default GetWordDef;