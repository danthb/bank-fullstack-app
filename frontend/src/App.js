import React, { Suspense, lazy }  from 'react';
import {BrowserRouter as Switch} from 'react-router-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
import { UserContext } from './contexts/context';
import { AuthContextFB, AuthProviderFB } from './contexts/AuthContextFB';

import './index.css';

const NavBar        = lazy(() => import('./components/navbar')); 
const Home          = lazy(() => import('./components/home'));
const CreateAccount = lazy(() => import('./components/createaccount'));
const Login         = lazy(() => import('./components/login'));
const Deposit       = lazy(() => import('./components/deposit'));
const Withdraw      = lazy(() => import('./components/withdraw'));
/* const Balance       = lazy(() => import('./components/Balance/balance')); */
const AllData       = lazy(() => import('./components/alldata'));
const PrivateRoute = lazy(() => import('./components/privateroute'))
const PublicRoute  = lazy(() => import('./components/publicroute'))
/* const NotFound      = lazy(() => import('./components/NotFound/notfound')); */


export default function App() {

  return (
      <Router>
       <Switch>
          <Suspense fallback = {<div>loading...</div>}>
            <NavBar />
          <div>
            <AuthProviderFB>
              <UserContext.Provider >
                <div className="container" style={{ padding: "20px" }}>
                  <Route path='/' exact component={Home} /> 
                  <PublicRoute path='/createaccount' component={CreateAccount} />
                  <PublicRoute path='/login' component={Login}/>
            
                  <PrivateRoute exact path='/deposit' component={Deposit} />
                  <PrivateRoute exact path='/withdraw' component={Withdraw} />
                  {/* <PrivateRoute exat path='/balance' component={Balance} /> */}
                  <PrivateRoute path='/alldata' component={AllData} />
                  {/* <Route path='*' component={NotFound} /> */}
                </div>
              </UserContext.Provider>
            </AuthProviderFB>
            </div>
          </Suspense>
        </Switch>
      </Router>
  
    )
}