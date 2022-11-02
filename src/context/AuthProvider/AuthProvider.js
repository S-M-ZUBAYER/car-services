import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { current } from 'daisyui/src/colors';


export const AuthContext = createContext();

const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, createUser => {
            console.log(createUser);
            setUser(current);
        })
        return () => {
            return unsubscribe();
        }
    }, [])
    const authInfo = {
        user,
        loading,
        createUser,
        logIn
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;