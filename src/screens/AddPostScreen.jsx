import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

import { Context } from "../Context";

import FormInput from "../components/FormInput";
import ButtonPrim from "../components/ButtonPrim";

const AddPostScreen = () => {
    const { ws } = useContext(Context);

    const post = () => {
        ws.send('hellow');
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <FormInput label='Title:' labelStyles={styles.labels} placeholder='title' />
                <FormInput label='Body:' labelStyles={styles.labels} multiline={true} />
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