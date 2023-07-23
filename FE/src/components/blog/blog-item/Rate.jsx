import React from 'react';

import { RatingComponent } from 'react-rating-emoji';
import 'react-rating-emoji/dist/index.css';

const Rate = ({rate, rating, setRating}) => {
  const handleRating = (newRating) => {
    setRating(newRating);
  }

  return <RatingComponent className={rate? "myclass": ""} rating={rate || rating} onClick={handleRating} />
}

export default Rate