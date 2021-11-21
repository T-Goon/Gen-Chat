import React, { useEffect } from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import * as SecureStore from 'expo-secure-store';

import LoginScreen from '../../src/screens/LoginScreen';

jest.mock('expo-secure-store');

describe('<LoginScreen/>', () => {

    it('has i child', async () => {
        const tree = render(<LoginScreen />).toJSON();

        expect(tree.children.length).toBe(2);
    });

    it('renders correctly', async () => {
        const tree = render(<LoginScreen />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('Test Login Checking', async () => {
        const navigation = { replace: jest.fn() };
        SecureStore.getItemAsync.mockResolvedValueOnce('testToken');

        let loginScreen;
        await waitFor(() => {
            loginScreen = render(<LoginScreen navigation={navigation} />);
        });

        expect(navigation.replace).toHaveBeenCalledWith('Feed');

        SecureStore.getItemAsync.mockRejectedValueOnce(new Error('Some error'));

        await waitFor(() => {
            loginScreen = render(<LoginScreen navigation={navigation} />);
        });

        expect(navigation.replace.mock.calls.length).toBe(1);
    });

    it('Test Login', async () => {
        const navigation = { replace: jest.fn() };
        SecureStore.getItemAsync.mockResolvedValue(null);

        global.fetch = jest.fn()
            .mockResolvedValueOnce({ json: () => { return { token: 'testToken', error: null } } })
            .mockResolvedValueOnce({ json: () => { return { token: null, error: 'testError' } } })
            .mockRejectedValueOnce(new Error('testError'));
        global.alert = jest.fn();

        const TestComponent = () => {
            useEffect(async () => {
                // Test for mocked function called in Promise callbacks
                await expect(navigation.replace).toHaveBeenCalledWith('Feed');
                await expect(navigation.replace.mock.calls.length).toBe(1);

                await expect(global.alert).toHaveBeenCalledWith('testError');
                await expect(global.alert).toHaveBeenCalledWith('An error occured. Failed to register.');
                await expect(global.alert.mock.calls.length).toBe(2);
            }, []);

            return (
                <LoginScreen navigation={navigation} />
            );
        }

        let loginScreen;
        await waitFor(() => {
            loginScreen = render(<TestComponent />);
        });

        // successful login
        await fireEvent(loginScreen.getByPlaceholderText('username'), 'changeText', 'testUser');
        await fireEvent(loginScreen.getByPlaceholderText('password'), 'changeText', 'testPassword');
        await fireEvent(loginScreen.getByText('Submit'), 'press');

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: 'testPassword', username: 'testUser' })
        });

        // Fetch when resolved value has error value
        await fireEvent(loginScreen.getByPlaceholderText('username'), 'changeText', 'testUser');
        await fireEvent(loginScreen.getByPlaceholderText('password'), 'changeText', 'testPassword');
        await fireEvent(loginScreen.getByText('Submit'), 'press');

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: 'testPassword', username: 'testUser' })
        });
        expect(global.fetch.mock.calls.length).toBe(2);

        // Fetch catch branch
        await fireEvent(loginScreen.getByPlaceholderText('username'), 'changeText', 'testUser');
        await fireEvent(loginScreen.getByPlaceholderText('password'), 'changeText', 'testPassword');
        await fireEvent(loginScreen.getByText('Submit'), 'press');

        await expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: 'testPassword', username: 'testUser' })
        });
        await expect(global.fetch.mock.calls.length).toBe(3);
    });
});