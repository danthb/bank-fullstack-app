import React, { Fragment, useContext, useState } from "react";
import { AuthContextFB } from "../contexts/AuthContextFB";
import {Card} from "../contexts/context";
import { accountAPI } from "../services";

export default function Balance() {
  const[balance, setBalance] = useState(0);
  const { authFB } = useContext(AuthContextFB);
  
  const getAccounts = async () => {
      try {
        if (authFB) {
          const response = await accountAPI.all();
          return response.data;
        }
        } catch (error) {
            console.log(error);
            return
        }   
    }

  const handle = () => {
    getAccounts().then(data => {
      let user = data.filter(user => user.firebaseId === authFB.uid)
      console.log('user', user)
      setBalance(user[0].balance)
    })
  }

  handle();

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
      <div style={{ textAlign: 'center' }}>
      <input type="button"  value="Balance" onClick={handle} />
      </div>
    </Fragment>
  )
}
