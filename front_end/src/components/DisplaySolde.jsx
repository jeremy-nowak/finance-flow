import { useState, useContext, } from "react";
import { UserContext } from "../Context/UserContext";

function DisplaySolde() {

    const {data } = useContext(UserContext);

    
    return (
        <div>
            <h1>{data.solde}</h1>
        </div>
    );

}
export default DisplaySolde;