import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { useContext } from "react";

import { UserContext } from "../Context/UserContext";
import { CategContext } from "../Context/CategContext";

import DisplaySolde from "../components/DisplaySolde";

export default function SpendDonut({ totalSpend, setTotalSpend }) {
  const { user, data, monthlyData } = useContext(UserContext);
  const { categ } = useContext(CategContext);
  const { spend } = categ;
  const [labels, setLabels] = useState([]);
  //   console.log(spend);
  const [debit, setDebit] = useState([]);
  const [soldeLabels, setSoldeLabels] = useState({
    essential: 0,
    loisirs: 0,
    epargne: 0,
    autres: 0,
  });

  const getDebit = () => {
    // on map sur monthlyData pour récupérer toutes les transactions pour lesquelles le type est debit sinon on l'enlève
    let debitTemp = [];
    monthlyData.map((transaction) => {
      if (transaction.type == "debit") {
        debitTemp.push(transaction);
      }
    });
    setDebit(debitTemp);
  };

  const getSoldeLabels = () => {
    let essential = 0;
    let loisirs = 0;
    let epargne = 0;
    let autres = 0;

    debit.map((transaction) => {
      if (transaction.id_categ == spend.id[0]) {
        essential += transaction.amount;
      } else if (transaction.id_categ == spend.id[1]) {
        loisirs += transaction.amount;
      } else if (transaction.id_categ == spend.id[2]) {
        epargne += transaction.amount;
      } else if (transaction.id_categ == spend.id[3]) {
        autres += transaction.amount;
      }
    });
    setSoldeLabels({
      ...soldeLabels,
      essential: essential,
      loisirs: loisirs,
      epargne: epargne,
      autres: autres,
    });
  };

  const getLabels = () => {
    let labelsTemp = [];
    spend.name.map((name) => {
      labelsTemp.push(name);
    });
    setLabels(labelsTemp);
  };

  useEffect(() => {
    getDebit();
  }, [monthlyData]);

  useEffect(() => {
    getSoldeLabels();
  }, [debit]);

  useEffect(() => {
    if (spend.name) {
      getLabels();
    }
  }, [spend]);

  useEffect(() => {
    setTotalSpend(
      soldeLabels.essential +
        soldeLabels.loisirs +
        soldeLabels.epargne +
        soldeLabels.autres
    );
  }, [soldeLabels]);

  useEffect(() => {
    const ctx = document.getElementById("spendChart");

    if (ctx) {
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      // Create a new Chart instance
      const newChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          // labels: ["essential", "Loisirs", "Epargne", "Autres"],
          labels: labels,
          datasets: [
            {
              label: "Spend",
              data: [
                soldeLabels.essential,
                soldeLabels.loisirs,
                soldeLabels.epargne,
                soldeLabels.autres,
              ],
              backgroundColor: ["#7B0828", "#00A878", "#FFC759", "#79ADDC"],
              hoverOffset: 30,
            },
          ],
        },
        options: {
          color: "white",
        },
      });
    }
  }, [soldeLabels]);

  return (
    <>
      <canvas id="spendChart"></canvas>
      <p className="text-3xl p-2 text-[#FF9393] font-bold">{totalSpend}€</p>
    </>
  );
}
