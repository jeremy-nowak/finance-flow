import { useState, useContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { UserContext } from "./Context/UserContext";
import "./App.css";

import AuthScreen from "./screens/AuthScreen";
import HomeScreen from "./screens/HomeScreen";

function App() {
  const { setUser, setConnected, connected } = useContext(UserContext);

  return (
    <>
      {!connected && <AuthScreen />}
      {connected && <HomeScreen />}
      <div>
        <p>Starter app</p>
      </div>
    </>
  );
}

export default App;
