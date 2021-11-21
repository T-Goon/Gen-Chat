import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import FeedItem from "../components/FeedItem";

import { Context } from "../Context";

const FeedScreen = ({ navigation }) => {
    const { messages } = useContext(Context);

    const renderItem = ({ item }) => {
        const json = JSON.parse(item);
        return (
            <FeedItem username={json.username} message={json.message} />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Feed</Text>
                <Pressable testID='settings-button' style={styles.settingsButton} onPress={() => { navigation.navigate('Settings'); }}>
                    <FontAwesomeIcon icon={faCog} size={28} />
                </Pressable>
            </View>
            <FlatList
                style={styles.list}
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item, index) => index} />
            <Pressable testID='add-post-button' style={styles.postButton} onPress={() => { navigation.navigate('Send Post'); }}>
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