import React, { useState } from "react";
import "./style.scss";
import Img from "../../../components/lazyLoadImage/Img";
import { PlayIcon } from "../PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
const VideoSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  return (
    <div className="videoSection">
      <div className="container">
        <div className="sectionHeading">
          {!loading ? (
            <div className="videos">
              {data?.results?.map((video) => (
                <div
                  className="videoItem"
                  key={video.id}
                  onClick={() => {
                    setVideoId(video.key);
                    setShow(true);
                  }}
                >
                  <div className="videoThumbnail">
                    <Img
                      src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    />
                    <PlayIcon />
                  </div>
                  <div className="videoTitle">{video.name}</div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideoSection;
