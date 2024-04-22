import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "../../hook/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import Select from "react-select";
import Spinner from "../../components/spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/movieCard/MovieCard";
import "./style.scss";
let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageName, setPageName] = useState(0);
  const [sortby, setSortby] = useState(null);
  const [genre, setgenre] = useState(null);
  const [loading, setLoading] = useState(false);
  const { mediaType } = useParams();

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);
  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setLoading(false);
      setPageName((prev) => prev + 1);
    });
  };
  const fetchNextDageData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageName}`, filters).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageName((prev) => prev + 1);
      }
    );
  };
  useEffect(() => {
    filters = {};
    setData(null);
    setPageName(1);
    setSortby(null);
    setgenre(null);
    fetchInitialData();
  }, [mediaType]);

  const onChange = (seletedIems, action) => {
    if (action.name === "sortby") {
      setSortby(seletedIems);
      if (action.action !== "clear") {
        filters.sort_by = seletedIems.value;
      } else {
        delete filters.sort_by;
      }
    }
    if (action.name === "genres") {
      setgenre(seletedIems);
      if (action.action !== "clear") {
        let genreId = seletedIems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }
    setPageName(1);
    fetchInitialData();
  };
  return (
    <div className="explorePage">
      <div className="container">
        <div className="pageHeader">
          <div className="title">
            {mediaType === "tv" ? "Explore Tv Show" : "Explore Movies"}
          </div>
          <div className="filters">
            <Select
              isMulti
              name="genres"
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
              value={genre}
            />
            <Select
              name="sortby"
              options={sortbyData}
              onChange={onChange}
              value={sortby}
              isClearable={true}
              placeholder="Sort By"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
          </div>
        </div>
        {loading && <Spinner inital={true} />}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextDageData}
                loader={<Spinner />}
                hasMore={pageName <= data?.total_pages}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} mediaType={mediaType} />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <span className="notFound">Sorry,Page not found</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
