import React from 'react';
import renderer from 'react-test-renderer';

import SettingsScreen from '../../src/screens/SettingsScreen';
import ContextProvider from '../../src/Context';
jest.useFakeTimers();

import WS from "jest-websocket-mock";

const server = new WS("ws://localhost:3000");

describe('<SettingsScreen/>', () => {
    beforeEach(()=>{
        global.WebSocket = WebSocket;
    });

    it('has i child', async () => {
        const tree = renderer.create(
            <ContextProvider>
                <SettingsScreen />
            </ContextProvider>).toJSON();

        expect(tree.children.length).toBe(1);


    });

    it('renders correctly', async () => {
        const tree = renderer.create(
            <ContextProvider>
                <SettingsScreen />
            </ContextProvider>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });


});