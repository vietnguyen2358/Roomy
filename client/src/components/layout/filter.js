import React, { useState } from "react";


const Filter = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  return (
    <div className="filter">
      <h2 className="filter__title">Price Range</h2>

      <div className="filter__price">
        <div className="filter__price-item">
          <label>Minimum</label>
          <select value={minPrice} onChange={(e) => setMinPrice(e.target.value)}>
            <option value="">No Min</option>
            <option value="500">$500</option>
            <option value="1000">$1,000</option>
            <option value="1500">$1,500</option>
          </select>
        </div>

        <span className="filter__separator">-</span>

        <div className="filter__price-item">
          <label>Maximum</label>
          <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
            <option value="">No Max</option>
            <option value="2000">$2,000</option>
            <option value="3000">$3,000</option>
            <option value="4000">$4,000</option>
          </select>
        </div>
      </div>

      <div className="filter__options">
        <div className="filter__option">
          <label>Bedrooms</label>
          <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="filter__option">
          <label>Bathrooms</label>
          <select value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>

      <button className="filter__apply">Apply</button>
    </div>
  );
};

export default Filter;
