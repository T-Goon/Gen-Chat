import React, { useEffect } from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import * as SecureStore from 'expo-secure-store';

import RegisterScreen from '../../src/screens/RegisterScreen';

jest.mock('expo-secure-store');

describe('<RegisterScreen/>', () => {
    it('has i child', () => {
        const tree = render(<RegisterScreen />).toJSON();

        expect(tree.children.length).toBe(2);
    });

    it('renders correctly', () => {
        const tree = render(<RegisterScreen />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('Test Login Checking', async () => {
        const navivation = { replace: jest.fn() };
        SecureStore.getItemAsync.mockResolvedValueOnce('testToken');

        let registerScreen;
        await waitFor(() => {
            registerScreen = render(<RegisterScreen navigation={navivation} />);
        });

        expect(navivation.replace).toHaveBeenCalledWith('Feed');

        SecureStore.getItemAsync.mockRejectedValueOnce(new Error('Some error'));

        await waitFor(() => {
            registerScreen = render(<RegisterScreen navigation={navivation} />);
        });

        expect(navivation.replace.mock.calls.length).toBe(1);
    });

    it('Test Register', async () => {
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
                <RegisterScreen navigation={navigation} />
            );
        }

        let registerScreen;
        await waitFor(() => {
            registerScreen = render(<TestComponent />);
        });

        // successful login
        await fireEvent(registerScreen.getByPlaceholderText('username'), 'changeText', 'testUser');
        await fireEvent(registerScreen.getByPlaceholderText('password'), 'changeText', 'testPassword');
        await fireEvent(registerScreen.getByPlaceholderText('confirm password'), 'changeText', 'testPassword');
        await fireEvent(registerScreen.getByText('Submit'), 'press');

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: 'testUser', password: 'testPassword', confirmPassword: 'testPassword' })
        });

        // Fetch when resolved value has error value
        await fireEvent(registerScreen.getByPlaceholderText('username'), 'changeText', 'testUser');
        await fireEvent(registerScreen.getByPlaceholderText('password'), 'changeText', 'testPassword');
        await fireEvent(registerScreen.getByPlaceholderText('confirm password'), 'changeText', 'testPassword');
        await fireEvent(registerScreen.getByText('Submit'), 'press');

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: 'testUser', password: 'testPassword', confirmPassword: 'testPassword' })
        });
        expect(global.fetch.mock.calls.length).toBe(2);

        // Fetch catch branch
        await fireEvent(registerScreen.getByPlaceholderText('username'), 'changeText', 'testUser');
        await fireEvent(registerScreen.getByPlaceholderText('password'), 'changeText', 'testPassword');
        await fireEvent(registerScreen.getByPlaceholderText('confirm password'), 'changeText', 'testPassword');
        await fireEvent(registerScreen.getByText('Submit'), 'press');

        await expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: 'testUser', password: 'testPassword', confirmPassword: 'testPassword' })
        });
        await expect(global.fetch.mock.calls.length).toBe(3);
    });
});