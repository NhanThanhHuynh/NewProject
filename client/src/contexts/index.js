import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/Authreducer";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import setAuthtoken from "./../utils/setAuthtoken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthticated: false,
    user: null,
  });

  //Auth user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthtoken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    try {
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthtoken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthticated: false, user: null },
      });
    }
  };

  useEffect(() => loadUser(), []);
  
  //Register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        )
      }
      await loadUser()
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, messsage: error.messsage };
    }
  };

  //Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        )
      }
      await loadUser()
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, messsage: error.messsage };
    }
  };
  //Logout
  const logoutUser = ()=>{
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthticated: false, user: null },
    });
  }
  //context data
  const authContextData = { loginUser, authState,logoutUser,registerUser };
  //return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
