import React from 'react';
import renderer from 'react-test-renderer';

import FeedScreen from '../../src/screens/FeedScreen';
import ContextProvider from '../../src/Context';
jest.useFakeTimers();

import WS from "jest-websocket-mock";

// create a WS instance, listening on port 1234 on localhost
const server = new WS("ws://localhost:3000");

describe('<FeedScreen />', () => {
    beforeEach(()=>{
        global.WebSocket = WebSocket;
    });

    it('has i child', async () => {
        const tree = renderer.create(
            <ContextProvider>
                <FeedScreen />
            </ContextProvider>).toJSON();

        server.send("hello everyone1");
        server.send("hello everyone2");

        expect(tree.children.length).toBe(3);

        WS.clean();
    });

    it('renders correctly', async () => {
        const tree = renderer.create(
            <ContextProvider>
                <FeedScreen />
            </ContextProvider>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });


});