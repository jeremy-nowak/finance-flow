import { useState, useEffect, useContext } from "react";
import { CategContext } from "../Context/CategContext";
import DisplaySolde from "../components/DisplaySolde";
import Form from "../components/Form";
import { UserContext } from "../Context/UserContext";

export default function FormScreen() {
  const { displayForm, setDisplayForm } = useContext(UserContext);

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

  let titleStyle = title === "Income" ? "text-[#C6F4B0]" : "text-[#FF9393]";
  titleStyle += " text-5xl mb-5 self-center";

  return (
    <section className="xl:w-96 xs:h-3/5 sm:w-screen bg-white lg:rounded-lg xs:rounded-t-2xl slideInUp z-10 transform -translate-x-[0%]">
      <div className="flex justify-end p-5">
      <button onClick={()=>{
                setDisplayForm(false)
            }}><img src='/close.svg' alt="close" /></button>
      </div>
      <div className="relative p-2 rounded-md">
        <div className="inset-y-0 left-0 flex flex-col items-center p-3">
          <p className="text-3xl mb-5">
            <DisplaySolde />
          </p>

          <div className="flex w-full justify-around mb-5">
            <button
              className="bg-[#C6F4B0] text-black rounded-md px-3 py-2 mb-2 hover:bg-[#A7E78D]"
              onClick={() => {
                setTitle("Income"), setType("credit"), changeOptions("credit");
              }}
            >
              Income
            </button>
            <button
              className="bg-[#FF9393] text-black rounded-md px-3 py-2 mb-2 hover:bg-[#FF6F6F]"
              onClick={() => {
                setTitle("Spend"), setType("debit"), changeOptions("debit");
              }}
            >
              Spend
            </button>
          </div>
          <div className="flex flex-col items-center">
            <h3 className={titleStyle}>{title}</h3>
            <Form options={options} type={type} />
          </div>
        </div>
      </div>
    </section>
  );
}
