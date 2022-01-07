import React, { useContext, useState, useEffect  } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContextFB } from '../contexts/AuthContextFB';
export default function PrivateRoute({component: Component, ...rest}) {
   
    const { authFB } = useContext(AuthContextFB)
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        setCurrentUser(authFB)
        console.log('userChanged', authFB)
      }, [authFB])
    return (

        <Route {...rest}>
            {currentUser ? <Component/>
                : (<Redirect to='/login'/>
                
                )}
        </Route> 

        
    );
}
