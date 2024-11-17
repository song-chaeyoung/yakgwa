import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q");
  console.log(keyword);

  return <div>SearchResult</div>;
};

export default SearchResult;
