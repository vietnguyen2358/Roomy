import React, { useState, useEffect } from "react";
import { useUser } from "../../../context/User/User.context";
import { useGlobal } from "../../../context/Global/Global.context";
import { useAPI } from "../../../context/API/API.context";

function Groups() {
  const {
    user: { uid },
  } = useUser(); // Get the current user UID
  const { showLoading, closeLoading, closeHouseCard } = useGlobal();
  const { deleteGroup } = useAPI();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const existingGroups = JSON.parse(localStorage.getItem("groups")) || [];
    const userGroups = existingGroups.filter((group) => group.userId === uid);
    setGroups(userGroups);
  }, [uid]);

  return (
    <div className="main-container">
      <h1 className="main-container__title">
        My <span>Roomy</span> Groups
      </h1>
      <div className="My-groups-list">
        {groups.length === 0 ? (
          <p>No groups created yet.</p>
        ) : (
          groups.map((group, index) => (
            <div key={index} className="my-group-info center-vertical">
              <img src={group.imagesUrls} alt={group.address} />
              <div className="house-info__box">
                <p className="house-info__rent">
                  <strong>${group.rent}/mo</strong>
                </p>
                <p className="house-info__address">{group.address}</p>
                <p>
                  <span className="house-info__beds">
                    {group.bedCount} Beds
                  </span>
                  <span className="house-info__baths">
                    {group.bathCount} Baths
                  </span>
                </p>
              </div>
              <button
                type="button"
                className="groups__delete"
                onClick={() => {
                  showLoading("Deleting Roomy Group...");
                  deleteGroup("groupID", (data, err) => {
                    if (err) return console.log(err);

                    closeLoading();
                    closeHouseCard();
                    localStorage.clear();
                    setGroups([]);
                  });
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Groups;
