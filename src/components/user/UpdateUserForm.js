import React, { useState } from "react";
import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "../../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER } from "../../operations/mutations/updateUser";
import ErrorsHandler from "../ErrorsHandler";
import {AvatarUploader} from "./AvatarUploader";

export function UpdateUserForm({ user, setSelectedAction }) {
  const [errors, setErrors] = useState([]);
  const { onChange, onSubmit, values } = useForm(onEditButtonClick, {
    id: user.id,
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    phoneNumber: user.phoneNumber,
  });

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER);

  function onEditButtonClick() {
    updateUser({
      variables: {
        id: values.id.toString(),
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        phoneNumber: values.phoneNumber,
      },
      onCompleted: (data) => {
        if (data.updateUser.status) setSelectedAction("show");
        else setErrors(data.updateUser.errors);
      },
    });
  }

  return (
    <Container spacing={2} maxWidth="sm">
      <Typography variant="h5">
        Редактирование пользователя {user.email}
      </Typography>
      <AvatarUploader userId={user.id} />
      <Stack spacing={2} paddingBottom={2} sx={{ marginTop: "10px" }}>
        {/*E-mail*/}
        <TextField
          label="E-mail"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
        />
        {/*Имя*/}
        <TextField
          label="Имя"
          name="firstName"
          type="text"
          value={values.firstName}
          onChange={onChange}
        />
        {/*Фамилия*/}
        <TextField
          label="Фамилия"
          name="lastName"
          type="text"
          value={values.lastName}
          onChange={onChange}
        />
        {/*Адрес*/}
        <TextField
          label="Адрес"
          name="address"
          type="text"
          value={values.address}
          onChange={onChange}
        />
        {/*Номер телефона*/}
        <TextField
          label="Номер телефона"
          name="phoneNumber"
          type={"tel"}
          value={values.phoneNumber}
          onChange={onChange}
        />
      </Stack>
      <ErrorsHandler errors={errors} apolloError={error} />
      <Button variant="contained" onClick={onSubmit} disabled={loading}>
        Сохранить изменения
      </Button>
    </Container>
  );
}
