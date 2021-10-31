import React from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

const FormInput = ({ placeholder, label, type, containerStyles, secureTextEntry }) => {

    return (
        <View style={{ ...styles.container, ...containerStyles }}>
            <Text>{label}</Text>

            <TextInput style={styles.input}
                placeholder={placeholder}
                keyboardType={type ? type : 'default'}
                secureTextEntry={secureTextEntry ? secureTextEntry : false} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    input: {
        paddingHorizontal: 10,
        borderColor: "black",
        backgroundColor: 'hsl(0, 0%, 95%)',
        borderWidth: 2,
        borderRadius: 5,
    }
});

export default FormInput;