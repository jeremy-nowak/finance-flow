import { useState, useEffect } from "react";

import DisplaySolde from "../components/DisplaySolde";
import Form from "../components/Form";


export default function FormScreen() {
const [title, setTitle] = useState("Outgoing");



useEffect(() => {
    console.log("title", title);
}, [title]);


    return(

        <div>

            <DisplaySolde />
            <button onClick={() => setTitle("Income")}>Inc</button>
            <button onClick={() => setTitle("Outgoing")}>Out</button>
            <Form title={title}/>

        </div>

    )

}