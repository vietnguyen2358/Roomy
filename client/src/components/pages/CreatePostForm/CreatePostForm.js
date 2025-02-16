import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { animated, useSprings } from "@react-spring/web";

// Schemas
import { ZillowLinkSchema } from "../../../schemas/UserSchemas";

// Contexts
import { useGlobal } from "../../../context/Global/Global.context";
import { useAPI } from "../../../context/API/API.context";
import { useUser } from "../../../context/User/User.context";

// Components
import FormInput from "../../layout/auth/FormInput";
import Search from "../../svg/Search";
import MapBackground from "./MapBackground";
import Add from "../../svg/Add";

function CreatePostForm() {
  const { showLoading, closeLoading } = useGlobal();
  const { getZillowInfo, createGroup } = useAPI();
  const {
    user: { uid },
  } = useUser();
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [dataState, setDataState] = useState({ dataLoaded: false, data: null });
  const navigate = useNavigate();
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

  const [springs, api] = useSprings(
    2,
    (index) => {
      if (index === 1) {
        return {
          from: { transform: "translate(0, 0)", opacity: 1 },
          to: { transform: "translate(-10vw, 10vh)", opacity: 0 },
          delay: 1000,
        };
      }

      if (index === 2) {
        return {
          from: { transform: "translate(0, 0)" },
          to: { transform: "translate(-10vw, 10vh)" },
          delay: 500,
        };
      }
    },
    []
  );

  return (
    <div className="create-post-container main-container center">
      <MapBackground
        dataLoaded={dataState.dataLoaded}
        coordinates={coordinates}
        springAPI={api}
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
        <>
          {springs.map((props, index) => (
            <animated.div key={index} style={props} className="item">
              <div className="shadow house-shadow">
                <div className="house-info">
                  <img
                    src={dataState.data.imagesUrls}
                    alt={dataState.data.address}
                  />
                  <div className="house-info__box">
                    <p className="house-info__rent">
                      ${dataState.data.rent}/mo <span>(Estimate)</span>
                    </p>
                    <p className="house-info__address">
                      {dataState.data.address}
                    </p>
                    <div className="row">
                      <p className="house-info__beds">
                        {dataState.data.bedCount} Beds
                      </p>
                      <p className="house-info__baths">
                        {dataState.data.bathCount} Baths
                      </p>
                    </div>

                    <button
                      className="house-info__add center"
                      onClick={() => {
                        showLoading("Creating your new Roomy Group...");
                        createGroup(uid, (data, err) => {
                          if (err) return console.log(err);

                          closeLoading();
                          navigate("/groups");
                        });
                      }}
                    >
                      <Add />
                      Create Group
                    </button>
                  </div>
                </div>
              </div>
            </animated.div>
          ))}
        </>
      )}
    </div>
  );
}

export default CreatePostForm;
