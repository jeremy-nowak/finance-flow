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
    <section className=" xl:w-96 xs:w-full sm:w-screen bg-opacity-20 bg-white lg:rounded-lg xs:rounded-t-2xl">
    <div className="relative p-12 rounded-md">
    <div className="inset-y-0 left-0 flex-col items-center p-3">
     
      <DisplaySolde />
     
      <div className="flex justify-around">
      <button className="bg-[#C6F4B0] text-black rounded-md px-3 py-2 mb-2 hover:bg-[#A7E78D]"
        onClick={() => {
          setTitle("Income"), setType("credit"), changeOptions("credit");
        }}
      >
        Inc
      </button>
      <button className="bg-[#FF9393] text-black rounded-md px-3 py-2 mb-2 hover:bg-[#FF6F6F]"
        onClick={() => {
          setTitle("Spend"), setType("debit"), changeOptions("debit");
        }}
      >
        Out
      </button>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl mb-2 self-center text-white">{title}</h1>
        <Form options={options} type={type} />
      </div>
      </div>
    </div>
    </section>
  );
}
