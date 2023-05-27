import { Button, Container, Stack, TextField } from "@mui/material";
import SelectInput, { handleSelectorChange } from "../SelectInput";
import ErrorsHandler from "../../ErrorsHandler";
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_CATEGORIES } from "../../../operations/queries/getCategories";
import { GET_CHARACTERISTICS } from "../../../operations/queries/getCharacteristics";
import { ADD_PRODUCT } from "../../../operations/mutations/addProduct";
import { useForm } from "../../../utility/hooks";
import ImageInput from "./ImageInput";
import ImagePreview from "./ImagePreview";

export default function AddProduct() {
  const errors = [];
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [selectedCharacteristicIds, setSelectedCharacteristicIds] = useState(
    []
  );
  const [newImages, setNewImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

  const { onChange, onSubmit, values } = useForm(onSubmitButtonClick, {
    name: "Новый товар",
    price: "100",
    amount: "10",
    description: "Описание товара",
    categoryIds: [],
    characteristicIds: [],
  });

  const { error: categoriesError } = useQuery(GET_CATEGORIES, {
    onCompleted: (data) => {
      setCategories(data.getCategories.categories);
      errors.push(data.getCategories.errors);
    },
  });

  const { error: characteristicsError } = useQuery(GET_CHARACTERISTICS, {
    onCompleted: (data) => {
      setCharacteristics(data.getCharacteristics);
    },
  });

  const [addProduct, { error: productError }] = useMutation(ADD_PRODUCT, {
    onCompleted: (data) => {
      errors.push(data.addProduct.errors);
    },
  });

  function onSubmitButtonClick() {
    addProduct({
      variables: {
        name: values.name,
        price: parseInt(values.price),
        amount: parseInt(values.amount),
        description: values.description,
        categoryIds: selectedCategoryIds,
        characteristicIds: selectedCharacteristicIds,
        images: newImages,
      },
    });
  }

  return (
    <Container spacing={2} maxWidth="md">
      <h3> Добавление нового товара в базу </h3>
      <Stack spacing={2} paddingBottom={2}>
        <TextField
          label="Название"
          defaultValue={values.name}
          name="name"
          onChange={onChange}
        />
        <TextField
          label="Стоимость"
          defaultValue={values.price}
          name="price"
          onChange={onChange}
        />
        <TextField
          label="Количество на складе"
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
        <ImageInput setNewImages={setNewImages} imagePreviewUrls={imagePreviewUrls} />
        <ImagePreview
          newImages={newImages}
          imagePreviewUrls={imagePreviewUrls}
          setNewImages={setNewImages}
          setImagePreviewUrls={setImagePreviewUrls}
        />
      </Stack>
      <ErrorsHandler apolloError={productError} errors={errors} />
      <Button variant="contained" onClick={onSubmit}>
        Добавить товар
      </Button>
    </Container>
  );
}