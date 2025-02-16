import React from "react";
import { AddressAutofill } from "@mapbox/search-js-react";

// SVGs
import Search from "../../svg/Search";
import Close from "../../svg/Close";

function SearchBar(props) {
  const { formik } = props;

  return (
    <div className="search__box">
      <form onSubmit={formik.handleSubmit}>
        <AddressAutofill accessToken={process.env.REACT_APP_MAPBOX_KEY}>
          <div className="search-bar between-row">
            <input
              name="address-1"
              type="ext"
              onChange={formik.handleChange}
              value={formik.values["address-1"]}
              placeholder="Enter an address..."
              autoComplete="address-line1"
            />
            <Search />
          </div>
        </AddressAutofill>
        {formik.touched["address-1"] && formik.errors["address-1"] && (
          <div className="auth-form__error between-row">
            <p>{formik.errors["address-1"]}</p>
            <button
              type="button"
              onClick={() => formik.setErrors({})}
              className="search__close"
            >
              <Close />
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchBar;
