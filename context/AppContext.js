import React, { createContext } from "react";

export const AppContext = createContext();

const AppState = (props) => {
  return (
    <AppContext.Provider value={{ msg: "Namaste Dunia!" }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
