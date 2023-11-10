import React from 'react';
import { useContext } from 'react';
import { CategContext } from '../Context/CategContext';

export default function Form({title}){
    
    const {categ} = useContext(CategContext);
    console.log("🚀 ~ file: Form.jsx:8 ~ Form ~ categ:", categ)
    
    return (
        <div>
            <h1>{title}</h1>
            <form>
            <label>Catégorie</label>
            {title === "Income" ? 
                <select>
                    {categ.income.map((item, id) => 
                    <option key={id} value={item}>{item}</option>)} 
                </select> 
            : 
                 <select> 
                    {categ.outgoing.map((item, id) => 
                    <option key={id} value={item}>{item}</option>)} 
                </select>
            }
            <label>Montant</label>
            <input type="text" />
            <label>Titre</label>
            <input type="text" />
            <label>Date</label>
            <input type="date" />
            <input type="submit" />
            </form>
        </div>
    );
}