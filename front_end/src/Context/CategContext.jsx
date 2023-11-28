import { createContext, useState, useEffect, useContext } from "react";

export const CategContext = createContext();

const CategProvider = ({ children }) => {
  const [incomeCateg, setIncomeCateg] = useState({});
  const [spendCateg, setSpendCateg] = useState({});
  const [categ, setCateg] = useState({
    income: {},
    spend: {},
  });

  const PATH = import.meta.env.VITE_PATH;

  const fetchCateg = async () => {
    try {
      const response = await fetch(
        `${PATH}controller/categController.php?categ`
      );
      const res = await response.json();
      // mettre les catégories ayant pour type "crédit" dans le state "income", et les autres dans le state "spend" avec leur id
      let income = {
        id: [],
        name: [],
      };
      let spend = {
        id: [],
        name: [],
      };

      res.map((item) => {
        if (item.type == "credit") {
          income.id.push(item.id_category);
          income.name.push(item.name);
        } else {
          spend.id.push(item.id_category);
          spend.name.push(item.name);
        }

        // si la lengthde income.id et income.name est égale à 4, on met income dans le state incomeCateg
        if (income.id.length == 4 && income.name.length == 4) {
          setIncomeCateg(income);
        }
        // si la lenght de spend est égale à 4, on met spend dans le state spendCateg
        if (spend.id.length == 4 && spend.name.length == 4) {
          setSpendCateg(spend);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCateg();
  }, []);

  useEffect(() => {
    setCateg({
      income: incomeCateg,
      spend: spendCateg,
    });
  }, [incomeCateg, spendCateg]);

  return (
    <CategContext.Provider value={{ categ, setCateg }}>
      {children}
    </CategContext.Provider>
  );
};

export default CategProvider;
