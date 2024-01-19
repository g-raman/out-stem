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

const labels = [
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
const monthOrderCounts = {};
labels.forEach((label) => (monthOrderCounts[label.toLowerCase()] = 0));

const orderDates = orderData.map((order) => order.date);

orderDates.forEach((date) => {
  const month = labels[new Date(date).getMonth()].toLowerCase();
  monthOrderCounts[month] += 1;
});

const options = {
  responsive: true,
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

export function MonthlyRevenueChart() {
  return <Line options={options} data={data} />;
}
