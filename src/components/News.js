import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";


export default function News(props) {

  const [newsArticles, setNewsArticels] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalResults, setTotalResults] = useState();
  const [loading, setLoading] = useState(false);
  // api call
  const fetchNews = async (pageNo) => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7db84bc3b09c46948a34dc761c4de818&page=${pageNo}&pageSize=${props.pageSize}`;
    let response = await fetch(url);
    setLoading(true);
    let news = await response.json();
    if (news) { setLoading(false) }
    setNewsArticels(news.articles);
    setTotalResults(news.totalResults);
  };

  // prev page func
  const handlePrevClick = () => {
    console.log("prev");
    setPageNo(pageNo - 1);
  };
  // next page fun
  const handleNextClick = () => {
    console.log("next");
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    fetchNews(pageNo);
    setLoading(true)
  }, [pageNo]);

  useEffect(() => {
    fetchNews(pageNo);
    setLoading(true)
  }, []);
  return (

    <div>
      <div className="container my-3">
        <h1 className="text-center">GetNews - Top headline</h1>
        {
          loading ? (
            <Spinner />
          ) : (
            <div className="row">
              {newsArticles?.map((ar) => {
                return (
                  <div className="col-md-3 my-2" key={ar.url}>
                    <NewsItem
                      title={ar.title}
                      description={ar.description}
                      urlToImage={ar.urlToImage}
                      newsUrl={ar.url}
                    />
                  </div>
                );
              })}
            </div>
          )
        }


        <div className="container d-flex justify-content-end gap-2">
          <button
            onClick={handlePrevClick}
            type="button"
            className="btn btn-dark"
            disabled={pageNo === 1}
          >
            &larr; Previous
          </button>
          <button
            onClick={handleNextClick}
            type="button"
            className="btn btn-dark"
            disabled={pageNo + 1 > Math.ceil(totalResults / props.pageSize)}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
