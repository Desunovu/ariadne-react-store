import React from "react";
import { useContext, useState } from "react";
import { useForm } from "../utility/hooks";
import { useMutation, gql } from "@apollo/react-hooks";
import { TextField, Button, Container, Stack, Alert, FormControl, Typography, Box } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const CREATE_USER = gql`
    mutation CreateUser(
        $email: String!
        $password: String!
    ) {
        createUser(email: $email, password: $password){
            status
            errors{message}
            user{email}
        }
    }
`;

function Register() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(false)
  const [user, setUser] = useState(undefined);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordConfirmDirty, setPasswordConfirmDirty] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("Некорректный пароль");

  const [createUser] = useMutation(
    CREATE_USER, {
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    onCompleted: (data) => {
      setErrors(data.createUser.errors);
      setStatus(data.createUser.status);
      setUser(data.createUser.user);
      if (status) {
        context.login(data.createUser)
      }
    },
  });

  const createUserCallback = () => {
    createUser({
      variables: {
        email: values.email,
        password: values.password
      } 
    });
  }

  const { onChange, onSubmit, values } = useForm(createUserCallback, {
    email: "",
    password: "",
    passwordConfirm: "",
  })

  return (
    <Container spacing={2} maxWidth="sm">
      <Typography variant="h5">
        Регистрация
      </Typography>
      <Stack spacing={2} paddingBottom={2} sx={{ marginTop: "10px" }}>
        <TextField
          label="E-mail"
          name="email"
          type="email"
          error={emailDirty && !isEmailValid}
          helperText={emailDirty && !isEmailValid && "Некорректный E-mail"}
          onChange={(event) => onChange(event, setIsEmailValid)}
          onBlur={() => setEmailDirty(true)}
        />
        <TextField
          label="Пароль"
          name="password"
          type="password"
          error={(!isPasswordValid && passwordConfirmDirty)}
          onChange={(event) => onChange(event, setIsPasswordValid, {passwordToCompare: values.passwordConfirm, setPasswordErrorMessage: setPasswordErrorMessage})}
        />
        <TextField
          label="Повторите пароль"C
          name="passwordConfirm"
          type="password"
          error={!isPasswordValid && passwordConfirmDirty}
          helperText={!isPasswordValid && passwordConfirmDirty && passwordErrorMessage}
          onChange={(event) => onChange(event, setIsPasswordValid, {passwordToCompare: values.password, setPasswordErrorMessage: setPasswordErrorMessage})}
          onBlur={() => setPasswordConfirmDirty(true)}
        />
      </Stack>
      {errors.map((error) => {
        return (
          <Alert severity="error">
            {error.message}
          </Alert>
        )
      })}
      <Button
        variant="contained"
        onClick={onSubmit}
        disabled={!(isEmailValid && isPasswordValid)}
      >
        Создать учетную запись
      </Button>
      {status &&
        <Box>
          <Alert security="success">
            {user.email} успешно зарегистрирован!
          </Alert>
          <Button component={Link} to={"/"}>
            На главную
          </Button>
        </Box>
      }
    </Container>
  )
}

export default Register;