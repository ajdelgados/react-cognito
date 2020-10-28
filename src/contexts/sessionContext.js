import React, { createContext, useReducer } from "react";

const SessionContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_USER_INFORMATION": {
      return {
        ...state,
        loading: true,
        message: null,
      };
    }
    case "LOADED_USER_INFORMATION": {
      return {
        loading: false,
        authenticated: true,
        message: null,
        payload: action.payload

      };
    }
    case "FAIL_USER_INFORMATION": {
      return {
        loading: false,
        authenticated: false,
        message: "Authentication fail",
        payload: {}

      };
    }
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  authenticated: false,
  message: null,
  payload: {}
};

const SessionContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SessionContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export {SessionContext, SessionContextProvider}