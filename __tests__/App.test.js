import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import * as SecureStore from 'expo-secure-store';
import WS from "jest-websocket-mock";
import { WebSocket } from 'mock-socket';

import App from '../App.jsx';

jest.useFakeTimers();
jest.mock('expo-secure-store');
jest.mock('../src/Context', () => {
    const originalModule = jest.requireActual('../src/Context');
    const { createContext } = jest.requireActual('react');

    const messages = [];
    const initialValue = {
        ...originalModule.Context._currentValue,
        sendMessage: jest.fn((msg) => messages.push(msg)),
        messages
    };

    return {
        __esModule: true,
        ...originalModule,
        Context: createContext(initialValue)
    };
});

let server;
describe('<App/>', () => {
    beforeEach(() => {
        server = new WS("ws://localhost:3000");
        global.WebSocket = WebSocket;
    });

    afterEach(() => {
        WS.clean();
    });

    it('has i child', async () => {

        let app;
        await waitFor(() => { app = render(<App />); });
        await server.connected;

        const len = app.toJSON().children.length;
        expect(len).toBe(1);
    });

    it('Test Navigation', async () => {
        SecureStore.getItemAsync.mockResolvedValueOnce(null);

        global.fetch = jest.fn()
            .mockResolvedValueOnce({ json: () => { return { token: 'testToken', error: null } } })

        let app;
        await waitFor(() => {
            app = render(<App />);
        });
        await server.connected;

        // in login screen
        expect(app.getByText('Login')).toBeTruthy();

        // successful login
        await fireEvent(app.getByPlaceholderText('username'), 'changeText', 'testUser');
        await fireEvent(app.getByPlaceholderText('password'), 'changeText', 'testPassword');
        await fireEvent(app.getByText('Submit'), 'press');

        SecureStore.getItemAsync.mockResolvedValueOnce('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIn0.2TugZitOC_LiVq2DXbSvoonnNM2htjP9iF5FYLQ4Gew');

        // Now in Feed Screen
        expect(await app.findByText('Feed')).toBeTruthy();
        await fireEvent(await app.findByTestId('add-post-button'), 'press');

        // Now in Add Post Screen
        expect(await app.findByText('Post')).toBeTruthy();
        await fireEvent(await app.getByPlaceholderText('message'), 'changeText', 'testMessage')
        await fireEvent(await app.getByText('Post'), 'press');
    });
});