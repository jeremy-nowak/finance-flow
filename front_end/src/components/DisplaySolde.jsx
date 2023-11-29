import { useState, useContext, } from "react";
import { UserContext } from "../Context/UserContext";

function DisplaySolde() {

    const {data } = useContext(UserContext);

    
    return (
            <div className="flex justify-center mb-4">
            <h1 className="text-black text-5xl">{data.solde}</h1>
            </div>
    );

}
export default DisplaySolde;