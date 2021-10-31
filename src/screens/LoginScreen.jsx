import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import FormInput from '../components/FormInput';
import ButtonPrim from '../components/ButtonPrim';

const LoginScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Gen Chat</Text>

            <View style={styles.form}>
                
                <Text style={styles.title}>Login</Text>

                <FormInput containerStyles={{ paddingHorizontal: 15, marginVertical: 5 }}
                    label='Username:' placeholder='username' />
                <FormInput containerStyles={{ paddingHorizontal: 15, marginVertical: 5, marginBottom: 20 }}
                    label='Password:' placeholder='password' secureTextEntry={true} />

                <ButtonPrim buttonStyles={styles.loginButton}
                    onPress={() => {
                        navigation.replace('feed');
                    }}>Submit</ButtonPrim>
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
        alignSelf: 'center'
    }
});

export default LoginScreen;