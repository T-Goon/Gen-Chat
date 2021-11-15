import React from 'react';
import renderer from 'react-test-renderer';

import RegisterScreen from '../../src/screens/RegisterScreen';
import ContextProvider from '../../src/Context';
jest.useFakeTimers();

import WS from "jest-websocket-mock";

const server = new WS("ws://localhost:3000");

describe('<RegisterScreen/>', () => {
    beforeEach(()=>{
        global.WebSocket = WebSocket;
    });

    it('has i child', async () => {
        const tree = renderer.create(
            <ContextProvider>
                <RegisterScreen />
            </ContextProvider>).toJSON();

        expect(tree.children.length).toBe(2);


    });

    it('renders correctly', async () => {
        const tree = renderer.create(
            <ContextProvider>
                <RegisterScreen />
            </ContextProvider>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });


});