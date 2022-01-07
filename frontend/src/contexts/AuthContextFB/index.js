import { useState, createContext, useEffect } from 'react';
import firebase from './firebaseConfig'

export const AuthContextFB = createContext({})
export const AuthProviderFB = ({ children }) => {
    
    const [authFB, setAuthFB] = useState(null)
    
    const loginFB = async (email, password) => {
        try {
            const userCredential = await firebase.login(email, password)
            const user = userCredential.user
            user.getIdToken().then(token => {
              console.log('token', token)
              localStorage.setItem('token', token)
              console.log('user', user)     
            }) 
        } catch (error) {
            console.log(error)
        }
    }

    const logoutFB = async () => {
        console.log('logout')
        try {
          await firebase.logout()
          setAuthFB(null)
        } catch (err) {
          console.log(err.message)
        }
      }
  useEffect(() => {
    return firebase.getAuth().onAuthStateChanged(user => {
      setAuthFB(user)
      console.log('userChanged', user)
    })
  }, [])
    return (
        <AuthContextFB.Provider value={{ authFB, setAuthFB, loginFB, logoutFB }}>
            {children}
        </AuthContextFB.Provider>
    )
}

