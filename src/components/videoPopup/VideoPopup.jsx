import React from "react";
import ReactPlayer from "react-player/youtube";
import "./style.scss";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={hidePopup}></div>
      <div className="videoPlayer">
        <span onClick={hidePopup} className="closeBtn">
          Close
        </span>
        <ReactPlayer
          controls
          url={`https://www.youtube.com/watch?v=${videoId}`}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default VideoPopup;
