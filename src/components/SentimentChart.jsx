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
          'rgb(64, 160, 43, 0.4)',
          'rgb(4, 165, 229, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgb(210, 15, 57, 0.4)',
        ],
        borderColor: [
          'rgb(64, 160, 43, 1)',
          'rgb(4, 165, 229, 1)',
          'rgba(255, 206, 86, 1)',
          'rgb(210, 15, 57, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return <Doughnut data={data} options={options} />;
}

export default SentimentChart;
