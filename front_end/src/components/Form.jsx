import React from "react";
import { useContext, useState, useEffect } from "react";

export default function Form({ options, type }) {
  return (
    <form>

            <label className="block text-xl font-medium leading-6 text-black mb-2">Catégorie</label>
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
            <label className="block text-xl font-medium leading-6 text-black mb-2">Montant</label>
            <input className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 mb-2" type="text" />
            <label className="block text-xl font-medium leading-6 text-black mb-2">Titre</label>
            <input className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 mb-2"type="text" />
            <label className="block text-xl font-medium leading-6 text-black mb-2">Date</label>
            <input type="date" />
            <input className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 mb-2" type="hidden" value={type} />
            <input className="block w-full rounded-md border-0 bg-white py-1.5 text-xl text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" type="submit" />
         
      
    </form>
  );
}

