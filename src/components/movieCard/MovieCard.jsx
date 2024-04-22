import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import PosterFallback from "../../assets/no-poster.png";

import { useNavigate } from "react-router-dom";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import dayjs from "dayjs";
const MovieCard = ({ data, mediaType, fromSearch }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;
  console.log(posterUrl);
  return (
    <div
      className="movieCard"
      onClick={() => navigate(`/${mediaType || data.media_type}/${data.id}`)}
    >
      <div className="posterBlock">
        <Img className="posterImg" src={posterUrl} />
        {!fromSearch && (
          <React.Fragment>
            <CircleRating rating={data.vote_average.toFixed(1)} />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </React.Fragment>
        )}
      </div>
      <div className="textBock">
        <span className="title">{data.title || data.name}</span>
        <span>{dayjs(data.release_date).format("MMM D,YYYY")}</span>
      </div>
    </div>
  );
};

export default MovieCard;
