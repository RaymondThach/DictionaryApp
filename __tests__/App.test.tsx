/** Jest tests for logic within utils file
 * @format
 */

import 'react-native';
//import React from 'react';
//import Home from '../components/home';
import GetRandWord from '../utils/GetRandWord';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
//import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   renderer.create(<Home />);
// });

//Mock fetch data from the https://random-word-api.herokuapp.com/word end point
//for GetRandWord function, sends the word "test" wrapped in two promises
global.fetch = jest.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve(['test'])
  })
) as jest.Mock;

//GetRandWord() receives the word "test" wrapped in two promises
//test expects the word "test"
it('given the app renders correctly, GetRandomWord() returns the word, test', async () => {
  const word = await GetRandWord();
  expect(word).toEqual('test');
});

//GetRandWord() receives a promise rejection from the API
it('handles exceptions with no words sent from API', async() => {
  global.fetch = jest.fn(() => 
    Promise.reject("API failure"), 
  ) as jest.Mock;
  const word = await GetRandWord();
  expect(word).toEqual("No Word Available");
});