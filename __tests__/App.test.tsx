/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../components/App';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

// it('given the app renders correctly, GetRandomWord() returns hello', () => {
//   expect(GetRandomWord()).toBe('hello');
// });