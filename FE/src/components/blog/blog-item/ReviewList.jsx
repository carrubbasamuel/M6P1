import React from "react";
import { useSelector } from "react-redux";

export default function ReviewList() {
  const {reviews, loading} = useSelector((state) => state.review);


  return (
    <div>
      {loading && reviews.length === 0 &&  <div>Loading...</div>}
      <ul>
        {reviews.map((review, i) => (
          <div key={i}>
            <li>{review.comment}</li>
            <li>{review.rate}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}
