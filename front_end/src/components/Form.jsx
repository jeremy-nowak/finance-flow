import React from 'react';
import { useContext, useState } from 'react';
import { CategContext } from '../Context/CategContext';

export default function Form({title}){
    
    const {categ} = useContext(CategContext);

    const PATH = import.meta.env.VITE_PATH;
    
    const handleSubmit = async (e) =>{
    e.preventDefault();
    // récupérer les valeurs du formulaire
    
    const formData = new FormData(e.target.parentNode);
    console.log("🚀 ~ file: Form.jsx:15 ~ handleSubmit ~ formData:", formData)

    

        // try{
        //     const response = await fetch(`${PATH}controller/formController.php`, {
        //         method: "POST",
        //         body: formData,
        //     });
        //     const res = await response.json();
        //     console.log("res", res);
        // }catch (err){
        //     console.log(err);
        // }

    }

    return (
        <div>
            <h1>{title}</h1>
            <form method='post'>
                <label>Catégorie</label>
                {title === "Income" ? 
                <>
                    <select name='category' 
                    
                    >
                        {categ.income.map((item, id) => 
                        <option key={id} value={item}>{item}</option>)} 
                    </select> 
                    <input type="hidden" name="type" value={title}/>
                </>
                : 
                    <>
                    <select name='category'> 
                        {categ.outgoing.map((item, id) => 
                        <option key={id} value={item}>{item}</option>)} 
                    </select>
                    <input type="hidden" name="type" value={title}/>
                    </>
                }
                <label>Montant</label>
                <input type="text" name='amount'/>
                <label>Titre</label>
                <input type="text" name='title'/>
                <label>Date</label>
                <input type="date" name='date'/>
                <input key="Form" type="submit" onClick={handleSubmit} />
            </form>
        </div>
    );
}