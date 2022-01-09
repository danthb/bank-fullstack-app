import React, { Suspense, lazy }  from 'react';
import {BrowserRouter as Switch} from 'react-router-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
import { UserContext } from './contexts/context';
import { AuthProviderFB } from './contexts/AuthContextFB';

import './index.css';

const NavBar        = lazy(() => import('./components/navbar')); 
const Home          = lazy(() => import('./components/home'));
const CreateAccount = lazy(() => import('./components/createaccount'));
const Login         = lazy(() => import('./components/login'));
const Deposit       = lazy(() => import('./components/deposit'));
const Withdraw      = lazy(() => import('./components/withdraw'));
const Balance       = lazy(() => import('./components/balance'));
const AllData       = lazy(() => import('./components/alldata'));
/* const PrivateRoute = lazy(() => import('./components/privateroute'))
const PublicRoute  = lazy(() => import('./components/publicroute')) */
/* const NotFound      = lazy(() => import('./components/NotFound/notfound')); */


export default function App() {
  
  return (
      <Router>
       <Switch>
       <AuthProviderFB>
        <Suspense fallback = {<div>loading...</div>}>
          <NavBar />
          <div>
              <UserContext.Provider >
                <div className="container" style={{ padding: "20px" }}>
                  <Route path='/' exact component={Home} /> 
                  <Route path='/createaccount' component={CreateAccount} />
                  <Route path='/login' component={Login}/>
            
                  <Route exact path='/deposit' component={Deposit} />
                  <Route exact path='/withdraw' component={Withdraw} />
                  <Route exat path='/balance' component={Balance} />
                  <Route path='/alldata' component={AllData} />
                  {/* <Route path='*' component={NotFound} /> */}
                </div>
              </UserContext.Provider>
            </div>
          </Suspense>
          </AuthProviderFB> 
        </Switch>
      </Router>
  
    )
}