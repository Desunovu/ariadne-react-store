import {Paper, Rating, Typography} from "@mui/material";
import React from "react";

const ReviewPaperStyle = {
  padding: "10px",
  marginBottom: "20px"
}

export function Review({review}) {

  return (
    <Paper key={review.id} elevation={1} sx={ReviewPaperStyle}>
      {/*<Typography variant="subtitle1" gutterBottom>*/}
      {/*  Пользователь: {review.userId}*/}
      {/*</Typography>*/}
      <Typography variant="body1">{review.text}</Typography>
      <Rating name="rating" value={review.rating} precision={0.5} readOnly/>
    </Paper>
  )
}