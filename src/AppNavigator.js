import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import InscriptionScreen from './InscriptionScreen';
import ConnexionScreen from './ConnexionScreen';
import CameraScreen from './CameraScreen';
import ListeUtilisateursScreen from "./ListeUtilisateursScreen";
import DiscussionScreen from "./DiscussionScreen";
import SettingsScreen from "./SettingsScreen";
import editProfileScreen from "./EditProfileScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Inscription" component={InscriptionScreen}/>
                <Stack.Screen name="Connexion" component={ConnexionScreen}/>
                <Stack.Screen
                    name="Camera"
                    component={CameraScreen}
                    options={{headerLeft: null}}
                />
                <Stack.Screen name="Liste" component={ListeUtilisateursScreen}/>
                <Stack.Screen name="Discussion" component={DiscussionScreen}/>
                <Stack.Screen name="Settings" component={SettingsScreen}/>
                <Stack.Screen name="EditProfile" component={editProfileScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
