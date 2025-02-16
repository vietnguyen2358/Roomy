import React from "react";
import { useQuery } from "@tanstack/react-query";

// Contexts
import { useAPI } from "../../../context/API/API.context";
import { useGlobal } from "../../../context/Global/Global.context";

const convertToObj = (dataMainArr) => {
  const cards = [];

  dataMainArr.map((dataArr) => {
    const cardData = {};
    cardData.groupID = dataArr[0];
    cardData.zillowLink = dataArr[1];
    cardData.imagesUrls = dataArr[2];
    cardData.bedCount = dataArr[3];
    cardData.bathCount = dataArr[4];
    cardData.rent = dataArr[5];
    cardData.address = dataArr[6];
    cardData.longitude = dataArr[7];
    cardData.latitude = dataArr[8];
    cardData.userLists = dataArr[9];

    cards.push(cardData);
  });

  return cards;
};

function BrowseGroups(props) {
  const {
    filter: { minPrice, maxPrice, bedrooms, bathrooms },
    addressQuery,
  } = props;
  const { showHouseCard } = useGlobal();
  const { fetchAllGroups } = useAPI();
  const { isPending, isError, error, data, refetch } = useQuery({
    queryKey: ["ALL_GROUPS"],
    queryFn: () => fetchAllGroups(),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  const cards = convertToObj(data.data);
  const minPriceFilteredCards =
    minPrice === ""
      ? cards
      : cards.filter((card) => {
          return card.rent >= minPrice;
        });
  const maxPriceFilteredCards =
    maxPrice === ""
      ? minPriceFilteredCards
      : minPriceFilteredCards.filter((card) => {
          return card.rent <= maxPrice;
        });
  const bedroomsFilteredCards = maxPriceFilteredCards.filter((card) => {
    return card.bedCount >= bedrooms;
  });
  const bathroomsFilteredCards = bedroomsFilteredCards.filter((card) => {
    return card.bathCount >= bathrooms;
  });
  const searchedCards = !addressQuery
    ? bathroomsFilteredCards
    : bathroomsFilteredCards.filter((card) => {
        const regex = new RegExp(addressQuery, "ig");
        return regex.test(card.address);
      });
  return (
    <div className="browse-groups">
      {searchedCards.length > 0 ? (
        <>
          {searchedCards.map((card) => {
            const { address, rent, bedCount, bathCount, imagesUrls } = card;

            return (
              <div className="browse-info">
                <img src={imagesUrls} alt={address} />
                <div className="house-info__box">
                  <p className="house-info__rent">
                    ${rent}/mo <span>(Estimate)</span>
                  </p>
                  <p className="house-info__address">{address}</p>
                  <div className="row">
                    <p className="house-info__beds">{bedCount} Beds</p>
                    <p className="house-info__baths">{bathCount} Baths</p>
                  </div>

                  <button
                    className="browse-info__more center"
                    onClick={() => showHouseCard(card, refetch)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <p className="browse__none">
          There are no <span>Roomy</span> groups for these filters.
        </p>
      )}
    </div>
  );
}

export default BrowseGroups;
