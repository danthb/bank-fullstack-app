import React from "react";
import { AuthContext } from "../contexts/Auth/AuthProvider";
import { accountAPI } from "../services";
import BankForm from "./bankform";

export default function CreateAccount() {

    async function handle(newUser){
      console.log(newUser);
      const { name, email, password } = newUser;
      try {
        const { status, data } = await accountAPI.createUser(newUser);
        console.log(status, data);
        if (status === 200) {
          console.log('user created');
        }
      } catch (error) {
        console.log(error);

      }
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