import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyStudySessions from "./pages/MyStudySessions/MyStudySessions";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/MyStudySessions" element={<MyStudySessions />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
