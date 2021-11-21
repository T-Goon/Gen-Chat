import React, { useContext, useEffect } from 'react';
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
    beforeEach(() => {
        server = new WS("ws://localhost:3000");
        global.WebSocket = WebSocket;
    });

    afterEach(() => {
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

    it('test remove()', async () => {

        const TestComponent = () => {
            const { remove } = useContext(Context);

            return (
                <ContextProvider>
                    <Pressable onPress={() => remove('testKey')}>
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
        expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('testKey');
    });

    it('test getValueFor()', async () => {

        SecureStore.getItemAsync.mockResolvedValue('testResponse');
        let retVal = null;
        const TestComponent = () => {
            const { getValueFor } = useContext(Context);

            return (
                <ContextProvider>
                    <Pressable onPress={async () => {
                        retVal = await getValueFor('testKey');
                    }}>
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

        await fireEvent(testComponent.getByText('Hi'), 'press');

        expect(SecureStore.getItemAsync).toHaveBeenCalledWith('testKey');
        expect(retVal).toBe('testResponse');

        SecureStore.getItemAsync.mockResolvedValue(null);

        await waitFor(() => {
            testComponent = render(<TestComponent />);
        });
        await server.connected;

        await fireEvent(testComponent.getByText('Hi'), 'press');

        expect(SecureStore.getItemAsync).toHaveBeenCalledWith('testKey');
        expect(retVal).toBeUndefined();
    });

    it('Receive Message', async () => {

        let testMessages;
        const TestComponent = () => {
            const { messages } = useContext(Context);

            useEffect(() => {
                testMessages = messages;
            }, [messages]);

            return (
                <ContextProvider>
                    <Pressable onPress={() => { }}>
                        <Text>Hi</Text>
                    </Pressable>
                </ContextProvider>
            );
        }

        const message1 = JSON.stringify({ username: 'TestUser', message: 'TestUser message' });
        let testComponent;
        await waitFor(async () => {
            testComponent = render(<TestComponent />);
            await server.connected;

            server.send(message1);
        });

        waitFor(() => {
            expect(testMessages).toEqual([message1]);
        });
        
        testComponent.unmount();
        server.send(message1);
    });

    it('sendMessage() Initial value', async () => {
        const TestComponent = () => {
            const { sendMessage } = useContext(Context);

            useEffect(async () => {
                await expect(sendMessage).toBeNull();
            }, [])

            return (<Text>Hi</Text>);
        }

        await waitFor(async () => {
            testComponent = render(<TestComponent />);
        });
    });

    it('sendMessage() Test', async () => {
        let sendMessageTest;
        const TestComponent = () => {
            const { sendMessage } = useContext(Context);

            useEffect(async () => {
                sendMessageTest = sendMessage;
                await waitFor(() => sendMessage('Test Message'));
            }, [sendMessage])

            return (
                <Text>Hi</Text>
            );
        }

        let testComponent;
        await waitFor(() => {
            testComponent = render(
                <ContextProvider>
                    <TestComponent />
                </ContextProvider>);
        });
        await server.connected;

        await expect(server).toReceiveMessage('Test Message');
    });

});