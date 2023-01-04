import { createContext, useState } from "react";

const initialState = {
  name: "Harry",
  profile: "cool beans",
  token: "epic token",
};

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [user, setUser] = useState(initialState);
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {props.children}
    </AppContext.Provider>
  );
};
