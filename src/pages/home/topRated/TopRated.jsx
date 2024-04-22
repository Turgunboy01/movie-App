import React, { useState } from "react";
import useFetch from "../../../hook/useFetch";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";

const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/top_rated`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Kinolar" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <div className="container">
        <span className="carouselTitle">
          Reytingi baland <span className="kino_title">kino va seriallar</span>
        </span>
        <SwitchTabs data={["Kinolar", "Seriallar"]} onTabChange={onTabChange} />
      </div>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default TopRated;
