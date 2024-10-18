import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import {AuthContext} from "./AuthContext";

const EditProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const {authToken} = useContext(AuthContext);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + authToken
                }
            };

            const response = await axios.get('https://mysnapchat.epidoc.eu/user', config);
            const userData = response.data;
            setEmail(userData.email);
            setUsername(userData.username);
        } catch (error) {
            console.error('Erreur lors de la récupération des données utilisateur:', error);
            setError('Une erreur s\'est produite lors de la récupération des données utilisateur.');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveChanges = async () => {
        try {
            setLoading(true);
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + authToken
                },
            };

            const data = {
                email: email,
                password: password,
                username: username,
            };

            const response = await axios.put('https://mysnapchat.epidoc.eu/user', data, config);
            console.log('Modifications enregistrées avec succès:', response.data);
            setSuccess(true);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil:', error);
            setError('Une erreur s\'est produite lors de la mise à jour du profil.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modifier le profil</Text>
            {loading ? (
                <Text style={styles.loadingText}>Chargement...</Text>
            ) : (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nom d'utilisateur"
                        value={username}
                        onChangeText={setUsername}
                    />
                    {error && <Text style={styles.errorText}>{error}</Text>}
                    {success && <Text style={styles.successText}>Modifications enregistrées avec succès!</Text>}
                    <TouchableOpacity style={styles.button} onPress={handleSaveChanges} disabled={loading}>
                        <Text
                            style={styles.buttonText}>{loading ? 'Enregistrement en cours...' : 'Enregistrer les modifications'}</Text>
                    </TouchableOpacity>
                </>
            )}
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
    loadingText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginBottom: 16,
    },
    successText: {
        fontSize: 16,
        color: 'green',
        textAlign: 'center',
        marginBottom: 16,
    },
});

export default EditProfileScreen;
