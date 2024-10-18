import React, {useContext, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import {AuthContext} from "./AuthContext";

const ListeUtilisateursScreen = ({onSend}) => {
    const {authToken} = useContext(AuthContext);

    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [showSendButton, setShowSendButton] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setRefreshing(true);
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + authToken
                }
            };
            const response = await axios.get('https://mysnapchat.epidoc.eu/user', config);
            setUsers(response.data.data);
            setError(null);
        } catch (error) {
            console.error(error.response?.data?.data ?? error);
            setError('Une erreur s\'est produite lors de la récupération des utilisateurs.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const renderItem = ({item}) => (
        <TouchableOpacity
            style={[
                styles.userItem,
                item._id === selectedUser?._id && styles.selectedUserItem
            ]}
            onPress={() => handleSend(item)}
        >
            <Text style={styles.username}>{item.username}</Text>
        </TouchableOpacity>
    );

    const handleSend = (user) => {
        setSelectedUser(user);
        setShowSendButton(true);
    };

    const handleRefresh = () => {
        if (!loading) {
            fetchUsers();
        }
    };

    return (
        <View style={styles.container}>
            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <FlatList
                    data={users}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                        />
                    }
                />
            )}
            {showSendButton && (
                <TouchableOpacity style={styles.sendButton} onPress={() => onSend(handleSend)}>
                    <Text style={styles.buttonText}>Envoyer</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(216, 217, 150, 0.31)',
    },
    userItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'yellow',
        color: 'white',
    },
    selectedUserItem: {
        backgroundColor: 'grey',
    },
    sendButton: {
        backgroundColor: 'yellow',
        paddingVertical: 12,
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        right: 30,
        paddingHorizontal: 12,
        borderRadius: 100,
    },
    buttonText: {
        color: 'black',
        fontSize: 25,
    },
    username: {
        fontSize: 16,
        color: 'black',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 16,
    },
});

export default ListeUtilisateursScreen;
