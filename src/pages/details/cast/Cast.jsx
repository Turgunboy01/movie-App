import React from "react";
import "./style.scss";
import avatar from "../../../assets/avatar.png";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";

const Cast = ({ data, loading }) => {
  const skeletion = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  const { url } = useSelector((state) => state.home);
  return (
    <div className="castSection">
      <div className="container">
        <div className="sectionHeading">
          {!loading ? (
            <div className="listItems">
              {data?.map((item) => {
                let imgUrl = item.profile_path
                  ? url.profile + item.profile_path
                  : avatar;
                return (
                  <div className="listItem" key={item.id}>
                    <div className="profileImg">
                      <Img src={imgUrl} />
                    </div>
                    <div className="name">{item.name}</div>
                    <div className="character">{item.character}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="castSelection">
              {skeletion()}
              {skeletion()}
              {skeletion()}
              {skeletion()}
              {skeletion()}
              {skeletion()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cast;
