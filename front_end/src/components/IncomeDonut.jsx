import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { useContext } from "react";

import { UserContext } from "../Context/UserContext";
import { CategContext } from "../Context/CategContext";

export default function IncomeDonut({ totalIncome, setTotalIncome }) {
  const { user, data, monthlyData } = useContext(UserContext);
  const { categ } = useContext(CategContext);
  const { income } = categ;
  const [labels, setLabels] = useState([]);
  //   console.log(income);
  const [credit, setCredit] = useState([]);
  const [soldeLabels, setSoldeLabels] = useState({
    salary: 0,
    transfert: 0,
    interest: 0,
    other: 0,
  });

  const getCredit = () => {
    // on map sur monthlyData pour récupérer toutes les transactions pour lesquelles le type est debit sinon on l'enlève
    let creditTemp = [];
    monthlyData.map((transaction) => {
      if (transaction.type == "credit") {
        creditTemp.push(transaction);
      }
    });
    setCredit(creditTemp);
  };

  const getSoldeLabels = () => {
    let salary = 0;
    let transfert = 0;
    let interest = 0;
    let other = 0;

    credit.map((transaction) => {
      if (transaction.id_categ == income.id[0]) {
        salary += transaction.amount;
      } else if (transaction.id_categ == income.id[1]) {
        transfert += transaction.amount;
      } else if (transaction.id_categ == income.id[2]) {
        interest += transaction.amount;
      } else if (transaction.id_categ == income.id[3]) {
        other += transaction.amount;
      }
    });

    setSoldeLabels({
      ...soldeLabels,
      salary: salary,
      transfert: transfert,
      interest: interest,
      other: other,
    });
  };

  const getLabels = () => {
    let labelsTemp = [];
    income.name.map((name) => {
      labelsTemp.push(name);
    });
    setLabels(labelsTemp);
  };

  useEffect(() => {
    getCredit();
  }, [monthlyData]);

  useEffect(() => {
    getSoldeLabels();
  }, [credit]);

  useEffect(() => {
    if (income.id) {
      getLabels();
    }
  }, [income]);

  useEffect(() => {
    setTotalIncome(
      soldeLabels.salary +
        soldeLabels.transfert +
        soldeLabels.interest +
        soldeLabels.other
    );
  }, [soldeLabels]);

  useEffect(() => {
    const ctx = document.getElementById("incomeChart");

    if (ctx) {
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      const newChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          //   labels: ["Salaire", "Transfert", "Intérêts", "Autres"],
          labels: labels,
          datasets: [
            {
              label: "Incomes",
              data: [
                soldeLabels.salary,
                soldeLabels.transfert,
                soldeLabels.interest,
                soldeLabels.other,
              ],
              backgroundColor: ["#00A878", "#7B0828", "#FFC759", "#79ADDC"],
              hoverOffset: 30,
            },
          ],
        },
        options: {
          color: "white",
          responsive: true,
        },
      });
    }
  }, [soldeLabels]);
  return (
    <>
      <canvas id="incomeChart"></canvas>
      <p className="text-3xl p-2 text-[#C6F4B0] font-bold">{totalIncome}€</p>
    </>
  );
}
