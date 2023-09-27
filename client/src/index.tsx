import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Store from "./store/store";
import { createContext } from "react";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

interface State {
  store: Store;
}

const store = new Store();
export const Context = createContext<State>({ store });

root.render(
  <React.StrictMode>
    <Context.Provider value={{ store }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
