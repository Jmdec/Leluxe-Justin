"use client";

import { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getTotalBookings } from "../dashboard/Action";
import { Select, SelectItem } from "@heroui/select";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Booking {
    originalDate: Date;
    day: number;
    month: number;
    year: number;
    count: number;
}

const BarChart = () => {
    const [bookingsData, setBookingsData] = useState<Booking[]>([]);
    const [timeFrame, setTimeFrame] = useState("daily");

    useEffect(() => {
        const fetchData = async () => {
            const response = await getTotalBookings();
            setBookingsData(response.bookings);
        };

        fetchData();
    }, []);

    const handleTimeFrameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeFrame(e.target.value);
    };

    const formatMonthYear = (month: number, year: number) => {
        // Format the date to "Month Year" (e.g., "January 2025")
        const date = new Date(year, month - 1); // Month is 0-indexed
        return date.toLocaleString("default", { month: "long", year: "numeric" });
    };

    const processChartData = () => {
        let filteredData: { [key: string]: number } = {}; // Explicitly typing as a dictionary
        let labels: string[] = [];
        let counts: number[] = [];

        if (timeFrame === "daily") {
            filteredData = bookingsData.reduce((acc, booking) => {
                const day = booking.day.toString(); // Convert to string for use as a key
                acc[day] = (acc[day] || 0) + booking.count;
                return acc;
            }, {} as { [key: string]: number });
            labels = Object.keys(filteredData);
            counts = Object.values(filteredData);
        } else if (timeFrame === "monthly") {
            filteredData = bookingsData.reduce((acc, booking) => {
                const monthYear = formatMonthYear(booking.month, booking.year);
                acc[monthYear] = (acc[monthYear] || 0) + booking.count;
                return acc;
            }, {} as { [key: string]: number });
            labels = Object.keys(filteredData);
            counts = Object.values(filteredData);
        } else if (timeFrame === "yearly") {
            filteredData = bookingsData.reduce((acc, booking) => {
                const year = booking.year.toString();
                acc[year] = (acc[year] || 0) + booking.count;
                return acc;
            }, {} as { [key: string]: number });
            labels = Object.keys(filteredData);
            counts = Object.values(filteredData);
        }

        return { labels, counts };
    };

    const { labels, counts } = processChartData();

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Bookings",
                data: counts,
                backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
            },
        },
    };

    return (
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[500px] overflow-hidden">
            <div className="mb-4">
                <Select value={timeFrame} onChange={handleTimeFrameChange} placeholder="Select Time Frame" className="w-1/4">
                    <SelectItem key="daily">Daily</SelectItem>
                    <SelectItem key="monthly">Monthly</SelectItem>
                    <SelectItem key="yearly">Yearly</SelectItem>
                </Select>
            </div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
