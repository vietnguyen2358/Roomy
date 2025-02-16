import React from "react";

// Contexts
import { useUser } from "../../../context/User/User.context";
import { useGlobal } from "../../../context/Global/Global.context";
import { useAPI } from "../../../context/API/API.context";

// SVGs
import Close from "../../svg/Close";

function ActiveCard(props) {
  const {
    houseCardState: {
      data: {
        groupID,
        imagesUrls,
        address,
        rent,
        userLists,
        bedCount,
        bathCount,
      },
      refetch,
    },
  } = props;
  const {
    user: { uid },
  } = useUser();
  const { closeHouseCard, showLoading, closeLoading } = useGlobal();
  const { joinGroup, deleteGroup, deleteUserFromGroup } = useAPI();
  const isOwner = userLists[0] === uid;
  const inTheGroup = userLists.includes(uid);

  return (
    <div className="card-shadow center">
      <div className="active-card row">
        <img src={imagesUrls} alt={address} />
        <div className="between-row">
          <div className="house-info__box">
            <p className="house-info__rent">
              ${rent}/mo <span>(Estimate)</span>
            </p>
            <p className="house-info__sub-rent">
              ${+(Math.round(rent / (userLists.length + 1) + "e+2") + "e-2")}/mo
              per person ({userLists.length + 1})
            </p>
            <p className="house-info__address">{address}</p>
            <div className="row">
              <p className="house-info__beds">{bedCount} Beds</p>
              <p className="house-info__baths">{bathCount} Baths</p>
            </div>
            <p className="house-info__members">
              Current Residents: {userLists.length}
            </p>
          </div>
          {isOwner ? (
            <button
              type="button"
              className="active-card__btn"
              onClick={() => {
                showLoading("Deleting Roomy Group...");
                deleteGroup(groupID, (data, err) => {
                  if (err) return console.log(err);

                  closeLoading();
                  closeHouseCard();
                  refetch();
                });
              }}
            >
              Delete Group
            </button>
          ) : inTheGroup ? (
            <button
              type="button"
              className="active-card__btn"
              onClick={() => {
                showLoading("Deleting Roomy Group...");
                deleteUserFromGroup(uid, groupID, (data, err) => {
                  if (err) return console.log(err);

                  closeLoading();
                  closeHouseCard();
                  refetch();
                });
              }}
            >
              Leave Group
            </button>
          ) : (
            <button
              type="button"
              className="active-card__btn active-card__join"
              onClick={() => {
                showLoading("Joining Roomy Group...");
                joinGroup(uid, groupID, (data, err) => {
                  if (err) return console.log(err);

                  closeLoading();
                  closeHouseCard();
                  refetch();
                });
              }}
            >
              Join Group
            </button>
          )}

          {/* Close */}
          <button
            type="button"
            className="active-card__close"
            onClick={closeHouseCard}
          >
            <Close />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActiveCard;
