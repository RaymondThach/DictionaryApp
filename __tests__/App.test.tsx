/** Jest tests for logic within utils file
 * @format
 */

import 'react-native';
//import React from 'react';
//import Home from '../components/home';
import GetRandWord from '../utils/GetRandWord';

// Note: import explicitly to use the types shipped with jest.
import {it, expect} from '@jest/globals';
import GetWordDef from '../utils/GetWordDef';
//import renderer from 'react-test-renderer';

//import example mock JSON from the API
import mockJSON from './gas.json';

//mock data imitating the fetch to APIs
let mockData = jest.fn();

// it('renders correctly', () => {
//   renderer.create(<Home />);
// });

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
it('gets the first definition of a given word of the JSON file from the API', async () => {
  mockData = jest.fn(() => 
    Promise.resolve({
      json: () => Promise.resolve(mockJSON[0])
    })
  ) as jest.Mock;
  global.fetch = mockData;
  const def = await GetWordDef('gas');
  expect(def).toEqual(mockJSON[0]);
});