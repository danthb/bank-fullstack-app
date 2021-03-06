import React, { useState, useContext, Fragment} from "react";
import BankForm from "./bankform";
import { AuthContextFB } from "../contexts/AuthContextFB";
import { accountAPI } from "../services";

export default function Deposit(){
  const { authFB } = useContext(AuthContextFB);
  const[balance, setBalance] = useState(0);

  const getAccount = async () => {
    try {
      if (authFB) {
        const response = await accountAPI.getUser(authFB.uid);
        console.log(authFB.uid)
        console.log(response.data)
        return response.data;
      }
      } catch (error) {
          console.log(error);
          return
      }   
  }

const handle = (data) => {
  let user;
  getAccount()
    .then((dataUsers) => {
      user = dataUsers.filter(user => user.firebaseId === authFB.uid)
      setBalance(user[0].balance)
      console.log('balance', balance)
    })
    .then(async () => {
      console.log('data from deposit', data)
      if (Number(data.amount) > 0) {
        console.log('deposit', data.amount)
        let newbalance = Number(balance) + Number(data.amount)
        setBalance(newbalance)
        console.log('newbalance', balance)
        await accountAPI.updated(user[0]._id, data.amount)
        alert(`Transaction done, your balance is ${Number(data.amount) + Number(balance)}`)
      } else {
        alert("You can't make operations with negative amounts")
        return false
      }
      return true
  })
  }
  handle();
    return (
      <BankForm
      bgcolor="success"
      label="Deposit"
      handle={handle}
      hideAmount={false}
      successButton="Make another deposit"
        body={
          <Fragment>
          <h3> Your balance is:</h3>
          <div>{balance}</div>
          </Fragment>
        }
    />
    )
  }