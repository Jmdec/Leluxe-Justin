"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const data = {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
            {
                label: "Sales",
                data: [50, 70, 40, 90, 100],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)", 
                    "rgba(54, 162, 235, 0.6)", 
                    "rgba(255, 206, 86, 0.6)", 
                    "rgba(75, 192, 192, 0.6)", 
                    "rgba(153, 102, 255, 0.6)", 
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom", 
            },
        },
    };

    return (
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[400px] flex justify-center items-center">
            <Pie data={data}  />
        </div>
    );
};

export default PieChart;
