import React from 'react';
import { useContext } from 'react';

export default function Form({title}){
    
    
    return (
        <div>
            <h1>{title}</h1>
            <form>
            <label>Catégorie</label>
            <select>
                <option value="alimentation">Alimentation</option>
                <option value="loisirs">Loisirs</option>
                <option value="logement">Logement</option>
                <option value="santé">Santé</option>
            </select>
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