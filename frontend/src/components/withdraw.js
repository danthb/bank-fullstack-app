import React, { useState, useContext, Fragment} from "react";
import BankForm from "./bankform";
import { AuthContextFB } from "../contexts/AuthContextFB";
import { accountAPI } from "../services";

export default function Withdraw() {
  const { authFB } = useContext(AuthContextFB);
  const [balance, setBalance] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const getAccount = async () => {
    try {
      if (authFB) {
        const response = await accountAPI.getUser(authFB.uid);
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
      if (balance > 0 && balance >= Number(data.amount) && Number(data.amount) >= 0) {
        console.log('withdrawn', data.amount)
        let newbalance = Number(balance) - Number(data.amount)
        setBalance(newbalance)
        setLoaded(true)
        console.log('newbalance', balance)
        await accountAPI.updated(user[0]._id, -data.amount)
        alert(`Transaction done, your balance is ${Number(balance) - Number(data.amount) }`)
      } else {
        if (loaded) {
          alert("You don't have enough money")
        }
          return false
        }
        return true
      })   
  }
  handle();  
    return (
      <Fragment>
        <BankForm
        bgcolor="info"
        label="Withdraw"
        handle={handle}
        hideAmount={false}
        successButton="Make another withdraw"
      />
      </Fragment>
    )
       
}