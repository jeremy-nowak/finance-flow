import React, { useContext } from "react";

import { UserContext } from "../Context/UserContext";


export default function ButtonAdd() {
    const { setDisplayForm } = useContext(UserContext);
    
    return (
            <button onClick={()=>{
                setDisplayForm(true)
            }}><img src='plus-circle.svg' alt="plus" /></button>
    );
}