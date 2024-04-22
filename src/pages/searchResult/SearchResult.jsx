import React, { useEffect, useState } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import Spinner from "../../components/spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/movieCard/MovieCard";
const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setpageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitalData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setLoading(false);
        setpageNum((prev) => prev + 1);
      }
    );
  };
  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res?.results],
          });
        } else {
          setData(res);
        }
        setpageNum((prev) => prev + 1);
      }
    );
  };
  useEffect(() => {
    fetchInitalData();
    setpageNum(1);
  }, [query]);
  return (
    <div className="searchResults">
      {loading && <Spinner initial={true} />}

      {!loading && (
        <div className="container">
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">{`Search ${
                data?.total_results > 1 ? "results" : "result"
              } of ${query}`}</div>

              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                loader={<Spinner />}
                hasMore={pageNum <= data?.total_pages}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="notFound">Sorry,Page not found</span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
