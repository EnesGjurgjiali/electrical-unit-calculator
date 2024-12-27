import ElectricalCalculator from "./components/ElectricalCalculator";
import UnitConverter from "./components/UnitConverter";  
import { Routes, Route } from "react-router-dom";  
import './App.css'

function App() {
  return (
    <div>
      <Routes> 
        <Route path="/" element={<ElectricalCalculator />} />  {/* Default path */}
        <Route path="/unit-converter" element={<UnitConverter />} />  
      </Routes>
    </div>
  );
}

export default App;
