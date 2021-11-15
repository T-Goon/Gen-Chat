import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import jwt_decode from "jwt-decode";

import { Context } from "../Context";

import FormInput from "../components/FormInput";
import ButtonPrim from "../components/ButtonPrim";

const AddPostScreen = () => {
    const [message, setMessage] = useState('');
    const { sendMessage, getValueFor } = useContext(Context);

    const post = async () => {
        console.log(`posting: ${message}`)
        if(message !== '') {
            const token = await getValueFor('token');
            if(!token) {
                console.log('not Logged in');
                alert('Not logged in.');
                navigation.reset({ index: 1, routes: [{ name: 'Login' }] });
            } else {
                console.log('sending');
                const decoded = jwt_decode(token);
                sendMessage(JSON.stringify({
                    username: decoded.username,
                    message
                }));
            }
            
        }
        
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <FormInput label='Message:' labelStyles={styles.labels} multiline={true} placeholder='message'
                    onChangeText={setMessage} />
            </View>

            <ButtonPrim buttonStyles={styles.postButton} onPress={post} >Post</ButtonPrim>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    form: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 3,
        backgroundColor: 'hsl(230, 100%, 80%)',
        marginBottom: 20
    },
    labels: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    postButton: {
        alignSelf: 'center'
    }
});

export default AddPostScreen;