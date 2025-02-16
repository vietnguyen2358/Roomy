import React from "react";

function ActiveCard(props) {
  const {
    houseCardState: {
      data: { imagesUrls, address, rent, userLists, bedCount, bathCount },
    },
  } = props;

  return (
    <div className="card-shadow center">
      <div className="active-card row">
        <img src={imagesUrls} alt={address} />
        <div className="house-info__box">
          <p className="house-info__rent">
            ${rent}/mo <span>(Estimate)</span>
          </p>
          <p className="house-info__rent">
            ${rent / userLists.length + 1}/mo per person
          </p>
          <p className="house-info__address">{address}</p>
          <div className="row">
            <p className="house-info__beds">{bedCount} Beds</p>
            <p className="house-info__baths">{bathCount} Baths</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveCard;
