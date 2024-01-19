import { OrdersChart } from './components/OrdersChart';
import SentimentChart from './components/SentimentChart';

function App() {
  return (
    <div>
      <h1 className="text-center text-5xl font-bold text-red-500">
        Hello world
      </h1>

      <SentimentChart />
      <OrdersChart />
    </div>
  );
}

export default App;
