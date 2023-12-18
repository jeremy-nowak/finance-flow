import { useState, useEffect, useContext } from "react";

import { UserContext } from "../Context/UserContext";
import { CategContext } from "../Context/CategContext";

import Cell from "./Cell";

function CellContainer() {
  const { monthlyData } = useContext(UserContext);
  const { categ } = useContext(CategContext);
  const { income: incomeCateg, spend: spendCateg } = categ;

  const [income, setIncome] = useState({
    Salary: 0,
    Transfert: 0,
    Interest: 0,
    Others: 0,
  });
  const [spend, setSpend] = useState({
    Essentials: 0,
    Hobbies: 0,
    Saves: 0,
    Others: 0,
  });

  const getTotalPerCateg = () => {
    let incomeTotal = {
      Salary: 0,
      Transfert: 0,
      Interest: 0,
      Others: 0,
    };
    let spendTotal = {
      Essentials: 0,
      Hobbies: 0,
      Saves: 0,
      Others: 0,
    };

    monthlyData.map((item) => {
      if (item.type == "credit") {
        if (item.id_categ == incomeCateg.id[0]) {
          incomeTotal.Salary += parseInt(item.amount);
        } else if (item.id_categ == incomeCateg.id[1]) {
          incomeTotal.Transfert += parseInt(item.amount);
        } else if (item.id_categ == incomeCateg.id[2]) {
          incomeTotal.Interest += parseInt(item.amount);
        } else if (item.id_categ == incomeCateg.id[3]) {
          incomeTotal.Others += parseInt(item.amount);
        }
      } else {
        if (item.id_categ == spendCateg.id[0]) {
          spendTotal.Essentials += parseInt(item.amount);
        } else if (item.id_categ == spendCateg.id[1]) {
          spendTotal.Hobbies += parseInt(item.amount);
        } else if (item.id_categ == spendCateg.id[2]) {
          spendTotal.Saves += parseInt(item.amount);
        } else if (item.id_categ == spendCateg.id[3]) {
          spendTotal.Others += parseInt(item.amount);
        }
      }
    });

    setIncome({
      Salary: incomeTotal.Salary,
      Transfert: incomeTotal.Transfert,
      Interest: incomeTotal.Interest,
      Others: incomeTotal.Others,
    });
    setSpend({
      Essentials: spendTotal.Essentials,
      Hobbies: spendTotal.Hobbies,
      Saves: spendTotal.Saves,
      Others: spendTotal.Others,
    });
  };

  useEffect(() => {
    getTotalPerCateg();
  }, [monthlyData]);


  return (
    <div className="flex flex-row justify-around">
      <div className="lg:w-1/3 xs:w-full flex flex-col items-center py-2">
        <div className="grid grid-cols-2">
          {
            // spend
            Object.keys(spend).map((item) => {
              return (
                <Cell
                  key={item}
                  name={item}
                  amount={spend[item]}
                  type="spend"
                />
              );
            })
          }
        </div>
      </div>
      <div className="lg:w-1/3 xs:w-full flex flex-col items-center py-2">
      <div className="grid grid-cols-2">
          {
            // income
            Object.keys(income).map((item) => {
              return (
                <Cell
                  key={item}
                  name={item}
                  amount={income[item]}
                  type="income"
                />
              );
            })
          }
        </div>
      </div>

    </div>
  );
}

export default CellContainer;
