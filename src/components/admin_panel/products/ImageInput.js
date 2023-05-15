import { PhotoCamera } from "@mui/icons-material"
import { Box, Button } from "@mui/material"
import React from "react"

export default function ImageInput({ setImages, setPreviewUrls }) {
  const handleFileChange = (event) => {
    const newImages = Array.from(event.target.files);
    const newUrls = newImages.map((image) => URL.createObjectURL(image));
    setImages((images) => [...images, ...newImages]);
    setPreviewUrls((urls) => [...urls, ...newUrls]);
  };

  return (
    <Box>
      <Button variant="contained" component="label">
        <PhotoCamera />
        Загрузить изображения
        <input
          hidden
          accept="image/*"
          type="file"
          multiple
          onChange={handleFileChange}
        />
      </Button>
    </Box>
  )
}