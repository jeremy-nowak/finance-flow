import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import { useContext } from "react";

import { UserContext } from "../Context/UserContext";

import DisplaySolde from "../components/DisplaySolde";

export default function SpendDonut() {
  const { user } = useContext(UserContext);
  const { data } = useContext(UserContext);

  useEffect(() => {
    const ctx = document.getElementById("spendChart");

    if (ctx) {
      // Check if there is an existing Chart instance and destroy it
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }

      // Create a new Chart instance
      const newChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Essentiel", "Loisirs", "Epargne", "Autres"],
          datasets: [
            {
              label: "Spend",
              data: [data.solde, 400, 1000, 520],
              backgroundColor: ["#7B0828", "#00A878", "#FFC759", "#79ADDC"],
              hoverOffset: 4,
            },
          ],
        },
      });
    }
  }, [data]); // The empty dependency array ensures that this effect runs once after the initial render

  return (
    <div>
      <canvas id="spendChart" width="180" height="180"></canvas>
    </div>
  );
}
