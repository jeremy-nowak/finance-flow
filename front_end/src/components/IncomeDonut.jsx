import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { useContext } from "react";

import { UserContext } from "../Context/UserContext";

export default function IncomeDonut() {
    const { user } = useContext(UserContext);
    const { data } = useContext(UserContext);

    useEffect(() => {
        const ctx = document.getElementById('incomeChart');

        if (ctx) {
            const existingChart =Chart.getChart(ctx);
            if (existingChart) {
                existingChart.destroy();
            }

            
            const newChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Salary', 'Bonus', 'Investments', 'Other'],
                    datasets: [{
                        label: 'Incomes',
                        data: [450, 400, 1000, 520],
                        backgroundColor: [
                            '#00A878',
                            '#7B0828',
                            '#FFC759',
                            '#79ADDC',
                        ],
                        hoverOffset: 4
                    }]
                },
                options:{
                    color : "white",
                    responsive: true,
                    
                }
            });
        }
    }, [user]); 
    return (
        
            <canvas id="incomeChart"></canvas>
        
    );
}
