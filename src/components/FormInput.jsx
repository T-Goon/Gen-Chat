import React from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

const FormInput = ({ placeholder, label, labelStyles, type, containerStyles, secureTextEntry, multiline, onChangeText }) => {

    return (
        <View style={{ ...styles.container, ...containerStyles }}>
            <Text style={{ ...labelStyles }}>{label}</Text>

            <TextInput style={styles.input}
                placeholder={placeholder}
                keyboardType={type ? type : 'default'}
                secureTextEntry={secureTextEntry ? secureTextEntry : false}
                multiline={multiline ? multiline : false}
                onChangeText={onChangeText ? onChangeText : null} />
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