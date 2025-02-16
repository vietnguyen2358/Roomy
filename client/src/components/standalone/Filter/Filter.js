import React, { useState } from "react";

const Filter = (props) => {
  const { filter, setFilter } = props;

  return (
    <div className="filter">
      <h2 className="filter__title">Price Range</h2>

      <div className="filter__price">
        <div className="filter__price-item">
          <label>Minimum</label>
          <select
            value={filter.minPrice}
            onChange={(e) =>
              setFilter((oldFilter) => ({
                ...oldFilter,
                minPrice: e.target.value,
              }))
            }
          >
            <option value="">No Min</option>
            <option value={500}>$500</option>
            <option value={1000}>$1,000</option>
            <option value={1500}>$1,500</option>
            <option value={2000}>$2,000</option>
          </select>
        </div>

        <span className="filter__separator">-</span>

        <div className="filter__price-item">
          <label>Maximum</label>
          <select
            value={filter.maxPrice}
            onChange={(e) =>
              setFilter((oldFilter) => ({
                ...oldFilter,
                maxPrice: e.target.value,
              }))
            }
          >
            <option value="">No Max</option>
            <option value={2000}>$2,000</option>
            <option value={3000}>$4,000</option>
            <option value={8000}>$8,000</option>
            <option value={10000}>$10,000</option>
          </select>
        </div>
      </div>

      <div className="filter__options">
        <div className="filter__option">
          <label>Bedrooms</label>
          <select
            value={filter.bedrooms}
            onChange={(e) =>
              setFilter((oldFilter) => ({
                ...oldFilter,
                bedrooms: e.target.value,
              }))
            }
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>

        <div className="filter__option">
          <label>Bathrooms</label>
          <select
            value={filter.bathrooms}
            onChange={(e) =>
              setFilter((oldFilter) => ({
                ...oldFilter,
                bathrooms: e.target.value,
              }))
            }
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>
      </div>

      <button className="filter__apply">Apply</button>
    </div>
  );
};

export default Filter;
