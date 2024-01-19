import { useState } from 'react';
import { MonthlyRevenueChart } from './components/MonthlyRevenueChart';
import { OrdersChart } from './components/OrdersChart';
import SentimentChart from './components/SentimentChart';
import { DatePicker } from './components/ui/DatePicker';
import orderData from './dev-data/order_data';
import reviewData from './dev-data/review_data';
import pricingData from './dev-data/pricing_data';

const total = orderData
  .flatMap((order) => order.items)
  .reduce((acc, curr) => {
    return acc + pricingData[curr.type][curr.size];
  }, 0);

const MIN_DATE = new Date('2023-01-01 ');
const MAX_DATE = new Date('2023-12-31 ');

function App() {
  const [fromDate, setFromDate] = useState(MIN_DATE);
  const [toDate, setToDate] = useState(MAX_DATE);

  function handleSetFromDate(date) {
    if (date < MIN_DATE || date > MAX_DATE) return;

    setFromDate(date);

    if (!date) setToDate(date);
    else if (!toDate) setToDate(date);
    else if (toDate < date) setToDate(date);
  }

  function handleSetToDate(date) {
    if (date < MIN_DATE || date > MAX_DATE) return;

    setToDate(date);
    if (!date) setFromDate(date);
    else if (!fromDate) setFromDate(date);
    else if (date < fromDate) setFromDate(date);
  }

  const filteredOrderData = orderData.filter((order) => {
    const orderDate = new Date(order.date + ' ');

    return (
      !fromDate || !toDate || (orderDate >= fromDate && orderDate <= toDate)
    );
  });

  const filteredReviewData = reviewData.filter((review) => {
    const reviewDate = new Date(review.date + ' ');

    return (
      !fromDate || !toDate || (reviewDate >= fromDate && reviewDate <= toDate)
    );
  });

  return (
    <div>
      <h1 className="text-center text-5xl font-bold text-red-500">
        Hello world
      </h1>

      <DatePicker date={fromDate} onSetDate={handleSetFromDate} />
      <DatePicker date={toDate} onSetDate={handleSetToDate} />
      <SentimentChart reviewData={filteredReviewData} />
      <OrdersChart orderData={filteredOrderData} />
      <MonthlyRevenueChart fromDate={fromDate} toDate={toDate} />
      <p>${total}</p>
    </div>
  );
}

export default App;
