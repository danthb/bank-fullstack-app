import React, { Fragment, useEffect, useState, useContext } from 'react';
import BankForm from './bankform';
import { useHistory } from 'react-router-dom';
import { AuthContextFB } from '../contexts/AuthContextFB';

export default function Login() {
    
  const [currenUser, setCurrentUser] = useState(null)
  const [userNotFound, setUserNotFound] = useState(true)
  const history = useHistory();
  const {authFB, loginFB} = useContext(AuthContextFB)

  function handle(data) {
    console.log(data)
    loginFB(data.email, data.password)
    if(authFB){
      setCurrentUser(authFB)
      setUserNotFound(false)
      history.push('/')
    }
    else {
      setUserNotFound(true)
    }
  }
  useEffect(() => {
    setCurrentUser(authFB)
    console.log('userChanged', authFB)
  }, [authFB])
  
    return (
      
            <Fragment>
            {
              !currenUser ?
              <Fragment>
                <BankForm
                  bgcolor="black"
                  txtcolor='white'
                  label="Login"
                  handle={handle}
                  hideAmount={true}
                  successButton="Try Again"
                />
              {
                userNotFound &&
                <p style={{textAlign: 'center'}}>Please register</p> 
              }
              </Fragment>
              : <Fragment>You're logged</Fragment>
            }
            </Fragment>
        
    )
    
}
