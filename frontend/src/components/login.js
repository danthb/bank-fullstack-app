import React, { Fragment, useEffect, useState, useContext } from 'react';
import BankForm from './bankform';
import useAuth from "../contexts/Auth/useAuth"
import { AuthContextFB } from '../contexts/AuthContextFB';

export default function Login() {
    

  const auth = useAuth();
    
  const [currenUser, setCurrentUser] = useState('')
  const [userNotFound, setUserNotFound] = useState(false)
  const { login, users } = useAuth();
  
  const {loginFB} = useContext(AuthContextFB)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function findlogedUser(){
        let userLoged = auth.users.filter(user => user.isLogedU === true)
        if (userLoged.length > 0) {
          setCurrentUser(userLoged[0])
        } else {
          setCurrentUser(false)
      }
    
      }

    useEffect(() => {
        findlogedUser()
      }, [findlogedUser, users])
  
    /* function handle(data) {
    
        let user = auth.users.filter(user => user.email === data.email)
        if ( user.length > 0){
        let index = auth.users.indexOf(user[0])
        auth.users[index].isLogedU = true
        login(user[0])
        setCurrentUser(user)
        return true
        } else {
        setUserNotFound(true)
        setTimeout(() =>{
            setUserNotFound(false)
        }, 2000)
        }
        console.log(currenUser)
    } */
    const handle = (data) => {
      loginFB(data.email, data.password)
      
    }
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
              : <Fragment></Fragment>
            }
            </Fragment>
        
    )
    
}
