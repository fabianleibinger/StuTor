import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyStudySessions from "./pages/MyStudySessions/MyStudySessions";
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import BookingBox from './pages/BookingPage';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/MyStudySessions" element={<MyStudySessions />} />
          </Routes>
        </div>
      </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
