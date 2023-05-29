import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import BookingBox from './pages/BookingPage';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BookingBox />
      </QueryClientProvider>
    </div>
  );
}

export default App;
