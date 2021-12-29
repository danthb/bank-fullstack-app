import React, { Fragment, useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthProvider";
import BankForm from "./bankform";

export default function Withdraw() {

  const auth = useContext(AuthContext);  
  const handle = (data) => {
      
      let user = auth.users.filter(user => user.isLogedU === true)
      let index = auth.users.indexOf(user[0])
      let balance = auth.users[index].balance
      console.log(balance);
      console.log(data.amount);


      if (balance > 0 && balance >= Number(data.amount) && Number(data.amount) >= 0) {
        auth.users[index].balance -= Number(data.amount)
        alert(`Transaction done, your balance is $${auth.users[index].balance}`)
      } else {
        alert("You don't have enough money")
        return false
      }
      return true
    }
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