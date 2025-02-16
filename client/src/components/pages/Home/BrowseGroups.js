import React from "react";
import { useQuery } from "@tanstack/react-query";

// Contexts
import { useAPI } from "../../../context/API/API.context";
import Spinner from "../../standalone/Spinner/Spinner";

function BrowseGroups(props) {
  const { addressQuery } = props;
  const { fetchAllGroups } = useAPI();
  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["ALL_GROUPS"],
    queryFn: () => fetchAllGroups(),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  console.log(data);
  return <div className="browse-groups">BrowseGroups</div>;
}

export default BrowseGroups;
