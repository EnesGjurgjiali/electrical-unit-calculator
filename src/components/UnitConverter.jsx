import React, { useState } from "react";
import "./UnitConverter.css";

const UnitConverter = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("peta");
  const [toUnit, setToUnit] = useState("giga");
  const [convertedValue, setConvertedValue] = useState(null);

  // Prefixes with their corresponding powers of 10
  const unitPrefixes = {
    peta: 15,
    tera: 12,
    giga: 9,
    mega: 6,
    kilo: 3,
    hecto: 2,
    deka: 1,
    none: 0, // base unit
    deci: -1,
    centi: -2,
    milli: -3,
    micro: -6,
    nano: -9,
    pico: -12,
  };

  // Handle input change
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  // Handle the conversion
  const handleConvert = () => {
    const fromPower = unitPrefixes[fromUnit];
    const toPower = unitPrefixes[toUnit];

    if (fromPower === undefined || toPower === undefined || value === "") {
      setConvertedValue("Invalid input");
      return;
    }

    const powerDifference = toPower - fromPower;
    const rawResult = parseFloat(value) * Math.pow(10, powerDifference);

    // Format the number with commas
    const formattedResult = rawResult.toLocaleString(undefined, {
      maximumFractionDigits: 12,
    });

    // Calculate the base 10 power representation with superscript
    const scientificNotation = rawResult.toExponential(2);
    const [mantissa, exponent] = scientificNotation.split("e");
    const powerRepresentation = (
      <>
        10<sup>{parseInt(exponent, 10)}</sup>
      </>
    );

    setConvertedValue({
      formatted: formattedResult,
      scientific: powerRepresentation,
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Shëndërroni njësitë</h1>

      <div className="input-container">
        <label>Jepni një vlerë:</label>
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          placeholder="Jepni një vlerë"
          required
        />
      </div>

      <div className="input-container">
        <label>Nga:</label>
        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="input-select"
        >
          {Object.keys(unitPrefixes).map((prefix) => (
            <option key={prefix} value={prefix}>
              {prefix} (10^{unitPrefixes[prefix]})
            </option>
          ))}
        </select>
      </div>

      {/* Unit Selection for Conversion */}
      <div className="input-container">
        <label>Në:</label>
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="input-select"
        >
          {Object.keys(unitPrefixes).map((prefix) => (
            <option key={prefix} value={prefix}>
              {prefix} (10^{unitPrefixes[prefix]})
            </option>
          ))}
        </select>
      </div>

      {/* Convert Button */}
      <button
        onClick={handleConvert}
        style={{ padding: "10px", marginTop: "20px" }}
      >
        Konverto
      </button>

      {/* Conversion Result */}
      {convertedValue !== null && (
        <div style={{ marginTop: "20px", fontWeight: "bold" }}>
          <p>Vlera e konvertuar: {convertedValue.formatted}</p>
          <p>Shprehja me fuqi: {convertedValue.scientific}</p>
        </div>
      )}
    </div>
  );
};

export default UnitConverter;
