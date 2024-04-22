import React from "react";
import useFetch from "../../../hook/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Recomended = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );
  return (
    <Carousel
      title={"Tavsiyalar"}
      data={data?.results}
      endpoint={mediaType}
      loading={loading}
    />
  );
};

export default Recomended;
