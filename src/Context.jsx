import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [ws, setWS] = useState(null);

    const connectWS = () => {
        console.log('Connecting to server');
        const ws = new WebSocket('ws://localhost:3000/');
        ws.onopen = () => {
            console.log('Opened ws connection');
        };
        ws.onclose = (e) => {
            console.log('Closed ws connection');
            connectWS();
        };
        ws.onerror = (e) => {
            console.log("error ",e);
        };
        ws.onmessage = (e) => {
            console.log(e);
        };

        setWS(ws);
    }
    
    const sendMessage = (msg) => {
        ws.sendMessage(msg);
    }

    useEffect(() => {
        connectWS();
    }, []);

    return (
        <Context.Provider value={{ sendMessage }}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;