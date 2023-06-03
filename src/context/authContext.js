import React, {useReducer, createContext, useEffect} from "react";
import jwtDecode from "jwt-decode";
import {useLazyQuery} from "@apollo/react-hooks";
import {GET_USER} from "../operations/queries/getUser";

// Начальное состояние для контекста авторизации
const initialState = {
  userData: null,
};

// Извлечение данных пользователя из localStorage
const getUserDataFromLocalStorage = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

// Проверка на истечение срока действия токена
const checkTokenExpiration = (token) => {
  const decodedToken = jwtDecode(token);
  return decodedToken.exp * 1000 > Date.now();
};

// Создание контекста авторизации
const AuthContext = createContext({
  userData: null,
  login: () => {
  },
  logout: () => {
  },
});

// Редуктор для обработки действий авторизации
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userData: action.payload.userData,
      };
    case "LOGOUT":
      return {
        ...state,
        userData: null,
      };
    default:
      return state;
  }
}

// Компонент провайдера авторизации
function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [getUser] = useLazyQuery(GET_USER);

  // Эффект, выполняющийся при первоначальной загрузке страницы
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && checkTokenExpiration(token)) {
      // Получение данных пользователя при наличии действующего токена
      getUser({
        variables: {
          id: jwtDecode(token).id,
        },
        onCompleted: async (data) => {
          if (data.getUser.status) {
            localStorage.setItem("user", JSON.stringify(data.getUser.user));
            dispatch({
              type: "LOGIN",
              payload: {
                userData: getUserDataFromLocalStorage(),
              },
            });
          }
        },
      });
    }
  }, []);

  // Функция для выполнения входа пользователя
  const login = (loginUserData) => {
    console.log("Вызван login в AuthProvider");
    if (loginUserData.status) {
      localStorage.setItem("token", loginUserData.token);
      getUser({
        variables: {
          id: jwtDecode(loginUserData.token).id,
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
                userData: getUserDataFromLocalStorage(),
              },
            });
          }
        },
      });
    }
  };

  // Функция для выполнения выхода пользователя
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({type: "LOGOUT"});
  }

  // Возвращение провайдера авторизации с контекстом и значениями
  return (
    <AuthContext.Provider
      value={{userData: state.userData, login, logout}}
      {...props}
    />
  );
}

export {AuthContext, AuthProvider};