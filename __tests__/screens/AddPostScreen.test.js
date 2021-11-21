import React, { useContext, useEffect } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import * as SecureStore from 'expo-secure-store';

import AddPostScreen from '../../src/screens/AddPostScreen';
import { Context } from '../../src/Context';

jest.mock('expo-secure-store');
jest.mock('../../src/Context', () => {
    const originalModule = jest.requireActual('../../src/Context');
    const { createContext } = jest.requireActual('react');

    const initialValue = {
        ...originalModule.Context._currentValue,
        sendMessage: jest.fn()
    };

    return {
        __esModule: true,
        ...originalModule,
        Context: createContext(initialValue)
    };
});

describe('<AddPostScreen/>', () => {
    it('has i child', async () => {
        const tree = render(<AddPostScreen />).toJSON();
        expect(tree.children.length).toBe(2);
    });

    it('renders correctly', async () => {
        const tree = render(<AddPostScreen />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('Send Post', async () => {
        SecureStore.getItemAsync.mockResolvedValueOnce('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIn0.2TugZitOC_LiVq2DXbSvoonnNM2htjP9iF5FYLQ4Gew');

        // User is logged in
        let TestComponent = () => {
            const { sendMessage } = useContext(Context);

            useEffect(async () => { // Runs after event are fired
                await expect(sendMessage).toHaveBeenCalledWith(
                    JSON.stringify({ username: 'testUser', message: 'testMessage' }));
                await expect(sendMessage.mock.calls.length).toBe(1);
            }, []);

            return (<AddPostScreen />);
        }

        let addPostScreen;
        await waitFor(() => {
            addPostScreen = render(<TestComponent />);
        });

        await fireEvent(addPostScreen.getByPlaceholderText('message'), 'changeText', 'testMessage')
        await fireEvent(addPostScreen.getByText('Post'), 'press');

        // Message is empty
        await fireEvent(addPostScreen.getByPlaceholderText('message'), 'changeText', '')
        await fireEvent(addPostScreen.getByText('Post'), 'press');

        // User is not logged in
        global.alert = jest.fn();
        const navigation = { reset: jest.fn() };
        SecureStore.getItemAsync.mockResolvedValueOnce(null);

        await waitFor(() => {
            addPostScreen = render(<AddPostScreen navigation={navigation} />);
        });

        await fireEvent(addPostScreen.getByPlaceholderText('message'), 'changeText', 'testMessage')
        await fireEvent(addPostScreen.getByText('Post'), 'press');

        await expect(global.alert).toHaveBeenCalledWith('Not logged in.');
        await expect(navigation.reset).toHaveBeenCalledWith({ index: 1, routes: [{ name: 'Login' }] });
    });
});