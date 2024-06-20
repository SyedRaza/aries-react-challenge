import React, {useState, useEffect, useCallback} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import {Line} from 'react-chartjs-2';
import {calculateData} from '../utils/process';
import './CodingChallenge.css';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const CodingChallenge = ({optionsData}) => {
    const [chartData, setChartData] = useState(null);
    const options = {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Value (USD)'
                }
            }],
            xAxes: [{
                stacked: true
            }]
        },
        layout: {
            padding: 20
        }
    };
    const updateChartData = useCallback(() => {
        const data = optionsData.map(options => calculateData(options));
        const chart = {
            labels: optionsData.map(it => `${it.strike_price}(${it.type})`),
            datasets: [
                {
                    label: "Maximum Loss",
                    borderColor: "#FF6384",
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    data: data.map(it => it.maxLoss),
                    fill: true
                },
                {
                    label: "Maximum Profit",
                    borderColor: "#36A2EB",
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    data: data.map(it => it.maxProfit),
                    fill: true
                },
                {
                    label: "Break Even Point",
                    borderColor: "#FFCE56",
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    data: data.map(it => it.breakEvenPoint),
                    fill: true
                }
            ]
        };
        setChartData(chart);
    }, [optionsData]); // Dependencies of useCallback
    useEffect(() => {
        updateChartData();
    }, [updateChartData]);


    return (
        <div>
            <h1>Options Profit Calculator</h1>
            <div className="options-calculator">
                {chartData ? (
                    <Line data={chartData} options={options} />
                ) : (
                    <div>Loading chart...</div>
                )}
            </div>
        </div>
    );
};

export default CodingChallenge;
