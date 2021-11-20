import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import WS from "jest-websocket-mock";
import { WebSocket } from 'mock-socket';
jest.useFakeTimers();

import App from '../App.jsx';

let server;
describe('<App/>', () => {
    beforeAll(() => {
        server = new WS("ws://localhost:3000");
        global.WebSocket = WebSocket;
    });

    afterAll(() => {
        WS.clean();
    });

    it('has i child', async () => {

        let app;
        await waitFor(() => { app = render(<App />); });
        await server.connected;


        const len = app.toJSON().children.length;
        expect(len).toBe(1);
    });
});