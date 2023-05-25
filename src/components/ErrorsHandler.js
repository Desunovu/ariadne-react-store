import React from "react";
import { Alert } from "@mui/material";

export default function ErrorsHandler({ errors, apolloError }) {
  return (
    <>
      {apolloError && apolloError.networkError && (
        <Alert severity="error">
          Сетевая ошибка: "{apolloError.networkError.message}"
        </Alert>
      )}
      {apolloError &&
        apolloError.graphQLErrors &&
        apolloError.graphQLErrors.map(({ message }) => (
          <Alert severity="error">Ошибка: "{message}"</Alert>
        ))}
      {errors &&
        errors.map((error) => (
          <Alert key={error.id} severity="warning">
            {error.message}
          </Alert>
        ))}
    </>
  );
}
