import React, {useState} from "react";
import {Box, Button} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {useMutation} from "@apollo/react-hooks";
import {ADD_TO_FAVORITES} from "../operations/mutations/addProductToFavorites";

export function AddToFavoritesButton({productId}) {
  const [errors, setErrors] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const [addProductToFavorites, {loading, error}] = useMutation(ADD_TO_FAVORITES, {
    variables: {
      productId: productId,
    },
    onCompleted: (data) => {
      setErrors(data.addProductToFavorites.errors)
      if (data.addProductToFavorites.status) setIsActive(true)
    }
  })

  function onButtonClick() {
    if (!isActive) {
      addProductToFavorites()
    }
  //   TODO removeProductFromFavorites
  }

  return (
    <Box>
      <Button disabled={(loading || error || errors.length > 0)} onClick={onButtonClick}>
        {isActive && <Favorite/>}
        {!isActive && <FavoriteBorder/>}
      </Button>
    </Box>
  )
}