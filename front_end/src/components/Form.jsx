import React from "react";
import { useContext, useState, useEffect } from "react";

import { UserContext } from "../Context/UserContext";

export default function Form({ options, type }) {
  const { user, setUser } = useContext(UserContext);
  const [errorsBool, setErrorsBool] = useState({
    amount: true,
    title: true,
    date: true,
    form: true,
  });
  const [errors, setErrors] = useState({
    amount: "",
    title: "",
    date: "",
    form: "",
  });
  const [nextDay, setNextDay] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [maxDay, setMaxDay] = useState(
    new Date(nextDay).setDate(new Date(nextDay).getDate() + 1)
  );

  const [change, setChange] = useState(false);

  const resetForm = (form) => {
    // mettre le solde à jour
    if (type == "credit") {
      setUser({ ...user, solde: user.solde + parseInt(form.amount.value) });
    } else if (type == "debit") {
      setUser({ ...user, solde: user.solde - parseInt(form.amount.value) });
    }

    form.reset();
    setErrorsBool({
      amount: true,
      title: true,
      date: true,
      form: true,
    });
    setErrors({
      amount: "",
      title: "",
      date: "",
      form: "",
    });
  };

  const checkEmpty = (e) => {
    if (e.target.value == "" || e.target.value == null) {
      // e.target.classList.add("empty");
      setErrorsBool({ ...errorsBool, [e.target.name]: true });
      setErrors({ ...errors, [e.target.name]: "Ce champ est obligatoire" });
    } else {
      //   e.target.classList.remove("empty");
      setErrorsBool({ ...errorsBool, [e.target.name]: false });
      setErrors({ ...errors, [e.target.name]: "" });
    }
    setChange(!change);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorsBool.amount || errorsBool.title || errorsBool.date) {
      setErrorsBool({ ...errorsBool, form: true });
      setErrors({
        ...errors,
        form: "Veuillez remplir tous les champs obligatoires",
      });
    } else {
      setErrorsBool({ ...errorsBool, form: true });
      setErrors({ ...errors, form: "" });

      const form = e.target.parentNode;
      const formData = new FormData(form);
      formData.append("id_user", user.id_user);
      formData.append("form", "add");
      const PATH = import.meta.env.VITE_PATH;
      const response = await fetch(
        `${PATH}controller/transactionController.php`,
        {
          method: "POST",
          body: formData,
        }
      );
      const res = await response.json();
      // si res contient "Transaction ajoutée", on reset le form
      if (res == "Transaction ajoutée") {
        resetForm(form);
      }
    }
  };

  useEffect(() => {
    if (!change) {
      return;
    } else {
      if (!errorsBool.amount && !errorsBool.title && !errorsBool.date) {
        setErrorsBool({ ...errorsBool, form: false });
        setErrors({ ...errors, form: "" });
      } else {
        setErrorsBool({ ...errorsBool, form: true });
        setErrors({
          ...errors,
          form: "Veuillez remplir tous les champs obligatoires",
        });
      }
      setChange(!change);
    }
  }, [change]);

  return (
    <form>
      <label className="block text-xl font-medium leading-6 lg:text-white xs:text-black mb-2">
        Catégorie
      </label>
      <select name="category" className="block w-full rounded-md border-0 py-1.5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 mb-2"
>
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
      <label className="block text-xl font-medium leading-6 lg:text-white xs:text-black mb-2 mt-5">
        Montant
      </label>
      <input
        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 mb-2"
        type="number"
        name="amount"
        required
        min={0}
        onChange={(e) => checkEmpty(e)}
        onBlur={(e) => checkEmpty(e)}
      />
      {errorsBool.amount ? <p>{errors.amount}</p> : null}
      <label className="block text-xl font-medium leading-6 lg:text-white xs:text-black mb-2 mt-5">
        Titre
      </label>
      <input
        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 mb-2"
        type="text"
        name="title"
        required
        maxLength={20}
        onChange={(e) => checkEmpty(e)}
        onBlur={(e) => checkEmpty(e)}
      />
      {errorsBool.title ? <p>{errors.title}</p> : null}
      <label className="block text-xl font-medium leading-6 lg:text-white xs:text-black mb-2 mt-5">
        Date
      </label>
      <input
        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 mb-2"
        type="date"
        name="date"
        // value={}
        min={"2023-01-01"}
        //max = lendemain
        max={new Date(maxDay).toISOString().split("T")[0]}
        onChange={(e) => checkEmpty(e)}
        onBlur={(e) => checkEmpty(e)}
        required
      />
      {errorsBool.date ? <p>{errors.date}</p> : null}
      <input type="hidden" name="type" value={type} />
      <input
        className="block w-full rounded-md border-0 bg-white py-1.5 text-xl text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 mt-5"
        type="submit"
        onClick={(e) => handleSubmit(e)}
        disabled={errorsBool.form}
      />
      {errorsBool.form ? <p>{errors.form}</p> : null}
    </form>
  );
}
