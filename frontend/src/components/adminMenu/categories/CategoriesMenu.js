import React, {useState} from "react";
import {
    Button, Card, CardActions, CardContent, Container, Grid, IconButton, Stack, TextField, Typography
} from "@mui/material";
import { Delete } from "@mui/icons-material"

import {ADD_CATEGORY} from "../../../operations/mutations/addCategory";
import {REMOVE_CATEGORY} from "../../../operations/mutations/removeCategory";
import {GET_CATEGORIES} from "../../../operations/queries/getCategories";
import { useQuery, useMutation } from "@apollo/react-hooks";

import {useForm} from "../../../utility/hooks";

function CategoriesMenu(){
    const [categories, setCategories] = useState([]);

    function addCategoryCallback(){
        addCategory({
            variables:{
                name: values.name
            }
        });
    }

    function removeCategoryCallback(id) {
        console.log(id);
        removeCategory({
            variables:{
                id: id
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

    const [addCategory] = useMutation(
        ADD_CATEGORY,{
            onCompleted: (data) => {
                console.log(data);
                refetch();
            }
        }
    );

    const [removeCategory] = useMutation(
        REMOVE_CATEGORY, {
            onCompleted: (data) => {
                console.log(data);
                refetch();
            }
        }
    )

    return (
        <Container spacing={2} maxWidth="md">
            <h3>Список категорий для товаров</h3>
            <Grid container spacing={2}>
                {categories.map((category) => (
                    <Grid item xs="auto" md={3}>
                        <Card sx={{ p: 0.5, display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                            <CardContent sx={{flex: "1 0 auto", display: "flex", flexDirection: "column"}}>
                                <Typography variant="body">
                                    {category.name}
                                </Typography>
                                <Typography variant="caption">
                                    id: {category.id}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton
                                    onClick={() => removeCategoryCallback(category.id)}
                                >
                                    <Delete/>
                                </IconButton>
                            </CardActions>
                        </Card>
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