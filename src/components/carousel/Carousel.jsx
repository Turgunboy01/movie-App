import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PosterFallback from "../../assets/no-poster.png";
import Img from "../lazyLoadImage/Img";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import "./style.scss";
import dayjs from "dayjs";
import CircleRating from "../circleRating/CircleRating";
const Carousel = ({ data, loading, title, endpoint }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const carouselContainer = useRef();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <div className="container">
        {title && <div className="carousel__title">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carousel__left arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carousel__right arrow "
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  key={item.id}
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                  className="carousel__item"
                >
                  <div className="poster__block">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                  </div>
                  <div className="text__block">
                    <span className="title">{item.name || item.title}</span>
                    <span className="date">
                      {dayjs(item.release_date || item.first_air_date).format(
                        "MMM D,YYYY"
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
