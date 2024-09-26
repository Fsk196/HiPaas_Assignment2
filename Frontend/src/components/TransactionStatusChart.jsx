import React from "react";
import { Pie } from "react-chartjs-2";
import data from "../fakedata/data";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionStatusChart = () => {
  const statuses = data.reduce((acc, transaction) => {
    acc[transaction.status] = (acc[transaction.status] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(statuses);
  const chartData = Object.values(statuses);

  const colorPalette = [
    "rgba(34, 197, 94, 0.4)", // Light Green
    "rgba(234, 179, 8, 0.4)", // Light Red
    "rgba(239, 68, 68, 0.4)", // Light Blue
  ];

  const borderColorPalette = [
    "rgba(34, 197, 94, 1)", // Dark Green
    "rgba(234, 179, 8, 1)", // Dark Red
    "rgba(239, 68, 68, 1)", // Dark Blue
  ];

  const backgroundColor = colorPalette.slice(0, labels.length);
  const borderColor = borderColorPalette.slice(0, labels.length);

  const chart = {
    labels,
    datasets: [
      {
        label: "Transaction Status",
        data: chartData,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Pie data={chart} />
    </div>
  );
};

export default TransactionStatusChart;
