import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";
import {useLazyQuery} from "@apollo/react-hooks";
import {GET_USER} from "../operations/queries/getUser";

const initialState = {
    user: null,
    userData: null,
}

if(localStorage.getItem("token")) {
    const decodedToken = jwtDecode(localStorage.getItem("token"))

    if (decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem("token");
        localStorage.removeItem("user")
    } else {
        initialState.user = decodedToken;
        initialState.userData = localStorage.getItem("user")
    }
}

const AuthContext = createContext({
    user: null,
    userData: null,
    login: () => {},
    logout: () => {}
});

function authReducer(state, action) {
    switch(action.type) {
        case "LOGIN":
            initialState.user = jwtDecode(localStorage.getItem("token"));
            initialState.userData = JSON.parse(localStorage.getItem("user"))
            return {
                ...state,
                user: initialState.user,
                userData: initialState.userData,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                userData: null,
            };
        default: return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [ getUser ] = useLazyQuery(GET_USER);

    const login = (loginUserData) => {
        if (loginUserData.status){
            localStorage.setItem("token", loginUserData.token);
            const decodedToken = jwtDecode(loginUserData.token)
            getUser({
              variables: {
                id: decodedToken.id,
              },
              onCompleted: (data) => {
                if (data.getUser.status) localStorage.setItem("user", JSON.stringify(data.getUser.user));
              }
            });
            dispatch({
                type: "LOGIN"
            })
        }
    }

    function logout() {
        localStorage.removeItem("token");
        dispatch({ type: 'LOGOUT' });
    }

    return (
        <AuthContext.Provider
            value={{user: state.user, userData: state.userData, login, logout}}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider };