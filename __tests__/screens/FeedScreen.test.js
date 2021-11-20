import React from 'react';
// import renderer from 'react-test-renderer';
import { render, fireEvent, act } from '@testing-library/react-native';

import FeedScreen from '../../src/screens/FeedScreen';
import ContextProvider from '../../src/Context';

import WS from "jest-websocket-mock";

// create a WS instance, listening on port 1234 on localhost
const server = new WS("ws://localhost:3000");

describe('<FeedScreen />', () => {
    beforeEach(()=>{
        global.WebSocket = WebSocket;
    });

    it('has i child', async () => {
        const tree = render(<FeedScreen />).toJSON();

        expect(tree.children.length).toBe(3);
    });

    it('renders correctly', async () => {
        const tree = render(<FeedScreen />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});