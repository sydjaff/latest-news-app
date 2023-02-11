import React from "react";

export default function NewsItem(props) {
  return (
    <div>
      <div className="card">
        <img
          src={
            !props.urlToImage
              ? "https://english.olympiadsuccess.com/assets/images/english_square/articles-4.jpg"
              : props.urlToImage
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">
            {props.title ? props.title.slice(0, 45) : ""}...
          </h5>
          <p className="card-text">
            {props.description ? props.description.slice(0, 70) : ""}...
          </p>
          <a
            rel="noreferrer"
            href={props.newsUrl}
            target="_blank"
            className="btn btn-dark btn-sm"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
