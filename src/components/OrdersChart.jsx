import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import orderData from '../dev-data/order_data';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const labels = ['Kanata', 'Orleans', 'Downtown', 'Sandy Hill', 'The Glebe'];
const storeCounts = {};
labels.forEach(
  (label) => (storeCounts[label.toLowerCase().replace(/ /g, '_')] = 0),
);

const stores = orderData.map((order) =>
  order.store.toLowerCase().replace(/ /g, '_'),
);
stores.forEach((store) => (storeCounts[store] += 1));

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Orders at Each Store',
    },
  },
};

const data = {
  labels,
  datasets: [
    {
      label: 'Orders',
      data: Object.values(storeCounts),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export function OrdersChart() {
  return <Bar options={options} data={data} />;
}
