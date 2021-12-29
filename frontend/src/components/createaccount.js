import React from "react";
import { AuthContext } from "../contexts/Auth/AuthProvider";
import BankForm from "./bankform";

export default function CreateAccount() {

    const auth = React.useContext(AuthContext);  

    function handle(newUser){
      auth.users.push({name: newUser.name, email: newUser.email, password: newUser.password, balance: 100, isLoged: false
      })
      console.log()
      return true
    }
    return (

      <BankForm
        bgcolor="black"
        txtcolor='white'
        label="Create Account"
        handle={handle}
        hideAmount={true}
        successButton="Create another account"
    />
    )
  }