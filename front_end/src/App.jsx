import { useState, useContext } from "react";


import { UserContext } from "./Context/UserContext";
import "./App.css";

import AuthScreen from "./screens/AuthScreen";
import HomeScreen from "./screens/HomeScreen";

function App() {
  const { setUser, setConnected, connected } = useContext(UserContext);

  return (
    <div style={{backgroundColor : "#181E5A"}}>
      {!connected && <AuthScreen />}
      {connected && <HomeScreen />}
     
    </div>
  );
}

export default App;
