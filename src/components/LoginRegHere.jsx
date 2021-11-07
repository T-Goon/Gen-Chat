import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const LoginRegHere = ({ navigation, msg, location }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Text>{msg}</Text>
            <Pressable onPress={() => { navigation.replace(location); }}>
                <Text style={styles.here}>here</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    here: {
        color: 'red',
        borderBottomWidth: 1,
        borderBottomColor: 'red'
    }
});

export default LoginRegHere;