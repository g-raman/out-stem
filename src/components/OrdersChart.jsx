/* eslint-disable react/prop-types */
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
import { ComboBox } from './ui/ComboBox';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const pizzaSizes = [
  {
    value: 'S',
    label: 'Small',
  },
  {
    value: 'M',
    label: 'Medium',
  },
  {
    value: 'L',
    label: 'Large',
  },
];

const pizzaTypes = [
  {
    value: 'Cheese',
    label: 'Cheesse',
  },
  {
    value: 'Pepperoni',
    label: 'Pepperoni',
  },
  {
    value: 'Deluxe',
    label: 'Deluxe',
  },
  {
    value: 'Hawaiian',
    label: 'Hawaiian',
  },
  {
    value: 'Meatlovers',
    label: 'Meatlovers',
  },
];

const options = {
  responsive: true,
  // maintainAspectRatio: false,
  aspectRatio: 2,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

export function OrdersChart({ orderData }) {
  const [size, setSize] = useState('');
  const [type, setType] = useState('');

  const labels = ['Kanata', 'Orleans', 'Downtown', 'Sandy Hill', 'The Glebe'];
  const storeCounts = {};
  labels.forEach(
    (label) => (storeCounts[label.toLowerCase().replace(/ /g, '_')] = 0),
  );

  const filteredData = orderData.map((order) => {
    const filtered = order.items.filter((item) => {
      const shouldInclude =
        // Include all data
        (size === '' && type === '') ||
        // Filter by type
        (size === '' && item.type === type) ||
        // Filter by size
        (item.size === size && type === '') ||
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
    <div className="w-full">
      <div className="mb-2 flex w-full flex-wrap justify-between">
        <ComboBox
          value={size}
          onSetValue={setSize}
          options={pizzaSizes}
          placeholder={'Select Pizza Size'}
          errorMsg={'No Size Found'}
          searchPlaceholder={'Search Sizes'}
          classNames={'w-[48%] flex-grow-1'}
        />

        <ComboBox
          value={type}
          onSetValue={setType}
          options={pizzaTypes}
          placeholder={'Select Pizza Type'}
          errorMsg={'No Pizza Found'}
          searchPlaceholder={'Search Pizzas'}
          classNames={'w-[48%] flex-grow-1'}
        />
      </div>
      <Bar options={options} data={data} />
    </div>
  );
}
