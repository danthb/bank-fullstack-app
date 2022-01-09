import React, { Fragment, useContext, useState } from "react";
import { AuthContextFB } from "../contexts/AuthContextFB";
import {Card} from "../contexts/context";
import { accountAPI } from "../services";

export default function Balance() {
  const[balance, setBalance] = useState(0);
  const { authFB } = useContext(AuthContextFB);
  if (authFB) {
    const getAccounts = async () => {
        try {
            const response = await accountAPI.all();
            return response.data;
        } catch (error) {
            console.log(error);
            return
        }   
    }
    getAccounts().then(data => {
      let user = data.filter(user => user.firebaseId === authFB.uid)
      console.log('user', user)
      setBalance(user[0].balance)
    })
  }

  return (
    <Fragment>
        <Card
          bgcolor={'lightblue'}
          label="Balance"
          txtcolor='black'
          header={'Your Balance is:'}
          body={
            <h3>
              {balance}
            </h3>
          }
        />
      
    </Fragment>
  )
}
