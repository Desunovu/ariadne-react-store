import React, {useState} from "react";
import {useMutation} from "@apollo/react-hooks";
import {ADD_REVIEW} from "../../operations/mutations/addReview";
import {Button, Rating, Stack, TextField, Typography} from "@mui/material";

const addReviewBoxStyle = {
  display: "flex",
  flexDirection: "column"
}

const ReviewTextFieldStyle = {
  padding: "5px"
}

export function AddReview({productId}) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [addReview, {loading, called, error}] = useMutation(ADD_REVIEW, {
    variables: {
      productId: productId,
      rating: rating,
      text: text,
    }
  });

  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    addReview();
    setRating(5);
    setText("");
  };

  return (
    <Stack sx={addReviewBoxStyle}>
      <Typography variant="h5">Оставить отзыв:</Typography>
      <Rating name="rating" value={rating} onChange={handleRatingChange}/>
      <TextField
        label="Текст отзыва"
        multiline
        rows={4}
        value={text}
        onChange={handleTextChange}
        sx={ReviewTextFieldStyle}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={(loading || called || error)}
      >
        Добавить отзыв
      </Button>
    </Stack>
  );
}