import React from "react";
import {useContext, useState} from "react";
import {AuthContext} from "../context/authContext";
import {useForm} from "../utility/hooks";
import {useLazyQuery, gql} from "@apollo/react-hooks";
import {TextField, Button, Container, Stack, Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";

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

function Login(props) {
    let navigate = useNavigate();
    const context = useContext(AuthContext);
    const [status, setStatus] = useState();
    const [errors, setErrors] = useState([]);

    function loginUserCallback() {
        console.log("Callback hit");
        loginUser({variables: {
                email: values.email,
                password: values.password
            }});
    }

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: "",
        password: ""
    })

    const [loginUser, {data, isError, error}] = useLazyQuery(
        LOGIN_USER, {
            onError: () => {
                console.log(error.graphQLErrors)
                setStatus(false);
            },
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

    return(
        <Container spacing={2} maxWidth="sm">
            <h3>Login</h3>
            <p>Всем привет</p>
            <Stack spacing={2} paddingBottom={2}>
                <TextField
                    label="E-mail"
                    name="email"
                    onChange={onChange}
                />
                <TextField
                    label="Пароль"
                    name="password"
                    onChange={onChange}
                />
            </Stack>
            <Button variant="contained" onClick={onSubmit}>Постучаться</Button>

            {errors.map(backendError =>(
                <Alert key={backendError.code} severity="error">{backendError.message}</Alert>
            ))}

        </Container>
    )
}

export default Login;