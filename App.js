import React from 'react';
import AppNavigator from './src/AppNavigator';
import {AuthProvider} from './src/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <AppNavigator/>
        </AuthProvider>
    )
};

export default App;
