import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@apollo/react-hooks";
import { UPLOAD_AVATAR } from "../../operations/mutations/uploadAvatar";
import ErrorsHandler from "../ErrorsHandler";
import {Box, Button, Typography} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

export function AvatarUploader({ userId }) {
  const [errors, setErrors] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadDone, setUploadDone] = useState(false);

  const [uploadAvatar, { called: mutationCalled, error: mutationError }] =
    useMutation(UPLOAD_AVATAR);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    await setSelectedImage(file);
  };

  async function getPresignedURL() {
    try {
      const { data } = await uploadAvatar({
        variables: {
          userId: userId,
        },
      });
      return data.uploadAvatar.presignedUrl;
    } catch (error) {
      console.error("Ошибка получения предварительно подписанного URL:", error);
    }
  }

  async function uploadToPresignedURL(url) {
    try {
      await axios.put(url, selectedImage);
      await setUploadDone(true)
      console.log("Изображение успешно загружено.");
    } catch (error) {
      setErrors(prevState => [...prevState, {code: 228, message: "Ошибка загрузки изображения:"+error}])
    }
  }

  async function uploadImage() {
    if (selectedImage) {
      const presignedURL = await getPresignedURL();
      if (presignedURL) {
        await uploadToPresignedURL(presignedURL);
      }
    }
  }

  return (
    <Box>
      <ErrorsHandler errors={errors} apolloError={mutationError} />
      {uploadDone && <Typography>Аватар успешно загружен!</Typography>}
      {!uploadDone && (
        <Box>
          <Button
            disabled={mutationCalled}
            variant="contained"
            component="label"
          >
            <PhotoCamera />
            Выбрать новый аватар
            <input
              hidden
              accept="image/png"
              type="file"
              multiple
              onChange={handleImageChange}
            />
          </Button>
          {!!selectedImage && (
            <Button variant="contained" onClick={uploadImage}>
              Загрузить
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}
