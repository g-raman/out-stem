/* eslint-disable react/prop-types */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  // responsive: false,
  // maintainAspectRatio: false,
};

function SentimentChart({ reviewData }) {
  const sentimentCounts = {
    delighted: 0,
    happy: 0,
    sad: 0,
    angry: 0,
  };
  const sentiments = reviewData.map((review) => review.sentiment);

  sentiments.forEach((sentiment) => (sentimentCounts[sentiment] += 1));
  const sentimentData = Object.values(sentimentCounts);

  const data = {
    labels: ['Delighted', 'Happy', 'Sad', 'Angry'],
    datasets: [
      {
        label: '# of Votes',
        data: sentimentData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return <Doughnut data={data} options={options} />;
}

export default SentimentChart;
