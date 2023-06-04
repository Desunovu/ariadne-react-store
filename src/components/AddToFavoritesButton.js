import React, {useState} from "react";
import {Box, Button} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {useMutation} from "@apollo/react-hooks";
import {ADD_TO_FAVORITES} from "../operations/mutations/addProductToFavorites";
import {REMOVE_FROM_FAVORITES} from "../operations/mutations/removeProductFromFavorites";

export function AddToFavoritesButton({productId}) {
  const [errors, setErrors] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const [addProductToFavorites, {loading: addMutationLoading, error: addMutationError}] = useMutation(ADD_TO_FAVORITES, {
    variables: {
      productId: productId,
    },
    onCompleted: (data) => {
      if (data.addProductToFavorites.status) setIsActive(true)
      setErrors(data.addProductToFavorites.errors)
    }
  })

  const [removeProductFromFavorites, {loading: removeMutationLoading, error: removeMutationError}] = useMutation(REMOVE_FROM_FAVORITES, {
    variables: {
      productId: productId,
    },
    onCompleted: (data) => {
      if (data.removeProductFromFavorites.status) setIsActive(false)
      setErrors(data.removeProductFromFavorites.errors)
    }
  })

  async function onButtonClick() {
    if (!isActive) {
      await addProductToFavorites()
    }
    else {
      await removeProductFromFavorites()
    }

    if (!!errors) {setIsActive(!isActive)}
  }

  return (
    <Box>
      <Button
        disabled={((addMutationLoading || addMutationError) || (removeMutationLoading || removeMutationError))}
        onClick={onButtonClick}>
        {isActive && <Favorite/>}
        {!isActive && <FavoriteBorder/>}
      </Button>
    </Box>
  )
}