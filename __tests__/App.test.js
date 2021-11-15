import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';
jest.useFakeTimers();

describe('<App/>', () => {
    it('has i child', async () => {
        const tree = renderer.create(<App />).toJSON();
        const len = tree.children.length;

        expect(len).toBe(1);
    });

});