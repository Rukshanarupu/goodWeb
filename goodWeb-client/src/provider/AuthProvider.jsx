/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import app from '../firebase/firebase.config';

const auth = getAuth (app);
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)

    // mail signIn and signOut system
    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (name, photo)=>{
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }
    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    const resetPassword = email => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
      }

    // others signIn system
    const signWithGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    //OBSERVE authState change
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (loggedUser)=>{
            // console.log(loggedUser)
            setUser(loggedUser)
            setLoading(false)
        })
        // stop observing while unmounting
        return ()=> unsubscribe();
    },[])

    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        loginUser,
        updateUser,
        logOut,
        signWithGoogle,
        resetPassword
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;