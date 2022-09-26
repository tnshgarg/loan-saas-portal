import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { ToastContextProvider } from "./contexts/ToastContext";
import "./index.css";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContextProvider>
        <App />
      </ToastContextProvider>
    </Provider>
  </React.StrictMode>
);
