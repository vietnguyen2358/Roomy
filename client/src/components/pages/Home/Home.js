import React, { useState } from "react";
import { useFormik } from "formik";

// Schemas
import { QuerySchema } from "../../../schemas/ZillowSchemas";

// Contexts
import { useGlobal } from "../../../context/Global/Global.context";

// Components
import SearchBar from "./SearchBar";
import BrowseGroups from "./BrowseGroups";
import ActiveCard from "./ActiveCard";
import Filter from "../../standalone/Filter/Filter";

function Home() {
  const { houseCardState } = useGlobal();
  const [addressQuery, setAddressQuery] = useState(null);
  const formik = useFormik({
    initialValues: {
      "address-1": "",
    },
    validationSchema: QuerySchema,
    onSubmit: (values, { resetForm }) => {
      setAddressQuery(values["address-1"]);
      resetForm();
    },
    validateOnBlur: false,
    validateOnChange: false,
  });
  const [filter, setFilter] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: 1,
    bathrooms: 1,
  });

  return (
    <div className="home-container main-container">
      <div className="row home-row">
        <main className="home-main">
          <SearchBar formik={formik} />
          <BrowseGroups filter={filter} addressQuery={addressQuery} />
        </main>
        <Filter filter={filter} setFilter={setFilter} />
      </div>

      {houseCardState.show && <ActiveCard houseCardState={houseCardState} />}
    </div>
  );
}

export default Home;
