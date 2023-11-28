import { useState, useEffect, useContext } from "react";

import { CategContext } from "../Context/CategContext";

import DisplaySolde from "../components/DisplaySolde";
import Form from "../components/Form";

export default function FormScreen() {
  const [title, setTitle] = useState("Spend");
  const { categ } = useContext(CategContext);
  const { income, spend } = categ;
  const [options, setOptions] = useState({});
  const [type, setType] = useState("debit");

  const changeOptions = (type) => {
    if (type == "credit") {
      setOptions(income);
    } else if (type == "debit") {
      setOptions(spend);
    }
  };

  useEffect(() => {
    setOptions(spend);
  }, [categ]);

  return (
    <div>
      <DisplaySolde />
      <button
        onClick={() => {
          setTitle("Income"), setType("credit"), changeOptions("credit");
        }}
      >
        Inc
      </button>
      <button
        onClick={() => {
          setTitle("Spend"), setType("debit"), changeOptions("debit");
        }}
      >
        Out
      </button>
      <div>
        <h1>{title}</h1>
        <Form options={options} type={type} />
      </div>
    </div>
  );
}
