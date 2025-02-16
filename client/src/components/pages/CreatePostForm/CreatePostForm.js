import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { animated, useSpring } from "@react-spring/web";

// Schemas
import { ZillowLinkSchema } from "../../../schemas/ZillowSchemas";

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
        setDataState({
          dataLoaded: true,
          data: { ...data, zillowLink: values.zillowLink },
        });
        closeLoading();
      });
    },
  });

  const [springProps, api] = useSpring(
    () => ({
      from: { transform: "translate(0, 0)", opacity: 0 },
      to: { transform: "translate(-10vw, 10vh)", opacity: 1 },
      delay: 1000,
    }),
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
        <div className="shadow house-shadow">
          <animated.div style={springProps}>
            <div className="house-info">
              <img
                src={dataState.data.imagesUrls}
                alt={dataState.data.address}
              />
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

                <button
                  className="house-info__add center"
                  onClick={() => {
                    showLoading("Creating your new Roomy Group...");
                    const {
                      address,
                      rent,
                      bedCount,
                      bathCount,
                      imagesUrls,
                      latitude,
                      longitude,
                      zillowLink,
                    } = dataState.data;
                    createGroup(
                      {
                        id: uid,
                        zillowLink,
                        imagesUrls,
                        bedCount,
                        bathCount,
                        rent,
                        address,
                        longitude,
                        latitude,
                      },
                      (data, err) => {
                        if (err) return console.log(err);

                        const { Success } = data;

                        closeLoading();
                        // Save the created group locally in localStorage
                        const existingGroups =
                          JSON.parse(localStorage.getItem("groups")) || [];
                        existingGroups.push({
                          userId: uid,
                          groupID: Success,
                          ...dataState.data,
                        });
                        localStorage.setItem(
                          "groups",
                          JSON.stringify(existingGroups)
                        );
                        navigate("/groups");
                      }
                    );
                  }}
                >
                  <Add />
                  Create Group
                </button>
              </div>
            </div>
          </animated.div>
        </div>
      )}
    </div>
  );
}

export default CreatePostForm;
