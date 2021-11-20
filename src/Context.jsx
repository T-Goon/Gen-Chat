import React, { createContext, useState, useEffect, useReducer } from "react";
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

async function remove(key) {
    await SecureStore.deleteItemAsync(key);
}

async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result;
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return [...state, action.payload]
    }
}

const initialValue = {
    sendMessage: () => { throw new Error('Overwrite this function'); },
    messages: [],
    save,
    remove,
    getValueFor
};

export const Context = createContext(initialValue);

const ContextProvider = ({ children }) => {
    const [ws, setWS] = useState(null);
    const [messages, dispatch] = useReducer(reducer, []);

    const connectWS = () => {
        // console.log('Connecting to server');
        const ws = new WebSocket('ws://localhost:3000/');
        ws.onopen = () => {
            setWS(ws);
            // console.log('Opened ws connection');
        };
        ws.onclose = (e) => {
            // console.log('Closed ws connection');
            connectWS();
        };
        ws.onerror = (e) => {
            // console.log("error ", e);
        };
        ws.onmessage = (e) => {
            dispatch({ type: 'add', payload: e.data });
        };
    }

    const sendMessage = (msg) => {
        ws.send(msg);
    }

    useEffect(() => {
        connectWS();
    }, []);

    return (
        <Context.Provider value={{ sendMessage, messages, save, remove, getValueFor }}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;