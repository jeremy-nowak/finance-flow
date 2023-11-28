import React from "react";
import { useContext, useState, useEffect } from "react";

export default function Form({ options, type }) {
  return (
    <form>
      <label>Catégorie</label>
      <select>
        {options.name
          ? options.name.map((item, index) => {
              return (
                <option key={index} value={options.id[index]}>
                  {item}
                </option>
              );
            })
          : null}
      </select>
      <label>Montant</label>
      <input type="text" />
      <label>Titre</label>
      <input type="text" />
      <label>Date</label>
      <input type="date" />
      <input type="hidden" value={type} />
      <input type="submit" />
    </form>
  );
}

