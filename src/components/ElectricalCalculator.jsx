  import React, { useState } from "react";
  import "./ElectricalCalculator.css";

  const ElectricalCalculator = () => {
    const [calculationType, setCalculationType] = useState("current"); // Default to calculating current
    const [inputs, setInputs] = useState({ q: "", t: "", w: "", r: "", u: "", i: "", length: "", area: "", resistivity: "" });
    const [result, setResult] = useState(null);

    const handleInputChange = (e) => {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const calculate = () => {
      let res = null;

      try {
        const { q, t, w, r, u, i, length, area, resistivity } = inputs;
        switch (calculationType) {
          case "current": // I = q / t
            res = `${(parseFloat(q) / parseFloat(t)).toFixed(2)} A`; // Amperes
            break;
          case "charge": // q = I * t
            res = `${(parseFloat(i) * parseFloat(t)).toFixed(2)} C`; // Coulombs
            break;
          case "voltage": // U = w / q
            res = `${(parseFloat(w) / parseFloat(q)).toFixed(2)} V`; // Volts
            break;
          case "work": // w = U * q
            res = `${(parseFloat(u) * parseFloat(q)).toFixed(2)} J`; // Joules
            break;
          case "resistance": // R = U / I
            res = `${(parseFloat(u) / parseFloat(i)).toFixed(2)} Ω`; // Ohms
            break;
          case "specificResistance": // R = ρ * (L / A)
            if (length && area && resistivity) {
              res = `${(parseFloat(resistivity) * parseFloat(length) / parseFloat(area)).toFixed(2)} Ω`;
            } else {
              res = "Please provide all values for specific resistance calculation.";
            }
            break;
          case "ohmsLaw": // U = I * R
            res = `${(parseFloat(i) * parseFloat(r)).toFixed(2)} V`; // Volts
            break;
          default:
            res = "Invalid calculation type";
        }
      } catch (error) {
        res = "Invalid input";
      }

      setResult(res);
    };

    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Kalkulator për madhësitë elektrike</h1>

        {/* Grouped Dropdowns for Selection */}
        <div className="input-container">
    <label htmlFor="calculationType" className="input-label">Zgjedhni llojin e kalkulimit:</label>
    <select
      id="currentOptions"
      value={calculationType}
      onChange={(e) => setCalculationType(e.target.value)}
      className="input-select"
    >
      <optgroup label="Intensiteti i Rrymes (Current)">
        <option value="current">Intensiteti i rrymes (I = q / t)</option>
        <option value="charge">Ngarkesa elektrike (q = I * t)</option>
      </optgroup>
      <optgroup label="Tensioni (Voltage)">
        <option value="voltage">Tensioni (U = w / q)</option>
        <option value="work">Energjia (w = U * q)</option>
      </optgroup>
      <optgroup label="Rezistanca (Resistance)">
        <option value="resistance">Rezistanca (R = U / I)</option>
        <option value="specificResistance">Rez. Specifike (R = ρ * (L / A))</option>
      </optgroup>
      <optgroup label="Ligji i Ohm'it">
        <option value="ohmsLaw">Ligji i Ohm'it (U = I * R)</option>
      </optgroup>
    </select>
  </div>


        {/* Input fields based on selected calculation type */}
        <div style={{ marginTop: "20px" }}>
          {calculationType === "current" && (
            <div className="input-container">
              <div className="input-item">
                <label>Ngarkesa (q | [c]):</label>
                <input type="number" name="q" value={inputs.q} onChange={handleInputChange} />
              </div>
              <div className="input-item">
                <label>Koha (t | [s]):</label>
                <input type="number" name="t" value={inputs.t} onChange={handleInputChange} />
              </div>
            </div>
          )}
          {calculationType === "charge" && (
            <div className="input-container">
              <div className="input-item">
                <label>Intensiteti (I | [A]):</label>
                <input type="number" name="i" value={inputs.i} onChange={handleInputChange} />
              </div>
              <div className="input-item">
                <label>Koha (t | [s]):</label>
                <input type="number" name="t" value={inputs.t} onChange={handleInputChange} />
              </div>
            </div>
          )}
          {calculationType === "voltage" && (
            <div className="input-container">
              <div className="input-item">
                <label>Energjia (w [J]):</label>
                <input type="number" name="w" value={inputs.w} onChange={handleInputChange} />
              </div>
              <div className="input-item">
                <label>Ngarkesa (q [c]):</label>
                <input type="number" name="q" value={inputs.q} onChange={handleInputChange} />
              </div>
            </div>
          )}
          {calculationType === "work" && (
            <div className="input-container">
              <div className="input-item">
                <label>Tensioni (V):</label>
                <input type="number" name="w" value={inputs.w} onChange={handleInputChange} />
              </div>
              <div className="input-item">
                <label>Ngarkesa (q [c]):</label>
                <input type="number" name="q" value={inputs.q} onChange={handleInputChange} />
              </div>
            </div>
          )}
          {calculationType === "resistance" && (
            <div className="input-container">
              <div className="input-item">
                <label>Tensioni (V):</label>
                <input type="number" name="u" value={inputs.u} onChange={handleInputChange} />
              </div>
              <div className="input-item">
                <label>Intensiteti (I | [A]):</label>
                <input type="number" name="i" value={inputs.i} onChange={handleInputChange} />
              </div>
            </div>
          )}
          {calculationType === "specificResistance" && (
            <div className="input-container">
              <div className="input-item">
                <label>Rezistenca speciike (ρ [Ωm]):</label>
                <input type="number" name="resistivity" value={inputs.resistivity} onChange={handleInputChange} />
              </div>
              <div className="input-item">
                <label>Gjatësia (l [m]):</label>
                <input type="number" name="length" value={inputs.length} onChange={handleInputChange} />
              </div>
              <div className="input-item">
                <label>Sipërfaqja (s [m2]):</label>
                <input type="number" name="area" value={inputs.area} onChange={handleInputChange} />
              </div>
            </div>
          )}
          {calculationType === "ohmsLaw" && (
            <div className="input-container">
              <div className="input-item">
                <label>Current (I in Amperes):</label>
                <input type="number" name="i" value={inputs.i} onChange={handleInputChange} />
              </div>
              <div className="input-item">
                <label>Resistance (R in Ohms):</label>
                <input type="number" name="r" value={inputs.r} onChange={handleInputChange} />
              </div>
            </div>
          )}
        </div>

        {/* Calculate Button */}
        <button onClick={calculate} style={{ marginTop: "20px", padding: "10px" }}>
          Kalkulo
        </button>

        {/* Result Display */}
        {result !== null && (
          <div style={{ marginTop: "20px", fontWeight: "bold" }}>
            Rezultati: {result}
          </div>
        )}
      </div>
    );
  };

  export default ElectricalCalculator;
