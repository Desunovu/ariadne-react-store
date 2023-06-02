import React, {useReducer, createContext, useEffect} from "react";
import jwtDecode from "jwt-decode";
import {useLazyQuery} from "@apollo/react-hooks";
import {GET_USER} from "../operations/queries/getUser";

const initialState = {
  user: null,
  userData: null,
};

const token = localStorage.getItem("token");
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } else {
    initialState.user = decodedToken;
    initialState.userData = JSON.parse(localStorage.getItem("user"));
  }
}

const AuthContext = createContext({
  user: null,
  userData: null,
  login: () => {
  },
  logout: () => {
  },
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        userData: action.payload.userData,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        userData: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [getUser] = useLazyQuery(GET_USER);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        getUser({
          variables: {
            id: decodedToken.id,
          },
          onCompleted: async (data) => {
            if (data.getUser.status) {
              localStorage.setItem("user", JSON.stringify(data.getUser.user));
              dispatch({
                type: "LOGIN",
                payload: {
                  user: decodedToken,
                  userData: JSON.parse(localStorage.getItem("user")),
                },
              });
            }
          },
        });
      }
    }
  }, []);

  const login = (loginUserData) => {
    console.log("Вызван login в AuthProvider");
    if (loginUserData.status) {
      localStorage.setItem("token", loginUserData.token);
      const decodedToken = jwtDecode(loginUserData.token);
      getUser({
        variables: {
          id: decodedToken.id,
        },
        onCompleted: async (data) => {
          if (data.getUser.status) {
            await localStorage.setItem(
              "user",
              JSON.stringify(data.getUser.user)
            );
            dispatch({
              type: "LOGIN",
              payload: {
                user: decodedToken,
                userData: JSON.parse(localStorage.getItem("user")),
              },
            });
          }
        },
      });
    }
  };

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({type: "LOGOUT"});
  }

  return (
    <AuthContext.Provider
      value={{user: state.user, userData: state.userData, login, logout}}
      {...props}
    />
  );
}

export {AuthContext, AuthProvider};