import React, { useState, useContext, Fragment, useEffect } from "react";
import { AuthContext } from "../contexts/Auth/AuthProvider";
import { accountAPI } from "../services";

export default function AllData() {
    const auth = useContext(AuthContext);  
    const [data, setData] = useState([]);
    useEffect(() => {
        const getAccounts = async () => {
            try {
                const response = await accountAPI.all();
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.log(error);
            }   
        }
        getAccounts();
    }, [] );
    return (
        <Fragment>
            <div className="card text-center">
                
                <div className="card-header">
                    <h5>Bank's Data</h5>
                </div>
                <div className="card-body">
                <table className="table">
                    <thead>
                    <tr >
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">FireBase_Id</th>
                        <th scope="col">Balance</th>
                    </tr>
                    </thead>
                    <tbody >
                    {
                        data.map((item, key) => (
                        <tr key={key}>
                            <th scope="row">{key + 1}</th>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.firebaseId}</td>
                            <td>{item.balance}</td>
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
                </div>
                <div className="card-footer text-muted">
                Up to date
                </div>
            </div>
        </Fragment>
       
    )
}