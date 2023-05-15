import React, { Fragment } from "react"
import { Card, CardContent, CardMedia, Typography, Grid, Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

export default function ImagePreview({ images, previewUrls, setImages, setPreviewUrls }) {

  const handleClearButtonClick = (indexToRemove) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(indexToRemove, 1);
      return newImages;
    })
    setPreviewUrls((prevUrls) => {
      const newUrls = [...prevUrls];
      newUrls.splice(indexToRemove, 1);
      return newUrls;
    })
  }

  return (
    <Fragment>
      {images && images.length > 0 &&
        <Typography variant="body1">Изображения, которые будут загружены:</Typography>
      }
      <Grid container spacing={2}>
        {previewUrls.map((url, index) => (
          <Grid item xs={2}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia sx={{ height: 100, display: "flex", flexDirection: "row", justifyContent: "flex-end" }} image={url} title={images[index].name}>
                <Button
                  variant="contained"
                  sx={{ height: "25%", width: "15%", margin: "2%" }}
                  onClick={() => handleClearButtonClick(index)}
                >
                  <ClearIcon/>
                </Button>
              </CardMedia>
              <CardContent sx={{ display: "flex", flexDirection: "row" }}>
                <Typography varint="body1" sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{images[index].name}</Typography>
              </CardContent>
            </Card>

          </Grid>
        ))
        }
      </Grid>
    </Fragment>
  )
}