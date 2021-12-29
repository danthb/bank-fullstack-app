import React, { useContext, /* useState, */ Fragment} from "react";
import { AuthContext } from "../contexts/Auth/AuthProvider";
import BankForm from "./bankform";

export default function Deposit(){
  const auth = useContext(AuthContext);
  /* const [success, setSuccess] = useState(true) */
  
  let user = auth.users.filter(user => user.isLogedU === true)
  let index;
  let balance;
  if (user.length > 0) {
    index = auth.users.indexOf(user[0])
    balance = auth.users[index].balance
  }
  const handle = (data) => {
    let user = auth.users.filter(user => user.isLogedU === true)
    let index = auth.users.indexOf(user[0])
    

    if (Number(data.amount) >= 0) {
      auth.users[index].balance += Number(data.amount)
      alert(`Transaction done, your balance is $${auth.users[index].balance}`)
      /* setSuccess(true) */
    } else {
      alert("You can't make operations with negative amounts")
      /* setSuccess(false) */
      return false
    }
    return true
    }

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
          <div>${balance}</div>
          </Fragment>
        }
    />
    )
  }