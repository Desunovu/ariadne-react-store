import React, {useState} from "react";
import {useForm} from "../../../utility/hooks";
import { Button, Stack, TextField, Container } from "@mui/material";
import {useMutation, useQuery} from "@apollo/react-hooks";

import {GET_CATEGORIES} from "../../../operations/queries/getCategories";
import {GET_CHARACTERISTICS} from "../../../operations/queries/getCharacteristics";
import {ADD_PRODUCT} from "../../../operations/mutations/addProduct";

import SelectInput from "../SelectInput";
import ErrorsHandler from "../../ErrorsHandler";

function AddProductMenu() {
    const errors = [];
    const [categories, setCategories] = useState([]);
    const [characteristics, setCharacteristics] = useState([]);
    const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

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

    // Мутация создания продукта
    const [addProduct, {error: productError}] = useMutation(
        ADD_PRODUCT,
        {onCompleted: (data) => {
                errors.push(data.addProduct.errors)
            }
        }
    );

    // Колбек кнопки добавить
    function addProductCallback() {
        addProduct({
            variables:{
                name: values.name,
                price: parseInt(values.price),
                amount: parseInt(values.amount),
                description: values.description,
                categoryIds: Array.from(selectedCategories, category => category.id),
                characteristicIds: Array.from(selectedCharacteristics, characteristic => characteristic.id)
            }
        });
        console.log("add product callback hit")
    }

    function handleCategoriesChange(event) {
        const { value } = event.target;
        setSelectedCategories(value);
    }

    function handleCharacteristicChange(event) {
        const { value } = event.target;
        setSelectedCharacteristics(value);
    }

    // Переменные формы
    const { onChange, onSubmit, values } = useForm(addProductCallback, {
        name: "Новый товар",
        price: "100",
        amount: "10",
        description: "Описание товара",
        categoryIds: [],
        characteristicIds: []
    })

    console.log(productError);

    return (
        <>
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
                    <SelectInput text="Категории" selected={selectedCategories} handleChange={handleCategoriesChange} items={categories}/>
                    <SelectInput text="Характеристики" selected={selectedCharacteristics} handleChange={handleCharacteristicChange} items={characteristics}/>
                </Stack>
                <ErrorsHandler apolloError={productError} errors={errors}/>
                <Button variant="contained" onClick={onSubmit}>Постучаться</Button>
            </Container>

        </>
    )
}

export default AddProductMenu;