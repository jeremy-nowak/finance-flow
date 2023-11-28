import React from "react";
import { useContext, useState, useEffect } from "react";

export default function Form({ options, type }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

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
      <input type="text" required />
      <label>Titre</label>
      <input type="text" required />
      <label>Date</label>
      <input
        type="date"
        max={new Date().toISOString().split("T")[0]}
        required
      />
      <input type="hidden" value={type} />
      <input type="submit" onClick={handleSubmit} />
    </form>
  );
}
