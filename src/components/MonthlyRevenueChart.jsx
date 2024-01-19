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

  <fromDate></fromDate>;
  labels = labels.slice(fromDate.getMonth(), toDate.getMonth() + 1);

  const monthOrderCounts = {};
  labels.forEach((label) => (monthOrderCounts[label.toLowerCase()] = 0));

  const orderDates = orderData.map((order) => order.date);

  orderDates.forEach((date) => {
    const month = labels[new Date(date).getMonth()]?.toLowerCase();
    if (month) monthOrderCounts[month] += 1;
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: Math.max(...Object.values(monthOrderCounts)) + 2,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Orders per Month',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: labels.map((label) => monthOrderCounts[label.toLowerCase()]),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
