import React, { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  // user: null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

// console.log(INITIAL_STATE.user);

// create context
export const AuthContext = createContext(INITIAL_STATE);

// context provider
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    // console.log(JSON.stringify(state.user));

    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
