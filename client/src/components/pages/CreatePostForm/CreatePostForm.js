import React, { useState } from "react";
import { useFormik } from "formik";

// Schemas
import { ZillowLinkSchema } from "../../../schemas/UserSchemas";

// Contexts
import { useGlobal } from "../../../context/Global/Global.context";
import { useAPI } from "../../../context/API/API.context";

// Components
import FormInput from "../../layout/auth/FormInput";
import Search from "../../svg/Search";
import MapBackground from "./MapBackground";

function CreatePostForm() {
  const { showLoading, closeLoading } = useGlobal();
  const { getZillowInfo } = useAPI();
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const formik = useFormik({
    initialValues: {
      zillowLink: "",
    },
    validationSchema: ZillowLinkSchema,
    onSubmit: (values) => {
      showLoading("Finding Zillow Information...");
      getZillowInfo(values.zillowLink, (data, err) => {
        if (err) return console.log(err);

        const { latitude, longitude } = data;
        setCoordinates([longitude, latitude]);
        setDataLoaded(true);
        console.log(data);
        closeLoading();
      });
    },
  });

  return (
    <div className="create-post-container main-container center">
      <MapBackground dataLoaded={dataLoaded} coordinates={coordinates} />
      <div
        className="shadow center"
        style={dataLoaded ? { display: "none" } : {}}
      >
        <form onSubmit={formik.handleSubmit} className="create-post-form">
          <h1>
            Create a <span>Roomy</span> Group
          </h1>

          {/* Zillow Link */}
          <FormInput
            name="zillowLink"
            placeholder="Enter a Zillow URL..."
            type="text"
            label="Zillow URL"
            formik={formik}
          />

          <button type="submit" className="create-post-form__submit row">
            <Search />
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostForm;
