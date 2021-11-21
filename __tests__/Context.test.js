import React, { useContext } from 'react';
import { Pressable, Text } from 'react-native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import * as SecureStore from 'expo-secure-store';
import WS from "jest-websocket-mock";
import { WebSocket } from 'mock-socket';

import ContextProvider, { Context } from '../src/Context';

jest.useFakeTimers();
jest.mock('expo-secure-store');

let server;
describe('<Context/>', () => {
    beforeAll(() => {
        server = new WS("ws://localhost:3000");
        global.WebSocket = WebSocket;
    });

    afterAll(() => {
        WS.clean();
    });

    it('has i child', async () => {

        let app;
        await waitFor(() => {
            app = render(
                <ContextProvider>
                    <Pressable>
                        <Text>Hi</Text>
                    </Pressable>
                </ContextProvider>
            );
        });
        await server.connected;

        const len = app.toJSON().children.length;
        expect(len).toBe(1);
    });

    it('test save()', async () => {
        // SecureStore.setItemAsync.mockResolvedValue();

        const TestComponent = () => {
            const { save } = useContext(Context);

            return (
                <ContextProvider>
                    <Pressable onPress={() => save('testKey', 'testValue')}>
                        <Text>Hi</Text>
                    </Pressable>
                </ContextProvider>
            );
        }

        let testComponent;
        await waitFor(() => {
            testComponent = render(<TestComponent />);
        });
        await server.connected;

        fireEvent(testComponent.getByText('Hi'), 'press');
        expect(SecureStore.setItemAsync).toHaveBeenCalledWith('testKey', 'testValue');
    });
});