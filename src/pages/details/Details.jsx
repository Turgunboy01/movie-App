import React from "react";
import "./style.scss";
import DetailsBanner from "./detailBanner/DetailsBanner";
import { useParams } from "react-router-dom";
import useFetch from "../../hook/useFetch";
import Cast from "./cast/Cast";
import VideoSection from "./videoSection/VideoSection";
import Simular from "./carousels/Simular";
import Recomended from "./carousels/Recomended";
const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);

  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  console.log(data);
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideoSection data={data} loading={loading} />
      <Simular mediaType={mediaType} id={id} />
      <Recomended mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
