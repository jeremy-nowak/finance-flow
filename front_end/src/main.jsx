import React from "react";
import ReactDOM from "react-dom/client";

import UserProvider from "./Context/UserContext";
import CategProvider from "./Context/CategContext.jsx";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CategProvider>
    <UserProvider>
      <App />
    </UserProvider>
    </CategProvider>
  </React.StrictMode>
);
