import React from "react";
import {Alert} from "@mui/material";

export default function ErrorsHandler(props){
    const { errors, apolloError } = props;
    console.log(apolloError);

    return (
        <>
            {apolloError &&
                (
                    (apolloError.networkError &&
                        <Alert severity="error">Сетевая ошибка: "{apolloError.networkError.message}"</Alert>)
                    ||
                    (apolloError.graphQLErrors.map(error => (
                        <Alert severity="error">{error.message}</Alert>
                    )))
                )
            }
            {errors.map(error => (
                    <Alert key={error.id} severity="warning">{error.message}</Alert>
            ))}
        </>
    )
}
