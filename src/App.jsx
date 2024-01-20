import { useState } from 'react';
import { MonthlyRevenueChart } from './components/MonthlyRevenueChart';
import { OrdersChart } from './components/OrdersChart';
import SentimentChart from './components/SentimentChart';
import { DatePicker } from './components/ui/DatePicker';
import orderData from './dev-data/order_data';
import reviewData from './dev-data/review_data';
import pricingData from './dev-data/pricing_data';
import { Card, CardContent, CardTitle } from './components/ui/card';
import CountUp from 'react-countup';
import NavBar from './components/ui/NavBar';

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
    <>
      <div className="m-auto mb-4 grid h-dvh w-dvw auto-rows-max grid-cols-1 gap-4 p-5 sm:grid-cols-2 md:grid-rows-[auto_auto_auto] lg:w-[80dvw]">
        <NavBar />
        <div className="flex flex-col justify-center gap-y-2 text-base font-bold sm:text-xl">
          <label>Filter From</label>
          <DatePicker
            defaultMonth={fromDate}
            date={fromDate}
            onSetDate={handleSetFromDate}
          />
        </div>

        <div className="flex h-full flex-col justify-center gap-y-2 text-base font-bold sm:text-xl">
          <label>Filter From</label>
          <DatePicker
            defaultMonth={toDate}
            date={toDate}
            onSetDate={handleSetToDate}
          />
        </div>

        <Card className="flex h-full w-full flex-col gap-2 p-4 text-2xl ">
          <CardTitle>Customer Satisfaction</CardTitle>
          <CardContent className="">
            <SentimentChart reviewData={filteredReviewData} />
          </CardContent>
        </Card>

        <div className="flex h-full flex-col gap-4">
          <Card className="flex w-full  flex-col gap-2 p-4 text-2xl">
            <CardTitle>Total Revenue</CardTitle>
            <span>
              $<CountUp end={total} duration={1} />
            </span>
          </Card>

          <Card className="flex h-min w-full flex-grow flex-col justify-stretch gap-2 p-4 text-2xl">
            <CardTitle>Pizzas Sold Per Location</CardTitle>
            <OrdersChart orderData={filteredOrderData} />
          </Card>
        </div>

        <Card className="flex w-full flex-col items-stretch gap-2 p-6 text-2xl sm:col-span-2">
          <CardTitle>Monthly Revenue</CardTitle>
          <MonthlyRevenueChart fromDate={fromDate} toDate={toDate} />
        </Card>
      </div>
    </>
  );
}

export default App;
