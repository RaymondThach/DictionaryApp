//Logic to fetch a random word from https://random-word-api.herokuapp.com/home API for New Word component rendered on Home view

//Use /word endpoint
//Return a single random word
const GetRandWord = async () => {
    try {
        const response = await fetch(
            'https://random-word-api.herokuapp.com/word?lang=en'
        );
        const json = await response.json();
        return json[0];
    } catch (e) {
        return 'No Word Available';
    }
};

export default GetRandWord;