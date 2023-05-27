import React, { useState } from "react";
import { Alert, Box, Button, Container, Stack, TextField } from "@mui/material";
import ErrorsHandler from "../../ErrorsHandler";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { UPDATE_PRODUCT } from "../../../operations/mutations/updateProduct";
import { useForm } from "../../../utility/hooks";
import { prepareValuesForProductUpdate } from "../../../utility/utils";
import SelectInput, { handleSelectorChange } from "../SelectInput";
import { GET_CATEGORIES } from "../../../operations/queries/getCategories";
import { GET_CHARACTERISTICS } from "../../../operations/queries/getCharacteristics";
import ImageInput from "./ImageInput";
import ImagePreview from "./ImagePreview";
import { useNavigate } from "react-router-dom";
import { GET_PRODUCT } from "../../../operations/queries/getProduct";

export default function UpdateProduct({ product }) {
  const [errors, setErrors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(
    product ? product.categories.map((category) => category.id) : []
  );
  const [characteristics, setCharacteristics] = useState([]);
  const [selectedCharacteristicIds, setSelectedCharacteristicIds] = useState(
    []
  );
  const [productImages, setProductImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [imagesToRemoveIds, setImagesToRemoveIds] = useState([]);
  const [newProductPreviewId, setNewProductPreviewId] = useState(undefined);
  const navigate = useNavigate();

  const { onChange, onSubmit, values } = useForm(onSubmitButtonClick, {
    id: product.id,
    name: product.name,
    price: product.price,
    amount: product.amount,
    description: product.description,
    addImages: [],
    removeImagesById: [],
    deleteAllImages: false,
    setImageAsPreviewById: undefined,
    removeAllCategories: false,
    removeAllCharacteristics: false,
  });

  const { error: queryGetProductError } = useQuery(GET_PRODUCT, {
    variables: {
      id: product.id,
    },
    onCompleted: (data) => {
      setErrors((prevErrors) => [...prevErrors, ...data.getProduct.errors]);
      if (data.getProduct.status) {
        setProductImages(data.getProduct.product.images);
      }
    },
  });

  const { error: queryGetCategoriesError } = useQuery(GET_CATEGORIES, {
    onCompleted: (data) => {
      setErrors((prevErrors) => [...prevErrors, ...data.getCategories.errors]);
      if (data.getCategories.status)
        setCategories(data.getCategories.categories);
    },
  });

  const { error: queryGetCharacteristicsError } = useQuery(
    GET_CHARACTERISTICS,
    {
      onCompleted: (data) => {
        setCharacteristics(data.getCharacteristics);
      },
    }
  );

  const [
    updateProduct,
    {
      called: mutationUpdateProductCalled,
      loading: mutationUpdateProductLoading,
      error: mutationUpdateProductError,
    },
  ] = useMutation(UPDATE_PRODUCT, {
    onCompleted: (data) => {
      setErrors((prevErrors) => [...prevErrors, ...data.updateProduct.errors]);
      if (data.updateProduct.status) {
        navigate("/product/" + product.id);
      }
    },
  });

  function onSubmitButtonClick() {
    values.addImages = newImages;
    values.removeImagesById = imagesToRemoveIds;
    values.setImageAsPreviewById = newProductPreviewId;
    console.log(values);
    updateProduct({
      variables: prepareValuesForProductUpdate(
        values,
        selectedCategoryIds,
        selectedCharacteristicIds,
        product
      ),
    });
  }

  return (
    <Container spacing={2} maxWidth="md">
      <h3> Редактирование товара </h3>
      {!product && (
        <Alert severity="warning">Товар не выбран в списке товаров</Alert>
      )}
      {product && (
        <Box>
          <Stack spacing={2} paddingBottom={2}>
            <TextField
              label="Название"
              defaultValue={values.name}
              name="name"
              onChange={onChange}
            />
            <TextField
              label="Стоимость"
              type="number"
              defaultValue={values.price}
              name="price"
              onChange={onChange}
            />
            <TextField
              label="Количество на складе"
              type="number"
              defaultValue={values.amount}
              name="amount"
              onChange={onChange}
            />
            <TextField
              label="Описание"
              defaultValue={values.description}
              name="description"
              onChange={onChange}
            />
            <SelectInput
              text="Категории"
              selected={selectedCategoryIds}
              handleChange={(event) =>
                handleSelectorChange(event, setSelectedCategoryIds)
              }
              items={categories}
            />
            <SelectInput
              text="Характеристики"
              selected={selectedCharacteristicIds}
              handleChange={(event) =>
                handleSelectorChange(event, setSelectedCharacteristicIds)
              }
              items={characteristics}
            />
            <ImagePreview
              productImages={productImages}
              newImages={newImages}
              imagePreviewUrls={imagePreviewUrls}
              setNewImages={setNewImages}
              setImagePreviewUrls={setImagePreviewUrls}
              setImagesToRemoveIds={setImagesToRemoveIds}
              setNewProductPreviewId={setNewProductPreviewId}
            />
            <ImageInput
              setNewImages={setNewImages}
              setImagePreviewUrls={setImagePreviewUrls}
            />
          </Stack>
          <ErrorsHandler
            apolloError={mutationUpdateProductError}
            errors={errors}
          />
          <Button
            disabled={mutationUpdateProductCalled}
            variant="contained"
            onClick={onSubmit}
          >
            Обновить товар
          </Button>
        </Box>
      )}
    </Container>
  );
}
