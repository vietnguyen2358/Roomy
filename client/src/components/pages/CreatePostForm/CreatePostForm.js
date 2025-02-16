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
import Add from "../../svg/Add";

function CreatePostForm() {
  const { showLoading, closeLoading } = useGlobal();
  const { getZillowInfo } = useAPI();
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [dataState, setDataState] = useState({ dataLoaded: false, data: null });
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
        setDataState({ dataLoaded: true, data });
        closeLoading();
      });
    },
  });

  return (
    <div className="create-post-container main-container center">
      <MapBackground
        dataLoaded={dataState.dataLoaded}
        coordinates={coordinates}
      />
      {!dataState.dataLoaded ? (
        <div className="shadow center">
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
      ) : (
        <div className="shadow house-shadow">
          <div className="house-info">
            <img src={dataState.data.imagesUrls} alt={dataState.data.address} />
            <div className="house-info__box">
              <p className="house-info__rent">
                ${dataState.data.rent}/mo <span>(Estimate)</span>
              </p>
              <p className="house-info__address">{dataState.data.address}</p>
              <div className="row">
                <p className="house-info__beds">
                  {dataState.data.bedCount} Beds
                </p>
                <p className="house-info__baths">
                  {dataState.data.bathCount} Baths
                </p>
              </div>

              <button className="house-info__add center">
                <Add />
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePostForm;
