import React, {useState} from "react";
import {
    Button, Card,
    Container, Grid, MenuItem, Stack, TextField
} from "@mui/material";

import { gql, useQuery, useMutation } from "@apollo/react-hooks";
import {useForm} from "../../utility/hooks";

const GET_CATEGORIES = gql`
    query GetCategories(
        $pagination: Pagination
        $sort: SortGetProducts
    ){
        getCategories(
            pagination: $pagination
            sort: $sort
        ){
            status
            errors{message}
            categories{
                id
                name
            }
        }
    }
`;

const ADD_CATEGORY = gql`
    mutation AddCategory(
        $name: String!
    ){
        addCategory(name: $name){
            status
            errors{message}
            category{id, name}
        }
    }
`;

function CategoriesMenu(props){
    const [categories, setCategories] = useState([]);

    function addCategoryCallback(){
        addCategory({
            variables:{
                name: values.name
            }
        });
    }
    const { onChange, onSubmit, values } = useForm(addCategoryCallback, {
        name: "Категория"
    })

    const {refetch} = useQuery(
        GET_CATEGORIES, {
            onCompleted: (data) => {
                setCategories(data.getCategories.categories);
            }
        }
    )

    const [addCategory, {}] = useMutation(
        ADD_CATEGORY,{
            onCompleted: (data) => {
                console.log(data);
                refetch();
            }
        }
    );

    return (
        <Container spacing={2} maxWidth="md">
            <h3>Список категорий для товаров</h3>
            <Grid container spacing={2}>
                {categories.map((category) => (
                    <Grid item xs="auto" md={3}>
                        <Card>{category.name} (id: {category.id})</Card>
                    </Grid>
                ))}
            </Grid>

            <h3>Добавить новую категорию</h3>
            <Stack direction="row" spacing={2}>
                <TextField
                    label="Имя новой категории"
                    defaultValue={values.name}
                    name="name"
                    onChange={onChange}
                    sx={{flex: "1 0 auto"}}
                />
                <Button variant="contained" onClick={onSubmit}>Добавить</Button>
            </Stack>
        </Container>
    );
}

export default CategoriesMenu;