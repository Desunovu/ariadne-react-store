import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useLazyQuery, gql } from "@apollo/react-hooks";
import { TextField, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorsHandler from "../components/ErrorsHandler";

const LOGIN_USER = gql`
    query LoginUser(
        $email: String!
        $password: String!
    ) {
        loginUser(email: $email, password: $password){
            status
            errors{
                code
                message
            }
            token
        }
    }
`;

function Login() {
  const context = useContext(AuthContext);
  const [status, setStatus] = useState();
  const [errors, setErrors] = useState([]);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("Некорректный пароль");
  let navigate = useNavigate();

  const [loginUser, { error }] = useLazyQuery(
    LOGIN_USER, {
    onCompleted: (data) => {
      setErrors(data.loginUser.errors);
      setStatus(data.loginUser.status);
      if (status) {
        context.login(data.loginUser);
        navigate("/");
      }
      
    },
  });

  function loginUserCallback() {
    loginUser({
      variables: {
        email: values.email,
        password: values.password
      }
    });
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: ""
  })

  return (
    <Container spacing={2} maxWidth="sm">
      <Typography variant="h5">
        Войти в систему
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
          error={passwordDirty && !isPasswordValid}
          helperText={passwordDirty && !isPasswordValid && passwordErrorMessage}
          onChange={(event) => onChange(event, setIsPasswordValid, { setPasswordErrorMessage: setPasswordErrorMessage })}
          onBlur={() => setPasswordDirty(true)}
        />
      </Stack>
      <Button
        variant="contained"
        onClick={onSubmit}
        disabled={!(isEmailValid && isPasswordValid)}
      >
        Войти
      </Button>

      <ErrorsHandler errors={errors} apolloError={error} />

    </Container>
  )
}

export default Login;