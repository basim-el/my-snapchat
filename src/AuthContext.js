import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authToken, setAuthToken] = useState(null);

    const login = (token) => {
        setIsLoggedIn(true);
        setAuthToken(token);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, authToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};