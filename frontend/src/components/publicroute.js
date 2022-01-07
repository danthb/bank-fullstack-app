import React, {useContext, useEffect, useState} from 'react';
import { AuthContextFB } from '../contexts/AuthContextFB';
import { Route, Redirect } from 'react-router-dom';
export default function PublicRoute({component: Component, ...rest}) {
    const { authFB } = useContext(AuthContextFB)

    return (
     
        <Route {...rest}>
            {!authFB ? <Component />
                : (<Redirect to='/'></Redirect>
                
                )}
        </Route> 

        
    );
}
