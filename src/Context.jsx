import React, { createContext, useState, useEffect, useReducer } from "react";
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

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
    sendMessage: null,
    messages: [],
    save,
    remove,
    getValueFor
};

export const Context = createContext(initialValue);

const ContextProvider = ({ children }) => {
    const [ws, setWS] = useState(null);
    const [messages, dispatch] = useReducer(reducer, []);
    const [notifToken, setNotifToken] = useState({});

    const registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
            setNotifToken({ expoPushToken: token });

            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: false,
                    shouldSetBadge: false,
                }),
            });
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    };

    const connectWS = () => {
        let mounted = true;

        // console.log('Connecting to server');
        const ws = new WebSocket('ws://localhost:3000/');
        ws.onopen = () => {
            if (mounted)
                setWS(ws);
            // console.log('Opened ws connection');
        };
        ws.onclose = (e) => {
            // console.log('Closed ws connection');
            connectWS();
        };
        // ws.onerror = (e) => {
        // console.log("error ", e);
        // };
        ws.onmessage = (e) => {
            if (mounted)
                dispatch({ type: 'add', payload: e.data });
        };

        return () => {
            mounted = false;
        };
    }

    const sendMessage = (msg) => {
        ws.send(msg);
    }

    useEffect(() => {
        registerForPushNotificationsAsync();
        return connectWS();
    }, []);

    return (
        <Context.Provider value={{
            sendMessage: ws ? sendMessage : initialValue.sendMessage,
            messages, save, remove, getValueFor
        }}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;