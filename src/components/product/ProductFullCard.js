import {Box, Chip, Divider, ImageList, ImageListItem, Paper, Typography,} from "@mui/material";
import React, {useCallback, useState} from "react";
import {AddToCartButton} from "./AddToCartButton";
import {AddToFavoritesButton} from "./AddToFavoritesButton";
import {Review} from "./Review";
import {AddReview} from "./AddReview";

export default function ProductFullCard({product}) {
  const [selectedImageUrl, setSelectedImageUrl] = useState(
    product.images && product.images.length > 0 ? product.images[0].url : ""
  );

  const onImageListItemClick = useCallback((imageUrl) => {
    setSelectedImageUrl(imageUrl);
  }, []);

  return (
    <div>
      <Paper
        sx={{
          padding: "15px",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            flex: "0",
            width: "25%",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <ImageList cols={1} gap={2} sx={{width: "25%", marginTop: "0px"}}>
            {product.images.map((image) => (
              <ImageListItem
                onClick={() => onImageListItemClick(image.url)}
                sx={{aspectRatio: "1 / 1", width: "100%"}}
              >
                <img
                  src={image.url}
                  alt={image.filename}
                  style={{
                    width: "100%",
                    objectFit: "fill",
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
          <Box sx={{marginLeft: "1px", aspectRatio: "1 / 1", width: "75%"}}>
            <img
              src={selectedImageUrl}
              alt="Превью товара"
              style={{width: "-webkit-fill-available", objectFit: "contain"}}
            />
          </Box>
        </Box>
        <Box
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Divider/>
          <Typography variant="body1" gutterBottom>
            {product.description}
          </Typography>
          {product.categories.map((category) => (
            <Chip label={category.name}/>
          ))}
          <Typography variant="h6" color="primary">
            {product.price} руб.
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Осталось: {product.amount} ед.
          </Typography>
          {/* Характеристики */}
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Характеристики:
          </Typography>
          {product.characteristics.map((item) => (
            <Typography variant="caption" color="textSecondary">
              {item.characteristicName}:{item.value}
              <br/>
            </Typography>
          ))}
        </Box>
        {/* Добавить в корзину или избранное */}
        <Box sx={{display: "flex", flexDirection: "row", alignContent: "flex-start", flex: "0"}}>
          <AddToFavoritesButton productId={product.id}/>
          <AddToCartButton product={product}/>
        </Box>
      </Paper>
      {/* Отзывы */}
      <Box sx={{flex: "1", marginTop: "20px"}}>
        <Typography variant="h5" gutterBottom>
          Отзывы:
        </Typography>
        {product.reviews.map((review) => (
          <Review review={review} />
        ))}
        <AddReview productId={product.id} />
      </Box>
    </div>
  );
}
