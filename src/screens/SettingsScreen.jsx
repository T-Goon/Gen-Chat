import React from "react";
import { View, StyleSheet } from "react-native";

import ButtonPrim from "../components/ButtonPrim";

const SettingsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ButtonPrim buttonStyles={styles.logout} onPress={() => {
                navigation.reset({ index: 1, routes: [{ name: 'Login' }] });
            }
            }>Logout</ButtonPrim>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    logout: {
        alignSelf: 'center',
        backgroundColor: 'hsl(0, 100%, 50%)'
    }
});

export default SettingsScreen;