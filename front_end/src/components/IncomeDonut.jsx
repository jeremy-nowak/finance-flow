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
            // Check if there is an existing Chart instance and destroy it
            const existingChart =Chart.getChart(ctx);
            if (existingChart) {
                existingChart.destroy();
            }

            // Create a new Chart instance for incomes
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
            });
        }
    }, [user]); // Re-run the effect when the user data changes

    return (
        <div>
            <canvas id="incomeChart" width="180" height="180"></canvas>
        </div>
    );
}
