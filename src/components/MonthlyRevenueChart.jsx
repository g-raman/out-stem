/* eslint-disable react/prop-types */
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
import { Line } from 'react-chartjs-2';
import orderData from '../dev-data/order_data';
import pricingData from '../dev-data/pricing_data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export function MonthlyRevenueChart({ fromDate, toDate }) {
  let labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  labels = labels.slice(fromDate.getMonth(), toDate.getMonth() + 1);

  const monthOrderCounts = {};
  labels.forEach((label) => (monthOrderCounts[label.toLowerCase()] = 0));

  orderData.forEach((order) => {
    const month = labels[new Date(order.date).getMonth()]?.toLowerCase();
    if (!month) return;

    order.items.forEach((item) => {
      monthOrderCounts[month] += pricingData[item.type][item.size];
    });
  });

  const options = {
    scales: {
      y: {
        min: 0,
        max: Math.max(...Object.values(monthOrderCounts)) + 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: labels.map((label) => monthOrderCounts[label.toLowerCase()]),
        borderColor: 'rgb(4, 165, 229, 1)',
        backgroundColor: 'rgb(4, 165, 229, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
