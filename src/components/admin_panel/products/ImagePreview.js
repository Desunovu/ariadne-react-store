import React, {useState} from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Box, CardActions,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const cardMediaStyle = {
  height: 100,
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
};
const cardContentStyle = { display: "flex", flexDirection: "row" };
const removeButtonStyle = { height: "25%", width: "15%", margin: "2%" };
const filenameTypographyStyle = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

export default function ImagePreview({
  productImages,
  newImages,
  imagePreviewUrls,
  setNewImages,
  setImagePreviewUrls,
  setImagesToRemoveIds,
  setNewProductPreviewId,
}) {

  const [previewId, setPreviewId] = useState(undefined);

  const handleClearProductImageButtonClick = (imageId) => {
    setImagesToRemoveIds((prevIds) => [...prevIds, imageId]);
  };

  const handleClearNewImageButtonClick = (indexToRemove) => {
    setNewImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(indexToRemove, 1);
      return newImages;
    });
    setImagePreviewUrls((prevUrls) => {
      const newUrls = [...prevUrls];
      newUrls.splice(indexToRemove, 1);
      return newUrls;
    });
  };

  const onSetPreviewButtonClick = (imageId) => {
    setPreviewId(imageId);
    setNewProductPreviewId(imageId);
  };

  return (
    <Box>
      {productImages && productImages.length > 0 && (
        <Box>
          <Typography>Уже загруженные изображения товара: </Typography>
          <Grid container spacing={2}>
            {productImages.map((image) => (
              <Grid item xs={2}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={cardMediaStyle}
                    image={image.url}
                    title={image.filename}
                  >
                    <Button
                      variant="contained"
                      sx={removeButtonStyle}
                      onClick={() =>
                        handleClearProductImageButtonClick(image.id)
                      }
                    >
                      <ClearIcon />
                    </Button>
                  </CardMedia>
                  <CardActions>
                    <Button disabled={previewId===image.id} onClick={() => onSetPreviewButtonClick(image.id)}>
                      Назначить превью
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {newImages && newImages.length > 0 && (
        <Box>
          <Typography variant="body1">
            Изображения, которые будут загружены:
          </Typography>
          <Grid container spacing={2}>
            {imagePreviewUrls.map((url, index) => (
              <Grid item xs={2}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={cardMediaStyle}
                    image={url}
                    title={newImages[index].name}
                  >
                    <Button
                      variant="contained"
                      sx={removeButtonStyle}
                      onClick={() => handleClearNewImageButtonClick(index)}
                    >
                      <ClearIcon />
                    </Button>
                  </CardMedia>
                  <CardContent sx={cardContentStyle}>
                    <Typography varint="body1" sx={filenameTypographyStyle}>
                      {newImages[index].name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
