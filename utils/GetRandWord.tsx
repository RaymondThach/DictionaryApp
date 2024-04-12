//Logic to fetch a random word from https://random-word-api.herokuapp.com/home API for New Word component rendered on Home view

//Use /word endpoint
//Return a single random word
//TODO: adjust logic for when function fails to receive a word (e.g. when API is down)
const GetRandWord = async () => {
    try {
        const response = await fetch(
            'https://random-word-api.herokuapp.com/word'
        );
        const word = await response.json();
        console.log(word);
        return word;
    } catch (e) {
        console.log(e);
    }
};

export default GetRandWord;