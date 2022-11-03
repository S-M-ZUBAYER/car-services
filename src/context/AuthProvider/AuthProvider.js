import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { current } from 'daisyui/src/colors';


export const AuthContext = createContext();

const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const LogInWithGoogle = (googleProvider) => {
        setLoading(true);
        signInWithPopup(auth, googleProvider)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, createUser => {
            console.log(createUser);
            setUser(createUser);
            setLoading(false);
        })
        return () => {
            return unsubscribe();
        }
    }, [])
    const authInfo = {
        user,
        loading,
        createUser,
        logIn,
        LogInWithGoogle
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;