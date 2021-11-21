import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import FeedScreen from '../../src/screens/FeedScreen';

jest.mock('../../src/Context', () => {
    const originalModule = jest.requireActual('../../src/Context');
    const { createContext } = jest.requireActual('react');

    const initialValue = {
        messages: [JSON.stringify({ username: 'testUser', message: 'testMessage' })]
    };

    return {
        __esModule: true,
        ...originalModule,
        Context: createContext(initialValue)
    };
});


describe('<FeedScreen />', () => {

    it('has i child', async () => {
        const tree = render(<FeedScreen />).toJSON();

        expect(tree.children.length).toBe(3);
    });

    it('renders correctly', async () => {
        const tree = render(<FeedScreen />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('Go To Settings', async () => {
        const navigation = { navigate: jest.fn() };
        const feedScreen = render(<FeedScreen navigation={navigation} />);

        await fireEvent(feedScreen.getByTestId('settings-button'), 'press');
        await expect(navigation.navigate).toHaveBeenCalledWith('Settings');
    });

    it('Go To Add Post', async () => {
        const navigation = { navigate: jest.fn() };
        const feedScreen = render(<FeedScreen navigation={navigation} />);

        await fireEvent(feedScreen.getByTestId('add-post-button'), 'press');
        await expect(navigation.navigate).toHaveBeenCalledWith('Send Post');
    });
});