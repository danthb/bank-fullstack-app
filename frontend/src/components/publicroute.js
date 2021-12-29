
import React/* , { Suspense, lazy } */ from 'react';
import useAuth from '../contexts/Auth/useAuth';

import { Route, Redirect } from 'react-router-dom';
export default function PublicRoute({component: Component, ...rest}) {
   
  
    const auth = useAuth();
    return (
        /* <Route exact={props.exact} path={props.path} component={props.component} /> */
        <Route {...rest}>
            {!auth.isLogedIn() ? <Component />
                : (<Redirect to='/'></Redirect>
                
                )}
        </Route> 

        
    );
}
