import Chart from "chart.js/auto";
import React, { useEffect, useRef, useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";

export default function RecapBar() {
  const { yearlyData } = useContext(UserContext);
  const [monthlyData, setMonthlyData] = useState({
    january: [],
    february: [],
    march: [],
    april: [],
    may: [],
    june: [],
    july: [],
    august: [],
    september: [],
    october: [],
    november: [],
    december: [],
  });

  const [soldPerMonth, setSoldPerMonth] = useState({
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
  });

  const [year, setYear] = useState(new Date().getFullYear());

  const getMonthlyData = () => {
    let january = [];
    let february = [];
    let march = [];
    let april = [];
    let may = [];
    let june = [];
    let july = [];
    let august = [];
    let september = [];
    let october = [];
    let november = [];
    let december = [];

    yearlyData.map((transaction) => {
      const month = transaction.date.split("-")[1];
      if (month == "01") {
        january.push(transaction);
      } else if (month == "02") {
        february.push(transaction);
      } else if (month == "03") {
        march.push(transaction);
      } else if (month == "04") {
        april.push(transaction);
      } else if (month == "05") {
        may.push(transaction);
      } else if (month == "06") {
        june.push(transaction);
      } else if (month == "07") {
        july.push(transaction);
      } else if (month == "08") {
        august.push(transaction);
      } else if (month == "09") {
        september.push(transaction);
      } else if (month == "10") {
        october.push(transaction);
      } else if (month == "11") {
        november.push(transaction);
      } else if (month == "12") {
        december.push(transaction);
      }
    });

    setMonthlyData({
      ...monthlyData,
      january: january,
      february: february,
      march: march,
      april: april,
      may: may,
      june: june,
      july: july,
      august: august,
      september: september,
      october: october,
      november: november,
      december: december,
    });
  };

  const getSoldPerMonth = () => {
    let january = 0;
    let february = 0;
    let march = 0;
    let april = 0;
    let may = 0;
    let june = 0;
    let july = 0;
    let august = 0;
    let september = 0;
    let october = 0;
    let november = 0;
    let december = 0;

    monthlyData.january.map((transaction) => {
      // si le type est crédit, on ajoute le montant à january
      if (transaction.type == "credit") {
        january += transaction.amount;
      } else {
        january -= transaction.amount;
      }
    });
    monthlyData.february.map((transaction) => {
      if (transaction.type == "credit") {
        february += transaction.amount;
      } else {
        february -= transaction.amount;
      }
    });
    monthlyData.march.map((transaction) => {
      if (transaction.type == "credit") {
        march += transaction.amount;
      } else {
        march -= transaction.amount;
      }
    });
    monthlyData.april.map((transaction) => {
      if (transaction.type == "credit") {
        april += transaction.amount;
      } else {
        april -= transaction.amount;
      }
    });
    monthlyData.may.map((transaction) => {
      if (transaction.type == "credit") {
        may += transaction.amount;
      } else {
        may -= transaction.amount;
      }
    });
    monthlyData.june.map((transaction) => {
      if (transaction.type == "credit") {
        june += transaction.amount;
      } else {
        june -= transaction.amount;
      }
    });
    monthlyData.july.map((transaction) => {
      if (transaction.type == "credit") {
        july += transaction.amount;
      } else {
        july -= transaction.amount;
      }
    });
    monthlyData.august.map((transaction) => {
      if (transaction.type == "credit") {
        august += transaction.amount;
      } else {
        august -= transaction.amount;
      }
    });
    monthlyData.september.map((transaction) => {
      if (transaction.type == "credit") {
        september += transaction.amount;
      } else {
        september -= transaction.amount;
      }
    });
    monthlyData.october.map((transaction) => {
      if (transaction.type == "credit") {
        october += transaction.amount;
      } else {
        october -= transaction.amount;
      }
    });
    monthlyData.november.map((transaction) => {
      if (transaction.type == "credit") {
        november += transaction.amount;
      } else {
        november -= transaction.amount;
      }
    });
    monthlyData.december.map((transaction) => {
      if (transaction.type == "credit") {
        december += transaction.amount;
      } else {
        december -= transaction.amount;
      }
    });

    setSoldPerMonth({
      ...soldPerMonth,
      january: january,
      february: february,
      march: march,
      april: april,
      may: may,
      june: june,
      july: july,
      august: august,
      september: september,
      october: october,
      november: november,
      december: december,
    });
  };

  useEffect(() => {
    getMonthlyData();
  }, [yearlyData]);

  useEffect(() => {
    getSoldPerMonth();
  }, [monthlyData]);

  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        data: [
          soldPerMonth.january,
          soldPerMonth.february,
          soldPerMonth.march,
          soldPerMonth.april,
          soldPerMonth.may,
          soldPerMonth.june,
          soldPerMonth.july,
          soldPerMonth.august,
          soldPerMonth.september,
          soldPerMonth.october,
          soldPerMonth.november,
          soldPerMonth.december,
        ],
        backgroundColor: [
          "rgba(255, 99, 132,)",
          "rgba(255, 159, 64,)",
          "rgba(255, 205, 86,)",
          "rgba(75, 192, 192,)",
          "rgba(54, 162, 235,)",
          "rgba(153, 102, 255,)",
          "rgba(201, 203, 207,)",
          "rgba(255, 99, 132,)",
          "rgba(255, 159, 64,)",
          "rgba(255, 205, 86,)",
          "rgba(75, 192, 192,)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: year,
        color: "white",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: "bar",
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
