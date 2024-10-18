import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';

const SettingsScreen = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const navigation = useNavigation();

    const handleLogout = () => {
        setIsLoggedIn(false);
        setAuthToken(null);
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{name: 'Connexion'}],
            })
        );
    };

    const handleEditProfile = () => {
        navigation.navigate('EditProfile');
    };

    const handleDeleteAccount = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            };

            const confirmDelete = await promptConfirmation(
                'Confirmation de suppression',
                'Êtes-vous sûr de vouloir supprimer votre compte ?'
            );

            if (confirmDelete) {
                const response = await axios.delete(
                    'https://mysnapchat.epidoc.eu/user',
                    config
                );
                console.log('Compte supprimé avec succès:', response.data);
                handleLogout();
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du compte:', error);
            displayError('Erreur lors de la suppression du compte.');
        }
    };

    const promptConfirmation = (title, message) => {
        return new Promise((resolve, reject) => {
            Alert.alert(
                title,
                message,
                [
                    {
                        text: 'Annuler',
                        style: 'cancel',
                        onPress: () => resolve(false),
                    },
                    {
                        text: 'Supprimer',
                        style: 'destructive',
                        onPress: () => resolve(true),
                    },
                ],
                {cancelable: false}
            );
        });
    };

    const displayError = (message) => {
        Alert.alert('Erreur', message);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Paramètres</Text>
            <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
                <Text style={styles.buttonText}>Modifier le profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
                <Text style={styles.buttonText}>Supprimer le compte</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Se déconnecter</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default SettingsScreen;
