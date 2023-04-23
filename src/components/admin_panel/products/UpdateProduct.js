import React from "react";
import {Alert, Box, Button, Container, Stack, TextField} from "@mui/material";
import ErrorsHandler from "../../ErrorsHandler";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_PRODUCT} from "../../../operations/mutations/updateProduct";
import {useForm} from "../../../utility/hooks";
import {filterValuesForUpdate} from "../../../utility/utils";

export default function UpdateProduct(props) {
    const {product} = props;
    const errors = [];

    const {onChange, onSubmit, values} = useForm(updateProductCallback, {
        id: product.id,
        name: product.name,
        price: product.price,
        amount: product.amount,
        description: product.description,
        addImages: [],
        removeImagesById: [],
        deleteAllImages: false,
        addCategoriesById: [],
        removeCategoriesById: [],
        removeAllCategories: false,
        addCharacteristicByIds: [],
        removeCharacteristicByIds: [],
        removeAllCharacteristics: false
    })

    const [updateProduct, { error: apolloError }] = useMutation(
      UPDATE_PRODUCT,
      {
        onCompleted: data => {
          errors.push(data.updateProduct.errors);
        }
      }
    );

    function updateProductCallback() {
      const variables = filterValuesForUpdate(values, product);


      updateProduct({
        variables: variables
      });
    }

    // TODO ID, редактирование характеристик и категорий, кнопка и запрос на update
    return (
      <Container spacing={2} maxWidth="md">
        <h3> Редактирование товара </h3>
        {!product.id && (
          <Alert severity="warning">Товар не выбран в списке товаров</Alert>
        )}
        {product.id && (
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
            </Stack>
            <ErrorsHandler apolloError={apolloError} errors={errors} />
            <Button variant="contained" onClick={onSubmit}>
              Обновить товар
            </Button>
          </Box>
        )}
      </Container>
    );
}