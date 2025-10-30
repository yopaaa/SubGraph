
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TRPL from "./pages/TRPL";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trpl" element={<TRPL />} />
      </Routes>
    </Router>
  );
}

export default App;

