import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FeedItem = ({ title }) => {
    return (
        <View style={styles.container}>
            <Text>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'hsl(230, 100%, 80%)',
        marginVertical: 5,
        padding: 5,
        borderRadius: 10
    }
});

export default FeedItem;