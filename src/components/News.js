import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

export default function News() {
  const [newsArticles, setNewsArticels] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalResults, setTotalResults] = useState();

  // api call
  const fetchNews = async (pageNo) => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7db84bc3b09c46948a34dc761c4de818&page=${pageNo}&pageSize=10`;
    let response = await fetch(url);
    let news = await response.json();
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
  }, [pageNo]);

  return (
    <div>
      <div className="container my-3">
        <h1>GetNews - Top headline</h1>
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
            disabled={pageNo + 1 > Math.ceil(totalResults / 10)}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
