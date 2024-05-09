import {enablePromise, openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';

//Enable promises for SQLite, because app uses promise based API calls
enablePromise(true);

//Establish a connection to the database to save returned values from queries
export const getDBConnection = async () => {
    return openDatabase({name: 'dictionaryApp.db', location: 'default'})
};

//Create the LearningWords table, primary key and word columns can be used for sorting
export const createTable = async (db: SQLiteDatabase) => {
    const create_table_query = `
        CREATE TABLE IF NOT EXISTS LearningWords(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT NOT NULL UNIQUE,
        definition TEXT NOT NULL,
        audio TEXT,
        notes TEXT
    )`;

    try {
        await db.executeSql(create_table_query);
    } catch (error) {
        console.log(error);
        throw Error('Unable to create LearningWords table');
    }
};

//Get a word (row), return the result as a promise
export const getPromWord = async (db: SQLiteDatabase, word: string) => {
    const get_word_query = `SELECT * FROM LearningWords WHERE word = '${word}'`;
    try {
        const results = await db.executeSql(get_word_query);
        return results;
    } catch (error) {
        console.log(error);
        throw Error('Unable to get ' + word);
    }
};

//Get a word (row), return the result as object
export const getWord = async (db: SQLiteDatabase, word: string) => {
    const results = await getPromWord(db, word)
    try {
        return results[0].rows.item(0);
    } catch (error) {
        console.log(error);
    }
};

//Retrieve all columns of all words in the LearningWords table
export const getAll = async (db: SQLiteDatabase) => {
    const get_all__query = `SELECT * FROM LearningWords`;
    try {
        const results = await db.executeSql(get_all__query);
        const entries: string[] = [];
        results?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                          entries.push(result.rows.item(index))
                }
        });
        return entries;
    } catch (error) {
        console.log(error);
        throw Error('Unable to get all');
    }
};

//Retrieve all words in the LearningWords table
export const getAllWords = async (db: SQLiteDatabase) => {
    const get_all_words_query = `SELECT word FROM LearningWords`;
    try {
        const results = await db.executeSql(get_all_words_query);
        const entries: string[] = [];
        results?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                          entries.push(result.rows.item(index))
                }
        });
        console.log(entries);
        return entries;
    } catch (error) {
        console.log(error);
        throw Error('Unable to get all words');
    }
};

//Insert or update a word's notes into LearningWords table for modal
export const insertWord = async (db: SQLiteDatabase, params: string[]) => {
    //See if the word already exists
    const results = getWord(db, params[0]);
    const insert_query = `
        INSERT INTO LearningWords(
          word,
          definition,
          audio,
          notes) VALUES (?, ?, ?, ?)
    `;
    //Update the words notes if it already exists
    const update_query = `
        UPDATE LearningWords 
        SET notes = '${params[3]}'
        WHERE word = '${params[0]}'
    `;

    //If the word doesn't exist in the results insert the word into the table
    if (await Promise.resolve(results).then((result) => result[0].rows.length) == 0){
        try {
            await db.executeSql(insert_query, params);
        } catch (error) {
            console.log(error);
            throw Error('Unable to add new word');
        }
    } else {
        try {
            await db.executeSql(update_query);
        } catch (error){
            console.log(error);
            throw Error('Unable to update notes');
        }  
    }
};

//Delete all rows of LearningWords table, not the table itself
export const deleteAll = async (db: SQLiteDatabase) => {
    const delete_all_query = `DELETE FROM LearningWords`;
    try {
        await db.executeSql(delete_all_query);
    } catch (error) {
        console.log(error);
        throw Error('Unable to delete all words');
    }
};

//Delete a word (row) from the LearningWords table
export const deleteWord = async (db: SQLiteDatabase, word: string) => { 
    const delete_query = `DELETE FROM LearningWords WHERE word = '${word}'`;
    try { 
        await db.executeSql(delete_query);
    } catch (error){
        console.log(error);
        throw Error('Unable to delete word');
    }
};