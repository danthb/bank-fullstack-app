import React, { useContext, Fragment } from "react";
import { AuthContext } from "../contexts/Auth/AuthProvider";



export default function AllData() {
    const auth = useContext(AuthContext);  
    return (
        <Fragment>
            <div class="card text-center">
                
                <div class="card-header">
                    <h5>Bank's Data</h5>
                </div>
                <div class="card-body">
                <table className="table">
                    <thead>
                    <tr >
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col">Balance</th>
                    </tr>
                    </thead>
                    <tbody >
                    {
                        auth.users.map((item, key) => (
                        <tr key={key}>
                            <th scope="row">{key + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                            <td>{item.balance}</td>
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
                </div>
                <div class="card-footer text-muted">
                Up to date
                </div>
            </div>
        </Fragment>
       
    )
}