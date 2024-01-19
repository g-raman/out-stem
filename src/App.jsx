import { useState } from 'react';
import { MonthlyRevenueChart } from './components/MonthlyRevenueChart';
import { OrdersChart } from './components/OrdersChart';
import SentimentChart from './components/SentimentChart';
import { DatePicker } from './components/ui/DatePicker';
import orderData from './dev-data/order_data';
import reviewData from './dev-data/review_data';
import pricingData from './dev-data/pricing_data';
import { Card, CardContent, CardTitle } from './components/ui/card';
import { CookieIcon } from '@radix-ui/react-icons';

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
    <div className="grid h-dvh w-dvw auto-rows-min grid-cols-1 gap-4 p-5">
      <div className="flex flex-col justify-center gap-y-2">
        <label>Filter From</label>
        <DatePicker date={fromDate} onSetDate={handleSetFromDate} />
      </div>

      <div className="flex h-full flex-col justify-center gap-y-2">
        <label>Filter From</label>
        <DatePicker date={toDate} onSetDate={handleSetToDate} />
      </div>

      <Card className="flex h-min w-full flex-col gap-2 px-4 py-8 text-2xl">
        <CardTitle>Customer Satisfaction</CardTitle>
        <CardContent className="h-max w-full">
          <SentimentChart reviewData={filteredReviewData} />
        </CardContent>
      </Card>

      <Card className="flex h-min w-full flex-col gap-2 p-4 pt-8 text-2xl">
        <CardTitle># of Items Per Location</CardTitle>
        <CardContent className="h-max">
          <OrdersChart orderData={filteredOrderData} />
        </CardContent>
      </Card>

      <Card className="flex h-min w-full flex-col gap-2 p-4 text-2xl">
        <CardTitle>Monthly Revenue</CardTitle>
        <CardContent className="h-[30dvh] w-full sm:h-[40dvh]">
          <MonthlyRevenueChart fromDate={fromDate} toDate={toDate} />
        </CardContent>
      </Card>

      <Card className="flex h-min w-full flex-col gap-2 p-4 text-2xl">
        <CardTitle>Total Revenue</CardTitle>
        <CardContent className="">${total}</CardContent>
      </Card>
    </div>
  );
}

export default App;
