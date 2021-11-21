import React, { useState, useContext, useCallback, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import FormInput from '../components/FormInput';
import ButtonPrim from '../components/ButtonPrim';
import LoginRegHere from '../components/LoginRegHere';

import { Context } from '../Context';

const RegisterScreen = ({ navigation }) => {
    const { save, getValueFor } = useContext(Context);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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

    const register = useCallback(() => {
        fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, confirmPassword })
        }).then(async (res) => {
            const data = await res.json();

            if(!data.error) {
                save('token', data.token);
                navigation.replace('Feed');
            } else {
                alert(data.error);
            }
        }).catch((err) => {
            alert('An error occured. Failed to register.');
        });
    }, [username, password, confirmPassword]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Gen Chat</Text>

            <View style={styles.form}>

                <Text style={styles.title}>Register</Text>

                <FormInput containerStyles={{ paddingHorizontal: 15, marginVertical: 20 }}
                    label='Username:' placeholder='username' onChangeText={setUsername} />
                <FormInput containerStyles={{ paddingHorizontal: 15, marginVertical: 5 }}
                    label='Password:' placeholder='password' secureTextEntry={true} onChangeText={setPassword} />
                <FormInput containerStyles={{ paddingHorizontal: 15, marginVertical: 5, marginBottom: 20 }}
                    label='Confirm Password:' placeholder='confirm password' secureTextEntry={true} onChangeText={setConfirmPassword} />

                <ButtonPrim buttonStyles={styles.loginButton}
                    onPress={register}>Submit</ButtonPrim>
                <LoginRegHere navigation={navigation} msg={'Already have an account? Login '} location='Login' />
            </View>
        </View>
    );
};

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

export default RegisterScreen;