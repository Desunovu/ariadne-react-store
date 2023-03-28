import React from "react";
import {useContext, useState} from "react";
import {AuthContext} from "../context/authContext";
import {useForm} from "../utility/hooks";
import {useLazyQuery, useQuery, gql} from "@apollo/react-hooks";
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
    const [errors, setErrors] = useState([]);
    const [apolloErrors, setApolloErrors] = useState([]);
    const context = useContext(AuthContext);
    const [status, setStatus] = useState();
    const [token, setToken] = useState();

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

    const [loginUser, {data, error}] = useLazyQuery(
        LOGIN_USER, {
            onError(){
                console.log(error);
            },
            onCompleted: (data) => {
                setErrors(data.loginUser.errors);
                setStatus(data.loginUser.status);
                setToken(data.loginUser.token);
                context.login(data.loginUser);
            },
        }
    );

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
            {apolloErrors.map(apolloError =>(
                <Alert severity="error">{apolloError}</Alert>
            ))}
        </Container>
    )
}

export default Login;