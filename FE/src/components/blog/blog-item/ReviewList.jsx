import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostId, setShowReviews } from "../../../redux/reducers/PostSlice";
import { fetchGetReviews } from "../../../redux/reducers/ReviewSlice";

export default function ReviewList(props) {
  const { _id, showReviews } = props.posts;
  const dispatch = useDispatch();
  const {reviews, loading} = useSelector((state) => state.review);
  const postId = useSelector((state) => state.author.postId);

  const handleClose = () => {
    dispatch(setShowReviews(_id)); // Chiude la visualizzazione delle recensioni per tutti i post
  };

  const handleShow = () => {
    dispatch(setPostId(_id));
    if (postId !== _id){
      dispatch(setShowReviews(postId)); // Chiude la visualizzazione delle recensioni per tutti i post
    }
    dispatch(setShowReviews(_id));
    dispatch(fetchGetReviews(_id));
  };


  
  return showReviews ? (
    <div>
      <button onClick={handleClose}>Close</button>
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
  ) : (
    <button onClick={handleShow}>Show Reviews</button>
  );
}
