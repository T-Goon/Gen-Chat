import React from 'react';
// import renderer from 'react-test-renderer';
import { render, fireEvent, act } from '@testing-library/react-native';

import LoginScreen from '../../src/screens/LoginScreen';

describe('<LoginScreen/>', () => {

    it('has i child', async () => {
        const tree = render(<LoginScreen />).toJSON();

        expect(tree.children.length).toBe(2);
    });

    it('renders correctly', async () => {
        const tree = render(<LoginScreen />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});