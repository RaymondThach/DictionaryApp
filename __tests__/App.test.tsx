/** Jest tests for logic for any helper functions and within utils file
 * @format
 */

import 'react-native';

// Note: import explicitly to use the types shipped with jest.
import {it, expect} from '@jest/globals';

//import example mock JSON from the API
import mockJSON from './gas.json';

//Utils functions
import GetRandWord from '../utils/GetRandWord';
import GetWordDef, {wordTrimmer} from '../utils/GetWordDef';
import SortBy from '../utils/SortBy';

//mock data imitating the fetch to APIs
let mockData = jest.fn();

//Clear the mock fetch data and global.fetch before each test
beforeEach( () => {
    mockData.mockClear();
    global.fetch = mockData;
  }
);

//Mock fetch data from the https://random-word-api.herokuapp.com/word end point
//for GetRandWord function, sends the word "test" wrapped in two promises
//GetRandWord() receives the word "test" wrapped in two promises
//test expects the word "test"
it('GetRandomWord() returns the word, test', async () => {
  mockData = jest.fn(() => 
    Promise.resolve({
      json: () => Promise.resolve(['test'])
    })
  ) as jest.Mock;
  global.fetch = mockData;
  const word = await GetRandWord();
  expect(word).toEqual('test');
});

// //GetRandWord() receives a promise rejection from the API
it('handles exceptions with no words sent from API', async() => {
  mockData = jest.fn(() => 
    Promise.reject("API failure"), 
  ) as jest.Mock;
  global.fetch = mockData;
  const word = await GetRandWord();
  expect(word).toEqual("No Word Available");
});

//GetWordDef() receive the first definition from the JSON response. Uses gas.json file for the word Gas.
it('gets the definition of the first variation of the word, and audio link give a JSON file from the API', async () => {
  mockData = jest.fn(() => 
    Promise.resolve({
      json: () => Promise.resolve([mockJSON[0]])
    })
  ) as jest.Mock;
  global.fetch = mockData;
  const def = await GetWordDef('gas');
  expect(def).toEqual({
    word: 'gas', 
    definition: ["a fluid (such as air) that has neither independent shape nor volume but tends to expand indefinitely", "a combustible gas or gaseous mixture for fuel or lighting; especially : natural gas", "a gaseous product of digestion; also : discomfort from this",], 
    audio: 'https://media.merriam-webster.com/audio/prons/en/us/mp3/g/gas00001.mp3'});
});

//wordTrimmer() within GetWordDef.ts, ensure the function returns the string word correctly
it('trims the word within the API response and returns it correctly formatted', async () => {
  const test_word = 'conserve:1';
  const trimmed_word = wordTrimmer(test_word);
  expect(trimmed_word).toEqual('conserve');
});

//SortAlphabetical() within SortAlphabetical.ts, ensure function returns results sorted alphabetically for the Learning List
it('sorts the array, and returns the array alphabetically in A to Z order', () => {
  const array = [{ "id": 30, "word": "cartelize" }, { "id": 20, "word": "blue" }, { "id": 40, "word": "assessment" }];
  SortBy(array, 'A-Z', 'word');
  expect(array).toEqual([{ id: 40, word: 'assessment' }, { id: 20, word: 'blue' }, {  id: 30, word: 'cartelize' }]);
});

//SortAlphabetical() within SortAlphabetical.ts, ensure function returns results sorted alphabetically for the Learning List
it('sorts the array, and returns the array numerically from 1-9 order', () => {
  const array = [{ "id": 30, "word": "cartelize" }, { "id": 20, "word": "blue" }, { "id": 40, "word": "assessment" }];
  SortBy(array, '1-9', 'id');
  expect(array).toEqual([{ id: 20, word: 'blue' }, {  id: 30, word: 'cartelize' }, { id: 40, word: 'assessment' }]);
});