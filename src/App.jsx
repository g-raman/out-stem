import { useState } from 'react';
import { MonthlyRevenueChart } from './components/MonthlyRevenueChart';
import { OrdersChart } from './components/OrdersChart';
import SentimentChart from './components/SentimentChart';
import { DatePicker } from './components/ui/DatePicker';
import orderData from './dev-data/order_data';
import pricingData from './dev-data/pricing_data';

const total = orderData
  .flatMap((order) => order.items)
  .reduce((acc, curr) => {
    return acc + pricingData[curr.type][curr.size];
  }, 0);

function App() {
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  function handleSetFromDate(date) {
    setFromDate(date);
    if (!date) setToDate(date);
    else if (!toDate) setToDate(date);
    else if (toDate < date) setToDate(date);
  }

  function handleSetToDate(date) {
    setToDate(date);
    if (!date) setFromDate(date);
    else if (!fromDate) setFromDate(date);
    else if (date < fromDate) setFromDate(date);
  }

  return (
    <div>
      <h1 className="text-center text-5xl font-bold text-red-500">
        Hello world
      </h1>

      <DatePicker date={fromDate} onSetDate={handleSetFromDate} />
      <DatePicker date={toDate} onSetDate={handleSetToDate} />
      <SentimentChart />
      <OrdersChart />
      <MonthlyRevenueChart />
      <p>${total}</p>
    </div>
  );
}

export default App;
