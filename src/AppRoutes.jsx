// In App.jsx or AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PasteView from "./PasteView";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/p/:id" element={<PasteView />} />
      </Routes>
    </Router>
  );
}

export default App;
