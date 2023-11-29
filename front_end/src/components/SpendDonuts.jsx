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


            // Create a new Chart instance
            const newChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Essential', 'Loisirs', 'Epargne', 'Autres'],
                    datasets: [{
                        label: 'Spend',
                        data: [data.solde, 400, 1000, 520],
                        backgroundColor: [
                            '#7B0828',
                            '#00A878',
                            '#FFC759',
                            '#79ADDC',
                            
                        ],
                        hoverOffset: 4
                    }]
                },
                options:{
                    color : "white"
                }
                
            });
        }
    }, []); // The empty dependency array ensures that this effect runs once after the initial render

    return (
       
            <canvas id="spendChart"></canvas>
        
    );
}
