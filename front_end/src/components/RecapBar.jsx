import Chart from 'chart.js/auto';
import React, { useEffect, useRef } from 'react';

export default function RecapBar() {
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Total',
            data: [65, 59, -180, 181, 56, -55, 40, 12, -45, 78, 98, 45],
            backgroundColor: [
                'rgba(255, 99, 132,)',
                'rgba(255, 159, 64,)',
                'rgba(255, 205, 86,)',
                'rgba(75, 192, 192,)',
                'rgba(54, 162, 235,)',
                'rgba(153, 102, 255,)',
                'rgba(201, 203, 207,)',
                'rgba(255, 99, 132,)',
                'rgba(255, 159, 64,)',
                'rgba(255, 205, 86,)',
                'rgba(75, 192, 192,)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)'
            ],
            borderWidth: 1,
        }],
    };

    const options = {
        legend: {
            labels: {
                color: 'red',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'white',
                },
            },
            y: {
                ticks: {
                    color: 'white',
                },
            },
        },
    };

    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
        }

        const newChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: options,
        });

        chartRef.current.chart = newChart;
    }, [chartData, options]);
    return (
        <div>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}
