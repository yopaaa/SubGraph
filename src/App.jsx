
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TRPL from "./trpl/TRPL";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trpl" element={<TRPL />} />
        <Route path="/diskrit" element={<TRPL />} />
        <Route path="/group" element={<TRPL />} />
      </Routes>
    </Router>
  );
}

export default App;

