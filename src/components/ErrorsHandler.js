import React from "react";
import {Alert} from "@mui/material";

export default function ErrorsHandler(props){
    const { errors, apolloError } = props;

    return (
        <>
            {apolloError &&
                ((apolloError.networkError &&
                    <Alert severity="error">Сетевая ошибка: "{apolloError.networkError.message}"</Alert>)
                ||
                (apolloError.graphQLErrors &&
                    <Alert severity="error">{apolloError.graphQLErrors}</Alert>
                ))
            }
            {errors.map(error => (
                    <Alert key={error.id} severity="warning">{error.message}</Alert>
            ))}
        </>
    )
}
