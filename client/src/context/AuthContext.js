import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => sessionStorage.getItem('authTokens') || null);
    const [user, setUser] = useState(() => {
        const user = sessionStorage.getItem('user');
        try {
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error parsing user JSON:', error);
            return null;
        }
    });
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            setAuthTokens(response.data.token);
            setUser(response.data.user);
            sessionStorage.setItem('authTokens', response.data.token);
            sessionStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to login:', error);
            throw new Error('Failed to login');
        }
    };

    const signup = async (email, password) => {
        try {
            const response = await api.post('/auth/signup', { email, password });
            setAuthTokens(response.data.token);
            setUser(response.data.user);
            sessionStorage.setItem('authTokens', response.data.token);
            sessionStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to sign up:', error);
            throw new Error('Failed to sign up');
        }
    };

    const logout = () => {
        setAuthTokens(null);
        setUser(null);
        sessionStorage.removeItem('authTokens');
        sessionStorage.removeItem('user');
        toast.success('Logged out successfully');
        navigate('/');
    };

    const value = {
        authTokens,
        user,
        login,
        signup,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
