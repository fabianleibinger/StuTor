import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import ChatPage from './pages/ChatPage';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ChatPage />
      </QueryClientProvider>
    </div>
  );
}

export default App;
