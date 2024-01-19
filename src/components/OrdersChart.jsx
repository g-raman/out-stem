import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

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

export function OrdersChart({ orderData }) {
  const [size, setSize] = useState('A');
  const [type, setType] = useState('A');

  const labels = ['Kanata', 'Orleans', 'Downtown', 'Sandy Hill', 'The Glebe'];
  const storeCounts = {};
  labels.forEach(
    (label) => (storeCounts[label.toLowerCase().replace(/ /g, '_')] = 0),
  );

  const filteredData = orderData.map((order) => {
    const filtered = order.items.filter((item) => {
      const shouldInclude =
        // Include all data
        (size === 'A' && type === 'A') ||
        // Filter by type
        (size === 'A' && item.type === type) ||
        // Filter by size
        (item.size === size && type === 'A') ||
        // Filter by both size and type
        (item.size === size && item.type === type);

      return shouldInclude;
    });

    return {
      items: filtered,
      store: order.store,
    };
  });

  filteredData.forEach((order) => {
    const key = order.store.toLowerCase().replace(/ /g, '_');
    storeCounts[key] += order.items.length;
  });

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

  return (
    <div>
      <select value={size} onChange={(e) => setSize(e.target.value)}>
        <option value="A">All</option>
        <option value="S">Small</option>
        <option value="M">Medium</option>
        <option value="L">Large</option>
      </select>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="A">All</option>
        <option value="Cheese">Cheese</option>
        <option value="Pepperoni">Pepperoni</option>
        <option value="Deluxe">Deluxe</option>
        <option value="Hawaiian">Hawaiian</option>
        <option value="Meatlovers">Meatlovers</option>
      </select>
      <Bar options={options} data={data} />;
    </div>
  );
}
