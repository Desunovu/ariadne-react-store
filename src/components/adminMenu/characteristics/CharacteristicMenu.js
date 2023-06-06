import React, {useState} from "react";
import {
    Button, Card, CardActions, CardContent, Container, Grid, IconButton, Stack, TextField, Typography
} from "@mui/material";
import { Delete } from "@mui/icons-material"
import { useQuery, useMutation } from "@apollo/react-hooks";

import {useForm} from "../../../utility/hooks";

import {GET_CHARACTERISTICS} from "../../../operations/queries/getCharacteristics";
import {CREATE_CHARACTERISTIC} from "../../../operations/mutations/createCharacteristic";
import {DELETE_CHARACTERISTIC} from "../../../operations/mutations/deleteCharacteristic";

function CharacteristicsMenu(){
    const [characteristics, setCharacteristics] = useState([]);

    function createCharacteristicCallback(){
        createCharacteristic({
            variables:{
                name: values.name
            }
        });
    }

    function deleteCharacteristicCallback(id) {
        console.log(id);
        deleteCharacteristic({
            variables:{
                id: id
            }
        });
    }

    const { onChange, onSubmit, values } = useForm(createCharacteristicCallback, {
        name: "Характеристика"
    })

    const {refetch} = useQuery(
        GET_CHARACTERISTICS, {
            onCompleted: (data) => {
                setCharacteristics(data.getCharacteristics);
            }
        }
    )

    const [createCharacteristic] = useMutation(
        CREATE_CHARACTERISTIC, {
            onCompleted: (data) => {
                console.log(data);
                refetch();
            }
        }
    );

    const [deleteCharacteristic] = useMutation(
        DELETE_CHARACTERISTIC, {
            onCompleted: (data) => {
                console.log(data);
                refetch();
            }
        }
    )

    return (
        <Container spacing={2} maxWidth="md">
            <h3>Список характеристик для товаров</h3>
            <Grid container spacing={2}>
                {characteristics.map((characteristic) => (
                    <Grid item xs="auto" md={3}>
                        <Card sx={{ p: 0.5, display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                            <CardContent sx={{flex: "1 0 auto", display: "flex", flexDirection: "column"}}>
                                <Typography variant="body">
                                    {characteristic.name}
                                </Typography>
                                <Typography variant="caption">
                                    id: {characteristic.id}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton
                                    onClick={() => deleteCharacteristicCallback(characteristic.id)}
                                >
                                    <Delete/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <h3>Добавить новую характеристику</h3>
            <Stack direction="row" spacing={2}>
                <TextField
                    label="Имя новой характеристики"
                    name="name"
                    onChange={onChange}
                    sx={{flex: "1 0 auto"}}
                />
                <Button variant="contained" onClick={onSubmit}>Добавить</Button>
            </Stack>
        </Container>
    );
}

export default CharacteristicsMenu;