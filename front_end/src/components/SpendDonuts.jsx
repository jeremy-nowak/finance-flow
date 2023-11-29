import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { useContext } from "react";

import { UserContext } from "../Context/UserContext";

import DisplaySolde from "../components/DisplaySolde";

export default function SpendDonut() {
  const { user, data, monthlyData } = useContext(UserContext);
  console.log(monthlyData);
  const [debit, setDebit] = useState([]);

  const getDebit = () => {
    // on map sur monthlyData pour récupérer toutes les transactions pour lesquelles le type est debit
    const debit = monthlyData.map((transaction) => {
      if (transaction.type == "debit") {
        return transaction;
      }
    });
    // on filtre le tableau pour supprimer les undefined
    debit.filter((transaction) => transaction != undefined);
    // on set le state debit avec le tableau filtré

    setDebit(debit);
  };

  useEffect(() => {
    getDebit();
  }, [monthlyData]);

  useEffect(() => {
    console.log("débit", debit);
  }, [debit]);

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
          labels: ["Essential", "Loisirs", "Epargne", "Autres"],
          datasets: [
            {
              label: "Spend",
              data: [data.solde, 400, 1000, 520],
              backgroundColor: ["#7B0828", "#00A878", "#FFC759", "#79ADDC"],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          color: "white",
        },
      });
    }
  }, []); // The empty dependency array ensures that this effect runs once after the initial render

  return <canvas id="spendChart"></canvas>;
}
