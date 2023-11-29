import React from "react";
import { useContext, useState, useEffect } from "react";

import { UserContext } from "../Context/UserContext";

export default function Form({ options, type }) {
  const { user } = useContext(UserContext);
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

  const [change, setChange] = useState(false);

  const resetForm = (form) => {
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
      <label>Catégorie</label>
      <select name="category">
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
      <input
        type="number"
        name="amount"
        required
        min={0}
        onChange={(e) => checkEmpty(e)}
      />
      {errorsBool.amount ? <p>{errors.amount}</p> : null}
      <label>Titre</label>
      <input
        type="text"
        name="title"
        required
        onChange={(e) => checkEmpty(e)}
      />
      {errorsBool.title ? <p>{errors.title}</p> : null}
      <label>Date</label>
      <input
        type="date"
        name="date"
        max={new Date().toISOString().split("T")[0]}
        onChange={(e) => checkEmpty(e)}
        required
      />
      {errorsBool.date ? <p>{errors.date}</p> : null}
      <input type="hidden" name="type" value={type} />
      <input
        type="submit"
        onClick={(e) => handleSubmit(e)}
        disabled={errorsBool.form}
      />
      {errorsBool.form ? <p>{errors.form}</p> : null}
    </form>
  );
}
