import React, {useState} from "react";
import {Alert, Box, Button, Container, Stack, TextField} from "@mui/material";
import ErrorsHandler from "../../ErrorsHandler";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {UPDATE_PRODUCT} from "../../../operations/mutations/updateProduct";
import {useForm} from "../../../utility/hooks";
import {prepareValuesForProductUpdate} from "../../../utility/utils";
import SelectInput, {handleSelectorChange} from "../SelectInput";
import {GET_CATEGORIES} from "../../../operations/queries/getCategories";
import {GET_CHARACTERISTICS} from "../../../operations/queries/getCharacteristics";

export default function UpdateProduct(props) {
    const {product} = props;
    const errors = [];
    const [categories, setCategories] = useState([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState(product.categories.map((category) => category.id));
    const [characteristics, setCharacteristics] = useState([]);
    const [selectedCharacteristicIds, setSelectedCharacteristicIds] = useState([]);

    const {onChange, onSubmit, values} = useForm(updateProductCallback, {
        id: product.id,
        name: product.name,
        price: product.price,
        amount: product.amount,
        description: product.description,
        addImages: [],
        removeImagesById: [],
        deleteAllImages: false,
        removeAllCategories: false,
        removeAllCharacteristics: false
    })

    // Получение категорий
    const {error: categoriesError} = useQuery(
        GET_CATEGORIES, {
            onCompleted: (data) => {
                setCategories(data.getCategories.categories);
                errors.push(data.getCategories.errors)
            }
        }
    );

    // Получение характеристик
    const {error: characteristicsError} = useQuery(
        GET_CHARACTERISTICS, {
            onCompleted: (data) => {
                setCharacteristics(data.getCharacteristics);
            }
        }
    );

    const [updateProduct, { error: apolloError }] = useMutation(
      UPDATE_PRODUCT,
      {
        onCompleted: data => {
          errors.push(data.updateProduct.errors);
        }
      }
    );

    function updateProductCallback() {
        updateProduct({
            variables: prepareValuesForProductUpdate(
                values,
                selectedCategoryIds,
                selectedCharacteristicIds,
                product
            )
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
                  handleChange={(event)  => handleSelectorChange(event, setSelectedCategoryIds)}
                  items={categories}/>
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