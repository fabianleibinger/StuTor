import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyStudySessions from './pages/MyStudySessions';
import StudySessionSearch from './pages/StudySessionSearch';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/MyStudySessions" element={<MyStudySessions />} />
            <Route
              path="/StudySessionSearch"
              element={<StudySessionSearch />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
