import React from "react";
import useFetch from "../../../hook/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Simular = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);
  const title = mediaType === "tv" ? "Shu kabi Seriallar" : "Shu kabi Filmlar";
  console.log(data, "simular");
  return (
    <Carousel
      title={title}
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Simular;
