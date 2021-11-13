import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FeedItem = ({ username, message }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.username}>{username+':'}</Text>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'hsl(230, 100%, 80%)',
        marginVertical: 5,
        padding: 5,
        borderRadius: 10
    }, 
    username: {
        fontWeight: 'bold',
        fontSize: 20
    },
    message: {
        paddingLeft: 20
    }
});

export default FeedItem;