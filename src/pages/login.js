import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useLazyQuery, gql } from "@apollo/react-hooks";
import { TextField, Button, Container, Stack } from "@mui/material";
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
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [status, setStatus] = useState();
  const [errors, setErrors] = useState([]);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  function loginUserCallback() {
    console.log("Callback hit");
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

  const [loginUser, { error }] = useLazyQuery(
    LOGIN_USER, {
    onCompleted: (data) => {
      setErrors(data.loginUser.errors);
      setStatus(data.loginUser.status);
      context.login(data.loginUser);
    },
  }
  );

  if (status) {
    navigate("/");
  }

  console.log(isEmailValid)

  return (
    <Container spacing={2} maxWidth="sm">
      <h3>Login</h3>
      <p>Всем привет</p>
      <Stack spacing={2} paddingBottom={2}>
        <TextField
          label="E-mail"
          name="email"
          type="email"
          error={emailDirty && !isEmailValid && !!values.email}
          helperText={(emailDirty && !isEmailValid && !!values.email) ? 'Некорректный E-mail' : ''}
          onChange={(event) => onChange(event, setIsEmailValid)}
          onBlur={() => setEmailDirty(true)}
        />
        <TextField
          label="Пароль"
          name="password"
          type="password"
          error={(passwordDirty && !values.password)}
          helperText={(passwordDirty && !values.password) ? 'Пароль не введен' : ''}
          onChange={onChange}
          onBlur={() => setPasswordDirty(true)}
        />
      </Stack>
      <Button
        variant="contained"
        onClick={onSubmit}
        disabled={!(isEmailValid && values.password)}
      >
        Постучаться
      </Button>

      <ErrorsHandler errors={errors} apolloError={error} />

    </Container>
  )
}

export default Login;