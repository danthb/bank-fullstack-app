import React, { createContext } from "react";


export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [users, setUsers] = React.useState(
        [
            {
                username:'user',
                email: 'user@email.com',
                password: '12345678',
                balance: 0,
                isLogedU: false
            },
            {
                "username": "danthb",
                "email": "danthb@gmail.com",
                "password": "12345678",
                "balance": 0,
                "isLogedU": false
            }
        ])
    const[isLoged, setIsLoged] = React.useState(false)

    
    function login(user){
        const index = users.indexOf(user)
        const usersAux = [...users]
        usersAux[index].isLogedU = true
        setUsers(usersAux)
        setIsLoged(true)
       
      }

      function logout(user){
        const index = users.indexOf(user)
        const usersAux = [...users]
        usersAux[index].isLogedU = false
        setUsers(usersAux)
        setIsLoged(false)
       
      }
    
    function isLogedIn() {
        return isLoged
    }
    
    const contextValue = {
        users,
        login,
        logout,
        isLogedIn
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
