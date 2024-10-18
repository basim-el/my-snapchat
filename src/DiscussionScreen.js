import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, Text, View} from 'react-native';
import axios from 'axios';
import {AuthContext} from "./AuthContext";

const DiscussionScreen = () => {
    const [snaps, setSnaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const {authToken} = useContext(AuthContext);

    useEffect(() => {
        fetchSnaps();
    }, []);

    const fetchSnaps = async () => {
        try {
            setRefreshing(true);
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + authToken
                }
            };
            const response = await axios.get('https://mysnapchat.epidoc.eu/snap', config);
            const snapsData = response.data.data;
            setSnaps(snapsData);
            setError(null);
        } catch (error) {
            console.error('Erreur lors de la récupération des snaps :', error);
            setError('Une erreur s\'est produite lors de la récupération des snaps.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };


    const renderSnapItem = ({item}) => {
        return (
            <View>
                <Text>Expéditeur : {item.from}</Text>
                <Text>Date : {item.date}</Text>
                <Text>ID du snap : {item._id}</Text>
            </View>
        );
    };

    const renderFooter = () => {
        if (loading) {
            return <ActivityIndicator/>;
        }
        return null;
    };

    const handleRefresh = () => {
        if (!loading) {
            fetchSnaps();
        }
    };

    return (
        <View>
            {error ? (
                <Text>{error}</Text>
            ) : (
                <FlatList
                    data={snaps}
                    keyExtractor={(item) => item._id}
                    renderItem={renderSnapItem}
                    ListFooterComponent={renderFooter}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                        />
                    }
                />
            )}
        </View>
    );
};

export default DiscussionScreen;
