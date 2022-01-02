import { useState, createContext } from 'react';
import firebase from './firebaseConfig'
export const AuthContextFB = createContext({})
export const AuthProviderFB = ({ children }) => {
    const [auth, setAuth] = useState(null)
    
    const loginFB = (email, password) => {
        try {
            const userCredential = firebase.login(email, password)
            userCredential.then(user => {
                setAuth(user)
                console.log('userCredential', userCredential)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContextFB.Provider value={{ auth, loginFB }}>
            {children}
        </AuthContextFB.Provider>
    )
}

