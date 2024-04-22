import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import Img from "../../../components/lazyLoadImage/Img";
import useFetch from "../../../hook/useFetch";
const HomeBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="home__banner">
      <div className="backdrop__img">
        <Img src={background} />
      </div>
      <div className="opacity__layer"></div>
      <div className="heroBanner__content">
        <span className="title">Xush kelibsiz .</span>
        <span className="subTitle">
          Millionlab kinolar va seriallar sizlar uchun. <br />
          Hoziroq tomosha qiling!!!
        </span>
        <div className="search__input">
          <input
            type="text"
            placeholder="Kinolarni qidirish uchun ..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={searchHandler}
          />
          <button>Search</button>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
