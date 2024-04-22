import React, { useState } from "react";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hook/useFetch";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/popular`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Kinolar" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <div className="container">
        <span className="carouselTitle">
          Ko'p ko'rilgan <span className="kino_title">kino va seriallar</span>
        </span>
        <SwitchTabs data={["Kinolar", "Seriallar"]} onTabChange={onTabChange} />
      </div>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Popular;
