import React, { useState } from "react";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hook/useFetch";
const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");

  const { data, loading } = useFetch(`/trending/movie/${endpoint}`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Kunlik" ? "day" : "week");
  };

  // console.log(data);
  return (
    <div className="carouselSection">
      <div className="container">
        <span className="carouselTitle">
          Yangi <span className="kino_title">kino va seriallar</span>
        </span>
        <SwitchTabs data={["Kunlik", "Haftalik"]} onTabChange={onTabChange} />
      </div>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
