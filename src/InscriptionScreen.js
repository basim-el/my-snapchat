import React, {useState} from 'react';
import {Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import snapchatImage from '../assets/snapchat.jpg';
import axios from 'axios';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Adresse e-mail invalide').required('Veuillez saisir votre adresse e-mail'),
    username: Yup.string().required('Veuillez saisir un nom d\'utilisateur'),
    password: Yup.string().required('Veuillez saisir votre mot de passe'),
});

const InscriptionScreen = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    const goToConnexion = () => {
        navigation.navigate('Connexion');
    };

    const handleInscription = async (values, {resetForm}) => {
        try {
            const response = await axios.post('https://mysnapchat.epidoc.eu/user', {
                email: values.email,
                password: values.password,
                profilePicture: '',
                username: values.username,
            });

            resetForm();
            goToConnexion();
            console.log(response.data);
        } catch (error) {
            console.error(error);
            setErrorMessage('Une erreur s\'est produite lors de l\'inscription.');
            Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'inscription.');
        }
    };

    return (
        <KeyboardAwareScrollView style={styles.container} behavior="padding">
            <ImageBackground source={snapchatImage} resizeMode="cover" style={styles.image}>
                <View style={styles.overlay}>
                    <Text style={styles.title}>SNAPCHAT</Text>
                    <Formik
                        initialValues={{email: '', username: '', password: ''}}
                        validationSchema={validationSchema}
                        onSubmit={handleInscription}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                            <>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                    {touched.email && errors.email &&
                                        <Text style={styles.errorText}>{errors.email}</Text>}
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nom d'utilisateur"
                                        onChangeText={handleChange('username')}
                                        onBlur={handleBlur('username')}
                                        value={values.username}
                                    />
                                    {touched.username && errors.username &&
                                        <Text style={styles.errorText}>{errors.username}</Text>}
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Mot de passe"
                                        secureTextEntry
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />
                                    {touched.password && errors.password &&
                                        <Text style={styles.errorText}>{errors.password}</Text>}
                                </View>
                                <TouchableOpacity
                                    style={[styles.button, styles.signupButton]}
                                    onPress={handleSubmit}
                                    disabled={!values.email || !values.username || !values.password}
                                >
                                    <Text style={[styles.buttonText, styles.signupButtonText]}>Inscription</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                    <View style={styles.space}/>
                    <TouchableOpacity
                        style={[styles.button, styles.loginButton]}
                        onPress={goToConnexion}
                    >
                        <Text style={[styles.buttonText, styles.loginButtonText]}>Connexion</Text>
                    </TouchableOpacity>
                    {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
                </View>
            </ImageBackground>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 16,
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 32,
    },
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    button: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    signupButton: {
        backgroundColor: 'black',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginButtonText: {
        color: 'black',
    },
    signupButtonText: {
        color: '#fff',
    },
    space: {
        height: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 16,
    },
});

export default InscriptionScreen;
