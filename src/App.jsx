import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home"; // your current paste list + create form component
import PasteView from "./PasteView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />       {/* Main page */}
        <Route path="/p/:id" element={<PasteView />} /> {/* Single paste */}
      </Routes>
    </Router>
    
  );
  
}

export default App;
