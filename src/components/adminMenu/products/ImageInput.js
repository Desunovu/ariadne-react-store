import { PhotoCamera } from "@mui/icons-material"
import { Box, Button } from "@mui/material"
import React from "react"

export default function ImageInput({ setNewImages, setImagePreviewUrls }) {
  const handleFileChange = (event) => {
    const newImages = Array.from(event.target.files);
    const newUrls = newImages.map((image) => URL.createObjectURL(image));
    setNewImages((images) => [...images, ...newImages]);
    setImagePreviewUrls((urls) => [...urls, ...newUrls]);
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