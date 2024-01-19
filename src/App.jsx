import { OrdersChart } from './components/OrdersChart';
import SentimentChart from './components/SentimentChart';
import orderData from './dev-data/order_data';
import pricingData from './dev-data/pricing_data';

const total = orderData
  .flatMap((order) => order.items)
  .reduce((acc, curr) => {
    console.log(pricingData[curr.type][curr.size]);
    return acc + pricingData[curr.type][curr.size];
  }, 0);

function App() {
  return (
    <div>
      <h1 className="text-center text-5xl font-bold text-red-500">
        Hello world
      </h1>

      <SentimentChart />
      <OrdersChart />
      <p>${total}</p>
    </div>
  );
}

export default App;
