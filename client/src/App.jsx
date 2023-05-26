import './App.css';
import BookingPage from './pages/BookingPage/BookingPage.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div className="App">
        <BookingPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;


