import React, { useState, useCallback, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import FormInput from '../components/FormInput';
import ButtonPrim from '../components/ButtonPrim';
import LoginRegHere from '../components/LoginRegHere';

import { Context, getValueFor } from '../Context';

const LoginScreen = ({ navigation }) => {
    const { save, getValueFor } = useContext(Context);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        getValueFor('token')
            .then((token) => {
                if(token) {
                    navigation.replace('Feed');
                }
            })
            .catch((err) => {
                alert('An error has occurred.');
            });
    }, []);

    const login = useCallback(() => {
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, username })
        }).then(async (res) => {
            const data = await res.json();

            if (!data.error) {
                save('token', data.token);
                navigation.replace('Feed');
            } else {
                alert(data.error);
            }
        }).catch((err) => {
            alert('An error occured. Failed to login.');
        });

    }, [username, password]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Gen Chat</Text>

            <View style={styles.form}>

                <Text style={styles.title}>Login</Text>

                <FormInput containerStyles={{ paddingHorizontal: 15, marginVertical: 5 }}
                    label='Username:' placeholder='username' onChangeText={setUsername} />
                <FormInput containerStyles={{ paddingHorizontal: 15, marginVertical: 5, marginBottom: 20 }}
                    label='Password:' placeholder='password' secureTextEntry={true} onChangeText={setPassword} />

                <ButtonPrim buttonStyles={styles.loginButton}
                    onPress={login}>Submit</ButtonPrim>
                <LoginRegHere navigation={navigation} msg={'Don\'t have an account? Register '} location='Register' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24
    },
    header: {
        position: 'absolute',
        top: 0,
        fontSize: 50
    },
    form: {
        width: '80%',
        paddingVertical: 50,
        borderRadius: 30,
        borderColor: 'black',
        borderWidth: 3,
        backgroundColor: 'hsl(230, 100%, 80%)',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    loginButton: {
        alignSelf: 'center',
        marginBottom: 20
    }
});

export default LoginScreen;