import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { ToastContextProvider } from "./contexts/ToastContext";
import "./index.css";
import { store } from "./store/store";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "./contexts/SidebarContext";
import { BrowserRouter } from "react-router-dom";

const customTheme = {
  button: {
    valid: {
      sizes: ["sm", "md", "lg"],
      colors: ["primary", "secondary"],
    },
    styles: {
      variants: {
        filled: {
          primary: {
            background: "bg-primary",
            color: "text-white",
            shadow: "shadow-none",
            hover: "hover:shadow-lg hover:shadow-blue-gray-500/20",
            focus: "focus:opacity-[0.85] focus:shadow-none",
            active: "active:opacity-[0.85] active:shadow-none",
          },
          secondary: {
            background: "bg-secondary",
            color: "text-white",
            shadow: "shadow-none",
            hover: "hover:shadow-lg hover:shadow-blue-gray-500/20",
            focus: "focus:opacity-[0.85] focus:shadow-none",
            active: "active:opacity-[0.85] active:shadow-none",
          },
        },

        outlined: {
          primary: {
            background: "bg-white",
            border: "border border-primary",
            color: "text-primary",
            hover: "hover:opacity-75",
            focus: "focus:ring focus:ring-white/50",
            active: "active:opacity-[0.85]",
          },
          secondary: {
            background: "bg-white",
            border: "border border-secondary",
            color: "text-secondary",
            hover: "hover:opacity-75",
            focus: "focus:ring focus:ring-white/50",
            active: "active:opacity-[0.85]",
          },
        },
      },
    },
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContextProvider>
          <ThemeProvider value={customTheme}>
            <MaterialTailwindControllerProvider>
              <App />
            </MaterialTailwindControllerProvider>
          </ThemeProvider>
        </ToastContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
