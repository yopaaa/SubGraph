
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TRPL from "./pages/TRPL";
import TRPL2 from "./pages/TRPL2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trpl" element={<TRPL />} />
        <Route path="/diskrit" element={<TRPL />} />
        <Route path="/group" element={<TRPL />} />
        <Route path="/trpl2" element={<TRPL2 />} />
      </Routes>
    </Router>
  );
}

export default App;

