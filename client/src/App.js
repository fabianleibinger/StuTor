import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TutorMyStudySessions from './pages/Tutor/MyStudySessions';
import StudentMyStudySessions from './pages/Student/MyStudySessions';
import StudySessionSearch from './pages/StudySessionSearch';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/TutorMyStudySessions"
              element={<TutorMyStudySessions />}
            />
            <Route
              path="/StudySessionSearch"
              element={<StudySessionSearch />}
            />
            <Route
              path="StudentMyStudySessions"
              element={<StudentMyStudySessions />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
