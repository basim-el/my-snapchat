import React, {useContext, useState} from 'react';
import {ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StatusBar} from 'expo-status-bar';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import snapchatImage from '../assets/snapchat.jpg';
import {AuthContext} from './AuthContext';
import axios from 'axios';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Adresse e-mail invalide').required('Veuillez saisir votre adresse e-mail'),
    password: Yup.string().required('Veuillez saisir votre mot de passe'),
});

const ConnexionScreen = () => {
    const navigation = useNavigation();
    const {login} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');

    const goToInscription = () => {
        navigation.navigate('Inscription');
    };

    const handleConnexion = async (values, {resetForm}) => {
        try {
            const response = await axios.put('https://mysnapchat.epidoc.eu/user', {
                email: values.email,
                password: values.password,
            });

            const token = response?.data?.data?.token;

            if (token) {
                login(token);
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Camera'}],
                });
            } else {
                setErrorMessage('Erreur de connexion');
            }
        } catch (error) {
            console.error(error?.response?.data?.data ?? error);
            setErrorMessage('Erreur de connexion');
        }
    };

    return (
        <KeyboardAwareScrollView style={styles.container} behavior="padding">
            <ImageBackground source={snapchatImage} resizeMode="cover" style={styles.image}>
                <View style={styles.overlay}>
                    <Text style={styles.title}>SNAPCHAT</Text>
                    <Formik
                        initialValues={{email: '', password: ''}}
                        validationSchema={validationSchema}
                        onSubmit={handleConnexion}
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
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                    />
                                    {touched.email && errors.email &&
                                        <Text style={styles.errorText}>{errors.email}</Text>}
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
                                {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
                                <TouchableOpacity
                                    style={[styles.button, styles.loginButton]}
                                    onPress={handleSubmit}
                                    disabled={!values.email || !values.password}
                                >
                                    <Text style={[styles.buttonText, styles.loginButtonText]}>Connexion</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.signupButton]}
                                    onPress={goToInscription}
                                >
                                    <Text style={[styles.buttonText, styles.signupButtonText]}>Inscription</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                </View>
            </ImageBackground>
            <StatusBar style="auto"/>
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
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 16,
        textAlign: 'center',
    },
});

export default ConnexionScreen;
