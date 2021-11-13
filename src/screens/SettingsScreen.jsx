import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

import ButtonPrim from "../components/ButtonPrim";
import { Context } from '../Context';

const SettingsScreen = ({ navigation }) => {
    const { remove } = useContext(Context);

    return (
        <View style={styles.container}>
            <ButtonPrim buttonStyles={styles.logout} onPress={async () => {
                await remove('token');
                navigation.reset({ index: 1, routes: [{ name: 'Login' }] });
            }
            }>Logout</ButtonPrim>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    logout: {
        alignSelf: 'center',
        backgroundColor: 'hsl(0, 100%, 50%)'
    }
});

export default SettingsScreen;