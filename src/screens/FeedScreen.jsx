import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import FeedItem from "../components/FeedItem";

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const FeedScreen = () => {
    const renderItem = ({ item }) => (
        <FeedItem title={item.title} />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Feed</Text>
            <FlatList
                style={styles.list}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 39,
        marginHorizontal: 15
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    list: {

    }
});

export default FeedScreen;