import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

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

const FeedScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <FeedItem title={item.title} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Feed</Text>
                <Pressable style={styles.settingsButton} onPress={() => { navigation.navigate('Settings'); }}>
                    <FontAwesomeIcon icon={faCog} size={28} />
                </Pressable>
            </View>
            <FlatList
                style={styles.list}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id} />
            <Pressable style={styles.postButton} onPress={() => {navigation.navigate('Add Post');}}>
                <FontAwesomeIcon icon={faPlusCircle} color='hsla(0, 0%, 0%,.5)' size={50} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 39,
        marginBottom: 20,
        marginHorizontal: 15
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    settingsButton: {
        flex: 1,
        flexDirection: 'row-reverse'
    },
    list: {
    },
    postButton: {
        position: 'absolute',
        bottom: 0,
        right: 0
    }
});

export default FeedScreen;