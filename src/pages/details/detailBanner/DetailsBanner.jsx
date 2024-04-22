import React, { useState } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import dayjs from "dayjs";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import { PlayIcon } from "../PlayBtn";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const _genre = data?.genres?.map((g) => g.id);
  const { url } = useSelector((state) => state.home);

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Writer"
  );

  const toHoursAndMinuts = (totalMinus) => {
    const hour = Math.floor(totalMinus / 60);
    const minus = totalMinus % 60;
    return `${hour}h ${minus > 0 ? `${minus}m` : ""}`;
  };
  
  console.log(video);
  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <>
              <div className="wrapper">
                <div className="container">
                  <div className="backdrop_img">
                    <Img src={url.backdrop + data.backdrop_path} />
                  </div>
                  <div className="opacity__layer"></div>
                  <div className="content">
                    <div className="left">
                      {data.poster_path ? (
                        <Img
                          src={url.backdrop + data.poster_path}
                          className="posterImg"
                        />
                      ) : (
                        <Img src={PosterFallback} />
                      )}
                    </div>
                    <div className="right">
                      <div className="title">
                        {`${data.name || data.title} (${dayjs(
                          data?.release_date
                        ).format("YYYY")})`}
                      </div>
                      <div className="subtitle">{data.tagline}</div>
                      <Genres data={_genre} />
                      <div className="row">
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <div
                          className="playbtn"
                          onClick={() => {
                            setShow(true);
                            setVideoId(video.key);
                          }}
                        >
                          <PlayIcon />
                          <span className="text">Watch Trailer</span>
                        </div>
                      </div>
                      <div className="overview">
                        <div className="heading">Overview</div>
                        <div className="desc">{data.overview}</div>
                      </div>
                      <div className="info">
                        {data.status && (
                          <div className="infoItem">
                            <div className="text bold">Status: </div>
                            <div className="text">{data.status}</div>
                          </div>
                        )}
                        {data.release_date && (
                          <div className="infoItem">
                            <div className="text bold">Release Date: </div>
                            <div className="text">
                              {dayjs(data.release_date).format("MMM D,YYYY")}
                            </div>
                          </div>
                        )}
                        {data.runtime && (
                          <div className="infoItem">
                            <div className="text bold">Run time: </div>
                            <div className="text">
                              {toHoursAndMinuts(data.runtime)}
                            </div>
                          </div>
                        )}
                      </div>
                      {director?.length > 0 && (
                        <div className="info">
                          <div className="text bold"> Director: </div>
                          <div className="text">
                            {director?.map((d, i) => (
                              <span key={i}>
                                {d.name}
                                {director.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {writer?.length > 0 && (
                        <div className="info">
                          <div className="text bold"> Writer: </div>
                          <div className="text">
                            {writer?.map((d, i) => (
                              <span key={i}>
                                {d.name}
                                {writer.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {data?.created_by?.length > 0 && (
                        <div className="info">
                          <span className="text bold">Creator: </span>
                          <span className="text">
                            {data?.created_by?.map((d, i) => (
                              <span key={i}>
                                {d.name}
                                {data?.created_by.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                    </div>
                    <VideoPopup
                      show={show}
                      setShow={setShow}
                      videoId={videoId}
                      setVideoId={setVideoId}
                    />{" "}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};
export default DetailsBanner;
