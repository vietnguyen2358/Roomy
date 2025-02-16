import React, { useState } from "react";
import { useFormik } from "formik";

// Schemas
import { QuerySchema } from "../../../schemas/ZillowSchemas";

import SearchBar from "./SearchBar";
import BrowseGroups from "./BrowseGroups";

function Home() {
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

  return (
    <div className="home-container main-container">
      <main className="home-main">
        <SearchBar formik={formik} />
        <BrowseGroups addressQuery={addressQuery} />
      </main>
    </div>
  );
}

export default Home;
